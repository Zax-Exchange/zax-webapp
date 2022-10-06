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
  PAPER_TUBE_BOX_STYLES,
  PAPER_TUBE_FINISHES,
  PAPER_TUBE_MATERIALS,
  PAPER_TUBE_MATERIAL_SOURCES,
  POST_PROCESS_DEBOSS,
  POST_PROCESS_EMBOSS,
  POST_PROCESS_FOIL_STAMP,
  POST_PROCESS_PRINTING,
} from "../../../../constants/products";
import { isValidAlphanumeric } from "../../../../Utils/inputValidators";
import CancelIcon from "@mui/icons-material/Cancel";
import { useIntl } from "react-intl";
import { TranslatableAttribute } from "../../../../../type/common";

type PaperTubePostProcessDetail = {
  postProcessName: string;
  numberOfColors?: string;
  color?: string;
  estimatedArea?: string;
  fontSize?: string;
};
const PaperTubeSubSection = ({
  setComponentSpec,
  componentSpec,
}: {
  setComponentSpec: React.Dispatch<
    React.SetStateAction<CreateProjectComponentSpecInput>
  >;
  componentSpec: CreateProjectComponentSpecInput;
}) => {
  const intl = useIntl();
  const [insidePostProcessDetail, setInsidePostProcessDetail] =
    useState<PaperTubePostProcessDetail>({} as PaperTubePostProcessDetail);

  const [outsidePostProcessDetail, setOutsidePostProcessDetail] =
    useState<PaperTubePostProcessDetail>({} as PaperTubePostProcessDetail);

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
    setOutsidePostProcessDetail({} as PaperTubePostProcessDetail);
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
    setInsidePostProcessDetail({} as PaperTubePostProcessDetail);
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
    postProcessDetail: PaperTubePostProcessDetail
  ) => {
    const { postProcessName, numberOfColors, color, estimatedArea, fontSize } =
      postProcessDetail;

    switch (postProcessName) {
      case POST_PROCESS_PRINTING.value:
        return `Printing of area size ${estimatedArea} with ${numberOfColors} colors.`;
      case POST_PROCESS_EMBOSS.value:
        return `Emboss of area size ${estimatedArea} with font size of ${fontSize}.`;
      case POST_PROCESS_DEBOSS.value:
        return `Deboss of area size ${estimatedArea} with font size of ${fontSize}.`;
      case POST_PROCESS_FOIL_STAMP.value:
        return `Foil Stamp of area size ${estimatedArea} with a color of ${color}`;
      default:
        return "";
    }
  };

  const renderPostProcessDropdown = (
    postProcessDetail: PaperTubePostProcessDetail,
    setPostProcessDetail: React.Dispatch<
      React.SetStateAction<PaperTubePostProcessDetail>
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
          onChange={(e, v) => {
            if (!v) {
              setPostProcessDetail({} as PaperTubePostProcessDetail);
              return;
            }
            setPostProcessDetail((prev) => {
              // If user selects same post process, do nothing.
              if (prev.postProcessName === v.value) {
                return prev;
              } else {
                // If user selects a new post process, reset everything.
                return {
                  postProcessName: v.value,
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
    postProcessDetail: PaperTubePostProcessDetail,
    postProcessOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    addPostProcess: () => void
  ) => {
    let subSection = null;
    if (postProcessDetail.postProcessName === POST_PROCESS_PRINTING.value) {
      subSection = (
        <>
          <ListItem>
            <TextField
              key="paper-tube-number-of-colors"
              autoComplete="new-password"
              label={intl.formatMessage({
                id: "app.component.postProcess.printing.numberOfColors",
              })}
              onChange={postProcessOnChange}
              name="numberOfColors"
              value={postProcessDetail.numberOfColors}
            />
          </ListItem>
          <ListItem>
            <TextField
              key="paper-tube-printing-estimated-area"
              autoComplete="new-password"
              label={intl.formatMessage({
                id: "app.component.postProcess.printing.estimatedArea",
              })}
              onChange={postProcessOnChange}
              name="estimatedArea"
              value={postProcessDetail.estimatedArea}
            />
          </ListItem>
        </>
      );
    }

    if (postProcessDetail.postProcessName === POST_PROCESS_EMBOSS.value) {
      subSection = (
        <>
          <ListItem>
            <TextField
              key="paper-tube-emboss-font-size"
              autoComplete="new-password"
              label={intl.formatMessage({
                id: "app.component.postProcess.emboss.fontSize",
              })}
              onChange={postProcessOnChange}
              name="fontSize"
              value={postProcessDetail.fontSize}
            />
          </ListItem>
          <ListItem>
            <TextField
              key="paper-tube-emboss-estimated-area"
              autoComplete="new-password"
              label={intl.formatMessage({
                id: "app.component.postProcess.emboss.estimatedArea",
              })}
              onChange={postProcessOnChange}
              name="estimatedArea"
              value={postProcessDetail.estimatedArea}
            />
          </ListItem>
        </>
      );
    }

    if (postProcessDetail.postProcessName === POST_PROCESS_DEBOSS.value) {
      subSection = (
        <>
          <ListItem>
            <TextField
              key="paper-tube-deboss-font-size"
              autoComplete="new-password"
              label={intl.formatMessage({
                id: "app.component.postProcess.deboss.fontSize",
              })}
              onChange={postProcessOnChange}
              name="fontSize"
              value={postProcessDetail.fontSize}
            />
          </ListItem>
          <ListItem>
            <TextField
              key="paper-tube-deboss-estimated-area"
              autoComplete="new-password"
              label={intl.formatMessage({
                id: "app.component.postProcess.deboss.estimatedArea",
              })}
              onChange={postProcessOnChange}
              name="estimatedArea"
              value={postProcessDetail.estimatedArea}
            />
          </ListItem>
        </>
      );
    }

    if (postProcessDetail.postProcessName === POST_PROCESS_FOIL_STAMP.value) {
      subSection = (
        <>
          <ListItem>
            <TextField
              key="paper-tube-foil-stamp-color"
              autoComplete="new-password"
              label={intl.formatMessage({
                id: "app.component.postProcess.foilStamp.color",
              })}
              onChange={postProcessOnChange}
              name="color"
              value={postProcessDetail.color}
            />
          </ListItem>
          <ListItem>
            <TextField
              key="paper-tube-foil-stamp-estimated-area"
              autoComplete="new-password"
              label={intl.formatMessage({
                id: "app.component.postProcess.foilStamp.estimatedArea",
              })}
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
            {intl.formatMessage({
              id: "app.component.postProcess.add",
            })}
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
      case "thickness":
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
      options: TranslatableAttribute[],
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
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.component.generalSpecs",
              })}
            </Typography>
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              PAPER_TUBE_BOX_STYLES,
              "boxStyle",
              intl.formatMessage({
                id: "app.component.attribute.boxStyle",
              }),
              "paper-tube-box-style"
            )}
          </ListItem>
          <ListItem>
            <TextField
              key="paper-tube-dimension"
              autoComplete="new-password"
              label={intl.formatMessage({
                id: "app.component.attribute.dimension",
              })}
              onChange={componentSpecOnChange}
              name="dimension"
              value={componentSpec.dimension}
            />
          </ListItem>
          <ListItem>
            <TextField
              key="paper-tube-thickness"
              autoComplete="new-password"
              label={intl.formatMessage({
                id: "app.component.attribute.thickness",
              })}
              onChange={componentSpecOnChange}
              name="thickness"
              value={componentSpec.thickness}
            />
          </ListItem>
        </Stack>
        <Stack>
          <ListItem>
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.component.outsideSpecs",
              })}
            </Typography>
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              PAPER_TUBE_MATERIALS,
              "outsideMaterial",
              intl.formatMessage({
                id: "app.component.attribute.outsideMaterial",
              }),
              "paper-tube-outside-material"
            )}
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              PAPER_TUBE_MATERIAL_SOURCES,
              "outsideMaterialSource",
              intl.formatMessage({
                id: "app.component.attribute.outsideMaterialSource",
              }),
              "paper-tube-outside-material-source"
            )}
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              PAPER_TUBE_FINISHES,
              "outsideFinish",
              intl.formatMessage({
                id: "app.component.attribute.outsideFinish",
              }),
              "paper-tube-outside-finish"
            )}
          </ListItem>
          <ListItem>
            {renderPostProcessDropdown(
              outsidePostProcessDetail,
              setOutsidePostProcessDetail,
              intl.formatMessage({
                id: "app.component.attribute.outsidePostProcess",
              }),
              "paper-tube-outisde-post-process"
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
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.component.insideSpecs",
              })}
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="caption">
              Inside specs for Paper Tube will be default.
            </Typography>
          </ListItem>
        </Stack>

        {!!componentSpec.outsidePostProcess?.length && (
          <Stack>
            <ListItem>
              <Typography variant="subtitle2">
                {intl.formatMessage({
                  id: "app.component.attribute.outsidePostProcess",
                })}
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
      </>
    );
  };

  return renderComponentSpecSection();
};

export default PaperTubeSubSection;
