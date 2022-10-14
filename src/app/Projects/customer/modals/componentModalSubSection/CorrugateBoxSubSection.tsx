import {
  Autocomplete,
  Button,
  IconButton,
  InputAdornment,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useCallback, useState } from "react";
import { CreateProjectComponentSpecInput } from "../../../../../generated/graphql";
import {
  CORRUGATE_BOX_BOX_STYLES,
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
  productValueToLabelMap,
} from "../../../../constants/products";
import { isValidAlphanumeric } from "../../../../Utils/inputValidators";
import CancelIcon from "@mui/icons-material/Cancel";
import { useIntl } from "react-intl";
import { TranslatableAttribute } from "../../../../../type/common";
import DimensionsInput from "../../createProject/common/DimensionsInput";

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
  const intl = useIntl();
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
      case POST_PROCESS_PRINTING.value:
        return `${printingMethod} printing with ${numberOfColors} colors.`;
      case POST_PROCESS_EMBOSS.value:
        return `Emboss of area size ${estimatedArea} with font size of ${fontSize}.`;
      case POST_PROCESS_DEBOSS.value:
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
          getOptionLabel={(option) => option.label}
          onChange={(e, v) => {
            if (!v) {
              setPostProcessDetail({} as CorrugatePostProcessDetail);
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
    postProcessDetail: CorrugatePostProcessDetail,
    postProcessOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    addPostProcess: () => void,
    // setPostProcess provides inner components to use setState directly (used by post process printing)
    setPostProcess: React.Dispatch<
      React.SetStateAction<CorrugatePostProcessDetail>
    >
  ) => {
    let subSection = null;
    if (postProcessDetail.postProcessName === POST_PROCESS_PRINTING.value) {
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
                  printingMethod: v ? v.value : "",
                });
              }}
              renderInput={(params) => (
                <TextField
                  key="corrugate-printing-method-dropdown"
                  {...params}
                  label={intl.formatMessage({
                    id: "app.component.postProcess.printing.method",
                  })}
                  helperText="If unsure, we recommend Litho/Flexo."
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
              key="corrugate-box-emboss-font-size"
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
              key="corrugate-box-emboss-estimated-area"
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
              key="corrugate-box-deboss-font-size"
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
              key="corrugate-box-deboss-estimated-area"
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
      helperText: string = "",
      width: number = 250
    ) => {
      const getDefaultValue = () => {
        if (
          componentSpec[componentSpecAttribute] &&
          typeof componentSpec[componentSpecAttribute] === "string"
        )
          if (
            productValueToLabelMap[
              componentSpec[componentSpecAttribute] as string
            ]
          ) {
            return productValueToLabelMap[
              componentSpec[componentSpecAttribute] as string
            ];
          }
        return null;
      };
      return (
        <Autocomplete
          sx={{ width }}
          options={options}
          autoHighlight
          value={getDefaultValue()}
          onChange={(e, v) => {
            if (!v) {
              setComponentSpec((spec) => ({
                ...spec,
                [componentSpecAttribute]: null,
              }));
            } else {
              setComponentSpec((spec) => ({
                ...spec,
                [componentSpecAttribute]: v ? v.value : "",
              }));
            }
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
              helperText={helperText}
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
    [componentSpec]
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
            <DimensionsInput
              componentSpec={componentSpec}
              setComponentSpec={setComponentSpec}
            />
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              CORRUGATE_BOX_BOX_STYLES,
              "boxStyle",
              intl.formatMessage({
                id: "app.component.attribute.boxStyle",
              }),
              "corrugate-box-style"
            )}
          </ListItem>
          <ListItem>
            <TextField
              autoComplete="new-password"
              label={intl.formatMessage({
                id: "app.component.attribute.thickness",
              })}
              onChange={componentSpecOnChange}
              name="thickness"
              value={componentSpec.thickness}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">mm</InputAdornment>
                ),
              }}
            />
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              CORRUGATE_BOX_FLUTES,
              "flute",
              intl.formatMessage({
                id: "app.component.attribute.flute",
              }),
              "corrugate-flute"
            )}
          </ListItem>
          <ListItem>
            <TextField
              sx={{ width: 250 }}
              disabled
              key="corrugate-material"
              label={intl.formatMessage({
                id: "app.component.attribute.material",
              })}
              value="Default Corrugate"
            />
          </ListItem>
          <ListItem>
            <TextField
              sx={{ width: 250 }}
              disabled
              key="corrugate-material-source"
              label={intl.formatMessage({
                id: "app.component.attribute.materialSource",
              })}
              value="OCC / Recycled Materials"
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
              CORRUGATE_BOX_FINISHES,
              "outsideFinish",
              intl.formatMessage({
                id: "app.component.attribute.outsideFinish",
              }),
              "corrugate-outside-finish",
              "If unsure, we recommend Uncoated."
            )}
          </ListItem>
          <ListItem>
            {renderPostProcessDropdown(
              outsidePostProcessDetail,
              setOutsidePostProcessDetail,
              intl.formatMessage({
                id: "app.component.attribute.outsidePostProcess",
              }),
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
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.component.insideSpecs",
              })}
            </Typography>
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              CORRUGATE_BOX_FINISHES,
              "insideFinish",
              intl.formatMessage({
                id: "app.component.attribute.insideFinish",
              }),
              "corrugate-inside-finish",
              "If unsure, we recommend Uncoated."
            )}
          </ListItem>
          <ListItem>
            {renderPostProcessDropdown(
              insidePostProcessDetail,
              setInsidePostProcessDetail,
              intl.formatMessage({
                id: "app.component.attribute.insidePostProcess",
              }),
              "corrugate-inside-post-process"
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

export default CorrugateBoxSubSection;
