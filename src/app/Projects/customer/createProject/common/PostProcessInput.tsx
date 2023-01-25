import { Cancel } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import {
  CreateProjectComponentSpecInput,
  PostProcessDetail,
  PostProcessDetailInput,
  ProductDimensionInput,
} from "../../../../../generated/graphql";
import { TranslatableAttribute } from "../../../../../type/common";
import {
  ALL_PRINTING_METHODS,
  POST_PROCESS_DEBOSS,
  POST_PROCESS_EMBOSS,
  POST_PROCESS_FOIL_STAMP,
  POST_PROCESS_PRINTING,
  productValueToLabelMap,
  PRODUCT_NAME_CORRUGATE_BOX,
  PRODUCT_NAME_CORRUGATE_TRAY,
  PRODUCT_NAME_MOLDED_FIBER_TRAY,
  PRODUCT_NAME_PAPER_TRAY,
  PRODUCT_NAME_PAPER_TUBE,
} from "../../../../constants/products";
import {
  isValidAlphanumeric,
  isValidFloat,
  isValidInt,
} from "../../../../Utils/inputValidators";
import ColorDropdown from "./ColorDropdown";
import DimensionsInput from "./DimensionsInput";

const PostProcessInput = ({
  setPostProcess,
  deletePostProcess,
  postProcess,
  postProcessOptions,
  componentSpec,
}: {
  setPostProcess: (data: PostProcessDetail) => void;
  deletePostProcess: () => void;
  postProcess: PostProcessDetail;
  postProcessOptions: TranslatableAttribute[];
  componentSpec: CreateProjectComponentSpecInput;
}) => {
  const intl = useIntl();

  const INSIDE_OPTION = {
    label: intl.formatMessage({ id: "app.component.inside" }),
    value: true,
  };
  const OUTSIDE_OPTION = {
    label: intl.formatMessage({ id: "app.component.outside" }),
    value: false,
  };

  const hasInsideOutsideDifference = () => {
    // All trays and paper tube will not have inside/outside difference for postProcess
    switch (componentSpec.productName) {
      case PRODUCT_NAME_CORRUGATE_TRAY.value:
      case PRODUCT_NAME_MOLDED_FIBER_TRAY.value:
      case PRODUCT_NAME_PAPER_TRAY.value:
      case PRODUCT_NAME_PAPER_TUBE.value:
        return false;
    }
    return true;
  };
  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let isAllowed = false;
    const attr = e.target.name as keyof PostProcessDetail;
    switch (attr) {
      case "fontSize":
        isAllowed = isValidFloat(val);
        break;
      case "numberOfColors":
        isAllowed = isValidInt(val);
        break;
      case "color":
        isAllowed = isValidAlphanumeric(val);
        break;
    }
    if (isAllowed) {
      setPostProcess({
        ...postProcess,
        [attr]: val,
      });
    }
  };

  const getDefaultPostProcessValues = (
    postProcessName: string
  ): PostProcessDetailInput => {
    const res = {
      postProcessName,
    };
    switch (postProcessName) {
      case POST_PROCESS_DEBOSS.value:
      case POST_PROCESS_EMBOSS.value:
        return {
          ...res,
          estimatedArea: {
            x: "",
            y: "",
          },
          fontSize: "",
        };
      case POST_PROCESS_FOIL_STAMP.value:
        return {
          ...res,
          color: "",
          estimatedArea: {
            x: "",
            y: "",
          },
        };
      case POST_PROCESS_PRINTING.value:
        return {
          ...res,
          numberOfColors: {
            c: "",
            t: "",
          },
          printingMethod: "",
          estimatedArea: {
            x: "",
            y: "",
          },
        };
    }
    return res;
  };

  const getPostProcessNameLabel = () => {
    if (!postProcess.postProcessName) return null;

    return productValueToLabelMap[postProcess.postProcessName];
  };

  const renderEstimatedAreaInput = () => {
    return (
      <Box>
        <Box mb={1.5}>
          <Typography variant="caption">
            {intl.formatMessage({
              id: "app.component.postProcess.estimatedArea",
            })}
          </Typography>
        </Box>
        <DimensionsInput
          displayTitle={false}
          dimension={postProcess.estimatedArea}
          setDimension={(data: ProductDimensionInput) => {
            setPostProcess({
              ...postProcess,
              estimatedArea: data,
            });
          }}
        />
      </Box>
    );
  };
  const renderPrintingPostProcessSection = () => {
    const getPrintingMethodLabel = () => {
      if (!postProcess.printingMethod) return null;
      return productValueToLabelMap[postProcess.printingMethod];
    };

    return (
      <>
        <Box mb={2}>
          {componentSpec.productName === PRODUCT_NAME_CORRUGATE_BOX.value && (
            <>
              <Box>
                <Typography variant="caption">
                  {intl.formatMessage({
                    id: "app.component.postProcess.printing.method",
                  })}
                </Typography>
              </Box>
              <Autocomplete
                sx={{ width: 180, mb: 2 }}
                options={ALL_PRINTING_METHODS}
                autoHighlight
                getOptionLabel={(option) =>
                  intl.formatMessage({ id: option.labelId })
                }
                value={getPrintingMethodLabel()}
                onChange={(e, v) => {
                  if (!v) {
                    setPostProcess({
                      ...postProcess,
                      printingMethod: "",
                    });
                    return;
                  }
                  setPostProcess({
                    ...postProcess,
                    printingMethod: v.value,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
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
          )}
          <Box>
            <Typography variant="caption">
              {intl.formatMessage({
                id: "app.component.postProcess.printing.numberOfColors",
              })}
            </Typography>
          </Box>

          <Box display="flex" mt={2}>
            <Autocomplete
              sx={{ width: 100, mr: 2 }}
              options={["1C", "2C", "3C", "4C"]}
              autoHighlight
              value={postProcess.numberOfColors?.c}
              onChange={(e, v) => {
                setPostProcess({
                  ...postProcess,
                  numberOfColors: {
                    ...postProcess.numberOfColors!,
                    c: v ? v : "",
                  },
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"C"}
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
            <Autocomplete
              sx={{ width: 100 }}
              options={["0T", "1T", "2T", "3T", "4T"]}
              autoHighlight
              value={postProcess.numberOfColors?.t}
              onChange={(e, v) => {
                setPostProcess({
                  ...postProcess,
                  numberOfColors: {
                    ...postProcess.numberOfColors!,
                    t: v ? v : "",
                  },
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"T"}
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
          </Box>
        </Box>
        {renderEstimatedAreaInput()}
      </>
    );
  };

  const renderEmbossPostProcessSection = () => {
    return (
      <>
        <Box mb={2}>
          <TextField
            autoComplete="new-password"
            label={intl.formatMessage({
              id: "app.component.postProcess.emboss.fontSize",
            })}
            helperText={`*
              ${intl.formatMessage({
                id: "app.general.unit",
              })}
              : ${intl.formatMessage({ id: "app.general.unit.px" })}`}
            FormHelperTextProps={{
              sx: {
                fontStyle: "italic",
                m: 0,
                fontSize: "0.8rem",
              },
            }}
            onChange={inputOnChange}
            name="fontSize"
            value={postProcess.fontSize}
          />
        </Box>
        {renderEstimatedAreaInput()}
      </>
    );
  };

  const renderFoilStampPostProcessSection = () => {
    return (
      <>
        <Box mb={2}>
          <ColorDropdown
            color={postProcess.color || ""}
            setColor={(color: string) =>
              setPostProcess({ ...postProcess, color })
            }
          />
        </Box>
        {renderEstimatedAreaInput()}
      </>
    );
  };

  return (
    <>
      <Box ml={-6} mr={1}>
        <IconButton onClick={deletePostProcess}>
          <Cancel />
        </IconButton>
      </Box>
      <Box>
        <Box mb={3} display="flex">
          <Autocomplete
            sx={{ width: 180, mr: 2 }}
            options={postProcessOptions}
            autoHighlight
            getOptionLabel={(option) =>
              intl.formatMessage({ id: option.labelId })
            }
            value={getPostProcessNameLabel()}
            onChange={(e, v) => {
              if (!v) {
                setPostProcess({} as PostProcessDetail);
                return;
              }
              setPostProcess(getDefaultPostProcessValues(v.value));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={intl.formatMessage({
                  id: "app.component.attribute.type",
                })}
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
          {!!postProcess.postProcessName && hasInsideOutsideDifference() && (
            <Autocomplete
              options={[INSIDE_OPTION, OUTSIDE_OPTION]}
              sx={{ width: 140 }}
              value={
                postProcess.isInside
                  ? INSIDE_OPTION
                  : postProcess.isInside === false
                  ? OUTSIDE_OPTION
                  : null
              }
              isOptionEqualToValue={(option, value) => {
                return option === value;
              }}
              onChange={(e, v) => {
                if (!v) {
                  setPostProcess({
                    ...postProcess,
                    isInside: null,
                  });
                } else {
                  setPostProcess({
                    ...postProcess,
                    isInside: v.value,
                  });
                }
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    label={intl.formatMessage({ id: "app.component.side" })}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                    InputLabelProps={{
                      sx: {
                        fontSize: 16,
                        top: -7,
                      },
                    }}
                    FormHelperTextProps={{
                      sx: {
                        margin: 0,
                        fontSize: "0.7em",
                      },
                    }}
                  />
                );
              }}
            />
          )}
        </Box>
        <Box>
          {postProcess.postProcessName === POST_PROCESS_PRINTING.value &&
            renderPrintingPostProcessSection()}
          {(postProcess.postProcessName === POST_PROCESS_EMBOSS.value ||
            postProcess.postProcessName === POST_PROCESS_DEBOSS.value) &&
            renderEmbossPostProcessSection()}
          {postProcess.postProcessName === POST_PROCESS_FOIL_STAMP.value &&
            renderFoilStampPostProcessSection()}
        </Box>
      </Box>
    </>
  );
};

export default PostProcessInput;
