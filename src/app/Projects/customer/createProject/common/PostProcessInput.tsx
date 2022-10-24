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
} from "../../../../constants/products";
import {
  isValidAlphanumeric,
  isValidInt,
} from "../../../../Utils/inputValidators";
import DimensionsInput from "./DimensionsInput";

const PostProcessInput = ({
  setPostProcess,
  deletePostProcess,
  postProcess,
  postProcessOptions,
}: {
  setPostProcess: (data: PostProcessDetail) => void;
  deletePostProcess: () => void;
  postProcess: PostProcessDetail;
  postProcessOptions: TranslatableAttribute[];
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

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let isAllowed = false;
    const attr = e.target.name as keyof PostProcessDetail;
    switch (attr) {
      case "numberOfColors":
      case "fontSize":
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
          numberOfColors: "",
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

  const renderPrintingPostProcessSection = () => {
    const getPrintingMethodLabel = () => {
      if (!postProcess.printingMethod) return null;
      return productValueToLabelMap[postProcess.printingMethod];
    };
    return (
      <>
        <Box mb={2}>
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
            getOptionLabel={(option) => option.label}
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
          <Box>
            <Typography variant="caption">
              {intl.formatMessage({
                id: "app.component.postProcess.printing.numberOfColors",
              })}
            </Typography>
          </Box>
          <TextField
            autoComplete="new-password"
            onChange={inputOnChange}
            name="numberOfColors"
            value={postProcess.numberOfColors}
          />
        </Box>
        <Box>
          <Box>
            <Typography variant="caption">
              {intl.formatMessage({
                id: "app.component.postProcess.estimatedArea",
              })}
            </Typography>
          </Box>
          <DimensionsInput
            dimension={postProcess.estimatedArea}
            setDimension={(data: ProductDimensionInput) => {
              setPostProcess({
                ...postProcess,
                estimatedArea: data,
              });
            }}
          />
        </Box>
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
            onChange={inputOnChange}
            name="fontSize"
            value={postProcess.fontSize}
          />
        </Box>
        <Box>
          <Box>
            <Typography variant="caption">
              {intl.formatMessage({
                id: "app.component.postProcess.estimatedArea",
              })}
            </Typography>
          </Box>
          <DimensionsInput
            dimension={postProcess.estimatedArea}
            setDimension={(data: ProductDimensionInput) => {
              setPostProcess({
                ...postProcess,
                estimatedArea: data,
              });
            }}
          />
        </Box>
      </>
    );
  };

  const renderFoilStampPostProcessSection = () => {
    return (
      <>
        <Box mb={2}>
          <TextField
            autoComplete="new-password"
            label={intl.formatMessage({
              id: "app.component.postProcess.foilStamp.color",
            })}
            onChange={inputOnChange}
            name="color"
            value={postProcess.color}
          />
        </Box>
        <Box>
          <Box>
            <Typography variant="caption">
              {intl.formatMessage({
                id: "app.component.postProcess.estimatedArea",
              })}
            </Typography>
          </Box>
          <DimensionsInput
            dimension={postProcess.estimatedArea}
            setDimension={(data: ProductDimensionInput) => {
              setPostProcess({
                ...postProcess,
                estimatedArea: data,
              });
            }}
          />
        </Box>
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
        <Box mb={2} display="flex">
          <Autocomplete
            sx={{ width: 180, mr: 2 }}
            options={postProcessOptions}
            autoHighlight
            getOptionLabel={(option) => option.label}
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
          {!!postProcess.postProcessName && (
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
