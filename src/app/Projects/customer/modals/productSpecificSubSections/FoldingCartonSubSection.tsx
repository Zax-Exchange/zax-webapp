import {
  Autocomplete,
  Button,
  IconButton,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useCallback, useState } from "react";
import { CreateProjectComponentSpecInput } from "../../../../../generated/graphql";
import {
  FOLDING_CARTON_FINISHES,
  FOLDING_CARTON_MATERIALS,
  FOLDING_CARTON_MATERIAL_SOURCES,
  FOLDING_CARTON_POST_PROCESSES,
  POST_PROCESS_DEBOSS,
  POST_PROCESS_EMBOSS,
  POST_PROCESS_FOIL_STAMP,
  POST_PROCESS_PRINTING,
} from "../../../../constants/products";
import { isValidAlphanumeric } from "../../../../Utils/inputValidators";
import CancelIcon from "@mui/icons-material/Cancel";

type FoldingCartonPostProcessDetail = {
  postProcessName: string;
  numberOfColors?: string;
  color?: string;
  estimatedArea?: string;
  fontSize?: string;
};
const FoldingCartonSubSection = ({
  setComponentSpec,
  componentSpec,
}: {
  setComponentSpec: React.Dispatch<
    React.SetStateAction<CreateProjectComponentSpecInput>
  >;
  componentSpec: CreateProjectComponentSpecInput;
}) => {
  const [insidePostProcessDetail, setInsidePostProcessDetail] =
    useState<FoldingCartonPostProcessDetail>(
      {} as FoldingCartonPostProcessDetail
    );

  const [outsidePostProcessDetail, setOutsidePostProcessDetail] =
    useState<FoldingCartonPostProcessDetail>(
      {} as FoldingCartonPostProcessDetail
    );

  const outsidePostProcessDetailOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOutsidePostProcessDetail((postProcessDetail) => ({
      ...postProcessDetail,
      [e.target.name]: e.target.value,
    }));
  };

  const insidePostProcessDetailOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInsidePostProcessDetail((postProcessDetail) => ({
      ...postProcessDetail,
      [e.target.name]: e.target.value,
    }));
  };

  const addOutsidePostProcess = () => {
    const res = formatPostProcessDetail(outsidePostProcessDetail);
    const prevPostProcess = componentSpec.outsidePostProcess
      ? componentSpec.outsidePostProcess
      : [];

    setComponentSpec({
      ...componentSpec,
      outsidePostProcess: [...prevPostProcess, res],
    });
    setOutsidePostProcessDetail({} as FoldingCartonPostProcessDetail);
  };

  const addinsidePostProcess = () => {
    const res = formatPostProcessDetail(insidePostProcessDetail);
    const prevPostProcess = componentSpec.insidePostProcess
      ? componentSpec.insidePostProcess
      : [];

    setComponentSpec({
      ...componentSpec,
      insidePostProcess: [...prevPostProcess, res],
    });
    setInsidePostProcessDetail({} as FoldingCartonPostProcessDetail);
  };

  const removeOutsidePostProcess = (i: number) => {
    const postProcess = componentSpec.outsidePostProcess;
    postProcess?.splice(i, 1);

    console.log(postProcess);
    setComponentSpec({
      ...componentSpec,
      outsidePostProcess: postProcess,
    });
  };

  const removeInsidePostProcess = (i: number) => {
    const postProcess = componentSpec.insidePostProcess;
    postProcess?.splice(i, 1);
    setComponentSpec({
      ...componentSpec,
      insidePostProcess: postProcess,
    });
  };

  // combine post process detail into string based on post process name
  const formatPostProcessDetail = (
    postProcessDetail: FoldingCartonPostProcessDetail
  ) => {
    const { postProcessName, numberOfColors, color, estimatedArea, fontSize } =
      postProcessDetail;

    switch (postProcessName) {
      case POST_PROCESS_PRINTING:
        return `Printing of area size ${estimatedArea} with ${numberOfColors} colors.`;
      case POST_PROCESS_EMBOSS:
        return `Emboss of area size ${estimatedArea} with font size of ${fontSize}.`;
      case POST_PROCESS_DEBOSS:
        return `Deboss of area size ${estimatedArea} with font size of ${fontSize}.`;
      case POST_PROCESS_FOIL_STAMP:
        return `Foil Stamp of area size ${estimatedArea} with a color of ${color}`;
      default:
        return "";
    }
  };

  const renderPostProcessDropdown = (
    postProcessDetail: FoldingCartonPostProcessDetail,
    setPostProcessDetail: React.Dispatch<
      React.SetStateAction<FoldingCartonPostProcessDetail>
    >,
    label: string,
    key: string
  ) => {
    return (
      <>
        <Autocomplete
          sx={{ width: 250 }}
          options={FOLDING_CARTON_POST_PROCESSES}
          autoHighlight
          value={postProcessDetail.postProcessName}
          onChange={(e, v) => {
            setPostProcessDetail((prev) => {
              console.log(prev.postProcessName, v);
              // If user selects same post process, do nothing.
              if (prev.postProcessName === v) {
                return prev;
              } else {
                // If user selects a new post process, reset everything.
                return {
                  postProcessName: v ? v : "",
                };
              }
            });
          }}
          renderInput={(params) => (
            <TextField
              key={key}
              {...params}
              label={label}
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
              InputLabelProps={{
                sx: {
                  fontSize: 16,
                  top: -7,
                },
              }}
            />
          )}
        />
      </>
    );
  };

  const renderPostProcessDetailSection = (
    postProcessDetail: FoldingCartonPostProcessDetail,
    postProcessOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    addPostProcess: () => void
  ) => {
    let subSection = null;
    if (postProcessDetail.postProcessName === POST_PROCESS_PRINTING) {
      subSection = (
        <>
          <ListItem>
            <TextField
              key="folding-carton-number-of-colors"
              autoComplete="new-password"
              label="Number Of Colors To Print"
              onChange={postProcessOnChange}
              name="numberOfColors"
              value={postProcessDetail.numberOfColors}
            />
          </ListItem>
          <ListItem>
            <TextField
              key="folding-carton-printing-estimated-area"
              autoComplete="new-password"
              label="Printing Estimated Area"
              onChange={postProcessOnChange}
              name="estimatedArea"
              value={postProcessDetail.estimatedArea}
            />
          </ListItem>
        </>
      );
    }

    if (postProcessDetail.postProcessName === POST_PROCESS_EMBOSS) {
      subSection = (
        <>
          <ListItem>
            <TextField
              key="folding-carton-emboss-font-size"
              autoComplete="new-password"
              label="Emboss Font Size"
              onChange={postProcessOnChange}
              name="fontSize"
              value={postProcessDetail.fontSize}
            />
          </ListItem>
          <ListItem>
            <TextField
              key="folding-carton-emboss-estimated-area"
              autoComplete="new-password"
              label="Emboss Estimated Area"
              onChange={postProcessOnChange}
              name="estimatedArea"
              value={postProcessDetail.estimatedArea}
            />
          </ListItem>
        </>
      );
    }

    if (postProcessDetail.postProcessName === POST_PROCESS_DEBOSS) {
      subSection = (
        <>
          <ListItem>
            <TextField
              key="folding-carton-deboss-font-size"
              autoComplete="new-password"
              label="Deboss Font Size"
              onChange={postProcessOnChange}
              name="fontSize"
              value={postProcessDetail.fontSize}
            />
          </ListItem>
          <ListItem>
            <TextField
              key="folding-carton-deboss-estimated-area"
              autoComplete="new-password"
              label="Deboss Estimated Area"
              onChange={postProcessOnChange}
              name="estimatedArea"
              value={postProcessDetail.estimatedArea}
            />
          </ListItem>
        </>
      );
    }

    if (postProcessDetail.postProcessName === POST_PROCESS_FOIL_STAMP) {
      subSection = (
        <>
          <ListItem>
            <TextField
              key="folding-carton-foil-stamp-color"
              autoComplete="new-password"
              label="Foil Stamp Color"
              onChange={postProcessOnChange}
              name="color"
              value={postProcessDetail.color}
            />
          </ListItem>
          <ListItem>
            <TextField
              key="folding-carton-foil-stamp-estimated-area"
              autoComplete="new-password"
              label="Foil Stamp Estimated Area"
              onChange={postProcessOnChange}
              name="estimatedArea"
              value={postProcessDetail.estimatedArea}
            />
          </ListItem>
        </>
      );
    }

    return (
      !!subSection && (
        <>
          {subSection}
          <Button variant="text" onClick={addPostProcess}>
            Add Post Process
          </Button>
        </>
      )
    );
  };
  // Checks and sets input-able component spec
  const componentSpecOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let isAllowed = true;

    switch (e.target.name) {
      case "dimension":
        isAllowed = isValidAlphanumeric(val);
        break;
      default:
        break;
    }

    if (isAllowed) {
      setComponentSpec({
        ...componentSpec,
        [e.target.name]: e.target.value,
      });
    }
  };

  // For dropdowns other than post process
  const renderAutocompleteDropdown = useCallback(
    (
      options: string[],
      componentSpecAttribute: keyof CreateProjectComponentSpecInput,
      label: string,
      key: string,
      width: number = 250
    ) => {
      return (
        <Autocomplete
          sx={{ width }}
          options={options}
          autoHighlight
          onChange={(e, v) => {
            setComponentSpec((spec) => ({
              ...spec,
              [componentSpecAttribute]: v ? v : "",
            }));
          }}
          renderInput={(params) => (
            <TextField
              key={key}
              {...params}
              label={label}
              inputProps={{
                ...params.inputProps,
                autoComplete: "new-password",
              }}
              InputLabelProps={{
                sx: {
                  fontSize: 16,
                  top: -7,
                },
              }}
            />
          )}
        />
      );
    },
    []
  );

  const renderComponentSpecSection = () => {
    return (
      <>
        <Stack>
          <ListItem>
            <Typography variant="subtitle2">General Specs</Typography>
          </ListItem>
          <ListItem>
            <TextField
              key="folding-carton-dimension"
              autoComplete="new-password"
              label="Dimension"
              onChange={componentSpecOnChange}
              name="dimension"
              value={componentSpec.dimension}
            />
          </ListItem>
          <ListItem>
            <TextField
              key="folding-carton-thickness"
              autoComplete="new-password"
              label="Thickness"
              onChange={componentSpecOnChange}
              name="thickness"
              value={componentSpec.thickness}
            />
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              FOLDING_CARTON_MATERIALS,
              "material",
              "Component Material",
              "folding-carton-material"
            )}
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              FOLDING_CARTON_MATERIAL_SOURCES,
              "materialSource",
              "Material Source",
              "folding-carton-material-source"
            )}
          </ListItem>
        </Stack>
        <Stack>
          <ListItem>
            <Typography variant="subtitle2">Outside Specs</Typography>
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              FOLDING_CARTON_FINISHES,
              "outsideFinish",
              "Outside Finish",
              "folding-carton-outside-finish"
            )}
          </ListItem>
          <ListItem>
            {renderPostProcessDropdown(
              outsidePostProcessDetail,
              setOutsidePostProcessDetail,
              "Outside Post Process",
              "folding-carton-outisde-post-process"
            )}
          </ListItem>
          {renderPostProcessDetailSection(
            outsidePostProcessDetail,
            outsidePostProcessDetailOnChange,
            addOutsidePostProcess
          )}
        </Stack>
        <Stack>
          <ListItem>
            <Typography variant="subtitle2">Inside Specs</Typography>
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              FOLDING_CARTON_FINISHES,
              "insideFinish",
              "Inside Finish",
              "folding-carton-inside-finish"
            )}
          </ListItem>
          <ListItem>
            {renderPostProcessDropdown(
              insidePostProcessDetail,
              setInsidePostProcessDetail,
              "Inside Post Process",
              "folding-carton-inside-post-process"
            )}
          </ListItem>
          {renderPostProcessDetailSection(
            insidePostProcessDetail,
            insidePostProcessDetailOnChange,
            addinsidePostProcess
          )}
        </Stack>

        {!!componentSpec.outsidePostProcess?.length && (
          <Stack>
            <ListItem>
              <Typography variant="subtitle2">
                Outside Post Processes
              </Typography>
            </ListItem>
            {componentSpec.outsidePostProcess.map((postProcess, i) => {
              return (
                <ListItem>
                  <Typography variant="caption">{postProcess}</Typography>
                  <IconButton onClick={() => removeOutsidePostProcess(i)}>
                    <CancelIcon />
                  </IconButton>
                </ListItem>
              );
            })}
          </Stack>
        )}

        {!!componentSpec.insidePostProcess?.length && (
          <Stack>
            <ListItem>
              <Typography variant="subtitle2">Inside Post Processes</Typography>
            </ListItem>
            {componentSpec.insidePostProcess.map((postProcess, i) => {
              return (
                <ListItem>
                  <Typography variant="caption">{postProcess}</Typography>
                  <IconButton onClick={() => removeInsidePostProcess(i)}>
                    <CancelIcon />
                  </IconButton>
                </ListItem>
              );
            })}
          </Stack>
        )}
      </>
    );
  };

  return renderComponentSpecSection();
};

export default FoldingCartonSubSection;
