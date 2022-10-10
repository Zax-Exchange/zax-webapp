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
  MOLDED_FIBER_MANUFACTURING_PROCESSES,
  MOLDED_FIBER_MATERIAL_SOURCES,
  MOLDED_FIBER_POST_PROCESSES,
  POST_PROCESS_DEBOSS,
  POST_PROCESS_EMBOSS,
  POST_PROCESS_FOIL_STAMP,
  POST_PROCESS_PRINTING,
} from "../../../../constants/products";
import { isValidAlphanumeric } from "../../../../Utils/inputValidators";
import CancelIcon from "@mui/icons-material/Cancel";
import { useIntl } from "react-intl";
import { TranslatableAttribute } from "../../../../../type/common";

type MoldedFiberPostProcessDetail = {
  postProcessName: string;
  numberOfColors?: string;
  color?: string;
  estimatedArea?: string;
  fontSize?: string;
};
const MoldedFiberSubSection = ({
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
    useState<MoldedFiberPostProcessDetail>({} as MoldedFiberPostProcessDetail);

  const [outsidePostProcessDetail, setOutsidePostProcessDetail] =
    useState<MoldedFiberPostProcessDetail>({} as MoldedFiberPostProcessDetail);

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
    setOutsidePostProcessDetail({} as MoldedFiberPostProcessDetail);
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
    setInsidePostProcessDetail({} as MoldedFiberPostProcessDetail);
  };

  const removeOutsidePostProcess = (i: number) => {
    const postProcess = [...(componentSpec.outsidePostProcess as string[])];
    postProcess?.splice(i, 1);

    setComponentSpec({
      ...componentSpec,
      outsidePostProcess: postProcess,
    });
  };

  const removeInsidePostProcess = (i: number) => {
    const postProcess = [...(componentSpec.insidePostProcess as string[])];
    postProcess?.splice(i, 1);
    setComponentSpec({
      ...componentSpec,
      insidePostProcess: postProcess,
    });
  };

  // combine post process detail into string based on post process name
  const formatPostProcessDetail = (
    postProcessDetail: MoldedFiberPostProcessDetail
  ) => {
    const { postProcessName, numberOfColors, color, estimatedArea, fontSize } =
      postProcessDetail;

    switch (postProcessName) {
      case POST_PROCESS_PRINTING.value:
        return `Printing with ${numberOfColors} colors.`;
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
    postProcessDetail: MoldedFiberPostProcessDetail,
    setPostProcessDetail: React.Dispatch<
      React.SetStateAction<MoldedFiberPostProcessDetail>
    >,
    label: string,
    key: string
  ) => {
    return (
      <>
        <Autocomplete
          sx={{ width: 250 }}
          options={MOLDED_FIBER_POST_PROCESSES}
          autoHighlight
          onChange={(e, v) => {
            if (!v) {
              setPostProcessDetail({} as MoldedFiberPostProcessDetail);
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
    postProcessDetail: MoldedFiberPostProcessDetail,
    postProcessOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    addPostProcess: () => void
  ) => {
    let subSection = null;
    if (postProcessDetail.postProcessName === POST_PROCESS_PRINTING.value) {
      subSection = (
        <>
          <ListItem>
            <TextField
              key="molded-fiber-number-of-colors"
              autoComplete="new-password"
              label={intl.formatMessage({
                id: "app.component.postProcess.printing.numberOfColors",
              })}
              onChange={postProcessOnChange}
              name="numberOfColors"
              value={postProcessDetail.numberOfColors}
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
              key="molded-fiber-emboss-font-size"
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
              key="molded-fiber-emboss-estimated-area"
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
              key="molded-fiber-deboss-font-size"
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
              key="molded-fiber-deboss-estimated-area"
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
              key="molded-fiber-foil-stamp-color"
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
              key="molded-fiber-foil-stamp-estimated-area"
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
      case "color":
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
              [componentSpecAttribute]: v ? v.value : "",
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
            <TextField
              key="molded-fiber-dimension"
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
              key="molded-fiber-thickness"
              autoComplete="new-password"
              label={intl.formatMessage({
                id: "app.component.attribute.thickness",
              })}
              onChange={componentSpecOnChange}
              name="thickness"
              value={componentSpec.thickness}
            />
          </ListItem>
          <ListItem>
            <TextField
              key="molded-fiber-color"
              autoComplete="new-password"
              label={intl.formatMessage({
                id: "app.component.attribute.color",
              })}
              onChange={componentSpecOnChange}
              name="color"
              value={componentSpec.color}
            />
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              MOLDED_FIBER_MANUFACTURING_PROCESSES,
              "manufacturingProcess",
              intl.formatMessage({
                id: "app.component.attribute.manufacturingProcess",
              }),
              "molded-fiber-manufacturing-process"
            )}
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              MOLDED_FIBER_MATERIAL_SOURCES,
              "materialSource",
              intl.formatMessage({
                id: "app.component.attribute.materialSource",
              }),
              "molded-fiber-material-source"
            )}
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
            {renderPostProcessDropdown(
              outsidePostProcessDetail,
              setOutsidePostProcessDetail,
              intl.formatMessage({
                id: "app.component.attribute.outsidePostProcess",
              }),
              "molded-fiber-outisde-post-process"
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
            {renderPostProcessDropdown(
              insidePostProcessDetail,
              setInsidePostProcessDetail,
              intl.formatMessage({
                id: "app.component.attribute.insidePostProcess",
              }),
              "molded-fiber-inside-post-process"
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

        {!!componentSpec.insidePostProcess?.length && (
          <Stack>
            <ListItem>
              <Typography variant="subtitle2">
                {intl.formatMessage({
                  id: "app.component.attribute.insidePostProcess",
                })}
              </Typography>
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

export default MoldedFiberSubSection;
