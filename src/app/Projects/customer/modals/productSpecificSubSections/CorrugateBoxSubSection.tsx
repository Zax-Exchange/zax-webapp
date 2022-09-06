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
  CORRUGATE_BOX_FINISHES,
  CORRUGATE_BOX_FLUTES,
  CORRUGATE_BOX_POST_PROCESSES,
  CORRUGATE_BOX_PRINTING_METHODS,
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

type CorrugatePostProcessDetail = {
  postProcessName: string;
  printingMethod?: string;
  numberOfColors?: string;
  estimatedArea?: string;
  fontSize?: string;
};
const CorrugateBoxSubSection = ({
  setComponentSpec,
  componentSpec,
}: {
  setComponentSpec: React.Dispatch<
    React.SetStateAction<CreateProjectComponentSpecInput>
  >;
  componentSpec: CreateProjectComponentSpecInput;
}) => {
  const [insidePostProcessDetail, setInsidePostProcessDetail] =
    useState<CorrugatePostProcessDetail>({} as CorrugatePostProcessDetail);

  const [outsidePostProcessDetail, setOutsidePostProcessDetail] =
    useState<CorrugatePostProcessDetail>({} as CorrugatePostProcessDetail);

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
    setOutsidePostProcessDetail({} as CorrugatePostProcessDetail);
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
    setInsidePostProcessDetail({} as CorrugatePostProcessDetail);
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
    postProcessDetail: CorrugatePostProcessDetail
  ) => {
    const {
      postProcessName,
      numberOfColors,
      estimatedArea,
      fontSize,
      printingMethod,
    } = postProcessDetail;

    switch (postProcessName) {
      case POST_PROCESS_PRINTING:
        return `${printingMethod} printing with ${numberOfColors} colors`;
      case POST_PROCESS_EMBOSS:
        return `Emboss of area size ${estimatedArea} with font size of ${fontSize}.`;
      case POST_PROCESS_DEBOSS:
        return `Deboss of area size ${estimatedArea} with font size of ${fontSize}.`;
      default:
        return "";
    }
  };

  const renderPostProcessDropdown = (
    postProcessDetail: CorrugatePostProcessDetail,
    setPostProcessDetail: React.Dispatch<
      React.SetStateAction<CorrugatePostProcessDetail>
    >,
    label: string,
    key: string
  ) => {
    return (
      <>
        <Autocomplete
          sx={{ width: 250 }}
          options={CORRUGATE_BOX_POST_PROCESSES}
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
    postProcessDetail: CorrugatePostProcessDetail,
    postProcessOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    addPostProcess: () => void,
    // setPostProcess provides inner components to use setState directly (used by post process printing)
    setPostProcess: React.Dispatch<
      React.SetStateAction<CorrugatePostProcessDetail>
    >
  ) => {
    let subSection = null;
    if (postProcessDetail.postProcessName === POST_PROCESS_PRINTING) {
      subSection = (
        <>
          <ListItem>
            <Autocomplete
              options={CORRUGATE_BOX_PRINTING_METHODS}
              sx={{ width: 250 }}
              autoHighlight
              onChange={(e, v) => {
                setPostProcess({
                  ...postProcessDetail,
                  printingMethod: v ? v : "",
                });
              }}
              renderInput={(params) => (
                <TextField
                  key="corrugate-printing-method-dropdown"
                  {...params}
                  label="Printing Method"
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
          </ListItem>
          <ListItem>
            <TextField
              key="corrugate-printing-number-of-colors"
              autoComplete="new-password"
              label="Number of Colors"
              onChange={postProcessOnChange}
              name="numberOfColors"
              value={postProcessDetail.numberOfColors}
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
              sx={{ width: 250 }}
              key="folding-carton-dimension"
              autoComplete="new-password"
              label="Dimension"
              onChange={componentSpecOnChange}
              name="dimension"
              value={componentSpec.dimension}
            />
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              CORRUGATE_BOX_FLUTES,
              "flute",
              "Flute Type",
              "corrugate-flute"
            )}
          </ListItem>
          <ListItem>
            <TextField
              sx={{ width: 250 }}
              disabled
              key="corrugate-material"
              label="Material"
              value="Default Corrugate"
            />
          </ListItem>
          <ListItem>
            <TextField
              sx={{ width: 250 }}
              disabled
              key="corrugate-material-source"
              label="Materia Sourcel"
              value="OCC / Recycled Materials"
            />
          </ListItem>
        </Stack>
        <Stack>
          <ListItem>
            <Typography variant="subtitle2">Outside Specs</Typography>
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              CORRUGATE_BOX_FINISHES,
              "outsideFinish",
              "Outside Finish",
              "corrugate-outside-finish"
            )}
          </ListItem>
          <ListItem>
            {renderPostProcessDropdown(
              outsidePostProcessDetail,
              setOutsidePostProcessDetail,
              "Outside Post Process",
              "corrugate-outisde-post-process"
            )}
          </ListItem>
          {renderPostProcessDetailSection(
            outsidePostProcessDetail,
            outsidePostProcessDetailOnChange,
            addOutsidePostProcess,
            setOutsidePostProcessDetail
          )}
        </Stack>
        <Stack>
          <ListItem>
            <Typography variant="subtitle2">Inside Specs</Typography>
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              CORRUGATE_BOX_FINISHES,
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
            addinsidePostProcess,
            setInsidePostProcessDetail
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

export default CorrugateBoxSubSection;
