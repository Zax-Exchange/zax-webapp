import { Cancel } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  Link,
  ListItem,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useIntl } from "react-intl";
import {
  CreateProjectComponentInput,
  CreateProjectComponentSpecInput,
  CreateProjectInput,
  ProductDimensionInput,
  ProjectDesign,
} from "../../../../../../generated/graphql";
import { TranslatableAttribute } from "../../../../../../type/common";
import {
  BOOKLET_STYLES,
  DEFAULT_BOOKLET_SPEC,
  DEFAULT_SLEEVE_SPEC,
  DEFAULT_STICKER_SPEC,
  FINISH_MATTE,
  FINISH_UNCOATED,
  GUIDED_PROJECT_ALL_POST_PROCESS,
  GUIDED_PROJECT_INSIDE_PRODUCTS,
  GUIDED_PROJECT_OTHER_PRODUCTS,
  MATERIAL_C1S,
  MATERIAL_SOURCE_STANDARD,
  productValueToLabelMap,
  PRODUCT_NAME_BOOKLET,
  PRODUCT_NAME_CORRUGATE_TRAY,
  PRODUCT_NAME_PAPER_TRAY,
  PRODUCT_NAME_SLEEVE,
  PRODUCT_NAME_STICKER,
  STICKER_PURPOSES,
  STICKER_SHAPES,
} from "../../../../../constants/products";
import { useDeleteProjectDesignMutation } from "../../../../../gql/delete/project/project.generated";
import AttachmentButton from "../../../../../Utils/AttachmentButton";
import {
  isValidAlphanumeric,
  isValidFloat,
  isValidInt,
} from "../../../../../Utils/inputValidators";
import { openLink } from "../../../../../Utils/openLink";
import UploadDesign from "../../../UploadDesign";
import DimensionsInput from "../../common/DimensionsInput";
import IncludeArtworkInQuoteDropdown from "../../common/IncludeArtworkInQuoteDropdown";
import { GuidedCreateSetComponentData } from "../GuidedCreateProject";

const sleeveAdditionalDefaultSpecs: Partial<CreateProjectComponentSpecInput> = {
  material: MATERIAL_C1S.value,
  materialSource: MATERIAL_SOURCE_STANDARD.value,
  thickness: "0.5",
  outsideFinish: FINISH_MATTE.value,
  insideFinish: FINISH_UNCOATED.value,
};

const GuidedOtherSubSection = ({
  setComponentData,
  setComponentDesigns,
  deleteComponentDesign,
  deleteComponentDesigns,
  deleteComponent,
  componentIndex,
  componentDesigns,
  componentData,
}: {
  setComponentData: GuidedCreateSetComponentData;
  setComponentDesigns: (data: ProjectDesign | null) => void;
  deleteComponentDesign: (ind: number) => void;
  deleteComponentDesigns: (compInd: number) => void;
  deleteComponent: () => void;
  componentIndex: number;
  componentDesigns: ProjectDesign[] | null;
  componentData: CreateProjectComponentInput;
}) => {
  const intl = useIntl();

  const [
    deleteProjectDesign,
    { error: deleteProjectDesignError, data: deleteProjectDesignData },
  ] = useDeleteProjectDesignMutation();

  const deleteDesign = async (id: string, ind: number) => {
    try {
      await deleteProjectDesign({
        variables: {
          data: {
            fileId: id,
          },
        },
      });

      deleteComponentDesign(ind);
    } catch (error) {}
  };

  const setComponentSpec = (
    arg: (
      prev: CreateProjectComponentSpecInput
    ) => CreateProjectComponentSpecInput
  ) => {
    setComponentData((comp) => ({
      ...comp!,
      componentSpec: arg(comp!.componentSpec),
    }));
  };

  const componentSpecOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const attr = e.target.name as keyof CreateProjectComponentSpecInput;
    const val = e.target.value;
    let isAllowed = false;

    switch (attr) {
      case "numberOfPages":
        isAllowed = isValidInt(val);
        break;
      default:
        break;
    }
    if (isAllowed) {
      setComponentData((prev) => ({
        ...prev!,
        componentSpec: {
          ...prev!.componentSpec,
          [attr]: val,
        },
      }));
    }
  };
  const getDefaultComponentSpec = (productName: string) => {
    switch (productName) {
      case PRODUCT_NAME_BOOKLET.value:
        return DEFAULT_BOOKLET_SPEC;
      case PRODUCT_NAME_STICKER.value:
        return DEFAULT_STICKER_SPEC;
      case PRODUCT_NAME_SLEEVE.value:
        return {
          ...DEFAULT_SLEEVE_SPEC,
          ...sleeveAdditionalDefaultSpecs,
        };
    }
  };

  const renderAutocompleteDropdown = (
    options: TranslatableAttribute[],
    attribute: keyof CreateProjectComponentSpecInput
  ) => {
    const componentSpec = componentData?.componentSpec;

    const getDefaultValue = () => {
      if (
        componentSpec &&
        componentSpec[attribute] &&
        typeof componentSpec[attribute] === "string"
      ) {
        return productValueToLabelMap[componentSpec[attribute] as string];
      } else {
        return null;
      }
    };

    return (
      <Autocomplete
        sx={{ width: 200 }}
        options={options}
        autoHighlight
        value={getDefaultValue()}
        onChange={(e, v) => {
          const value = v ? v.value : "";

          setComponentData((prev) => ({
            ...prev!,
            componentSpec: {
              ...prev!.componentSpec,
              [attribute]: value,
            },
          }));
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
    );
  };

  const renderPostProcessDropdown = () => {
    return (
      <Box>
        <Typography variant="subtitle2">
          {intl.formatMessage({
            id: "app.component.attribute.postProcess",
          })}
        </Typography>
        <Autocomplete
          sx={{ width: 200 }}
          options={GUIDED_PROJECT_ALL_POST_PROCESS}
          autoHighlight
          multiple
          value={GUIDED_PROJECT_ALL_POST_PROCESS.filter((p) => {
            return !!componentData.componentSpec.postProcess?.filter(
              (process) => process.postProcessName === p.value
            ).length;
          })}
          isOptionEqualToValue={(option, value) => {
            if (typeof value === "string") {
              return option.value === value;
            }
            return option.value === value.value;
          }}
          onChange={(e, v) => {
            setComponentSpec((prev) => ({
              ...prev,
              postProcess: v.map((p) => ({
                postProcessName: p.value,
                estimatedArea: { x: "", y: "" },
              })),
            }));
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
      </Box>
    );
  };

  const renderProductsDropdown = () => {
    const componentSpec = componentData?.componentSpec;
    const getDefaultProduct = () => {
      if (componentSpec && componentSpec.productName) {
        return productValueToLabelMap[componentSpec.productName];
      }
      return null;
    };
    return (
      <Autocomplete
        sx={{ width: 200 }}
        options={GUIDED_PROJECT_OTHER_PRODUCTS}
        autoHighlight
        value={getDefaultProduct()}
        onChange={(e, v) => {
          if (!v) {
            setComponentData({} as CreateProjectComponentInput);
            return;
          }
          deleteComponentDesigns(componentIndex);
          setComponentData((prev) => ({
            ...prev!,
            name: v.value,
            componentSpec: getDefaultComponentSpec(v.value)!,
          }));
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
    );
  };

  const renderBookletView = () => {
    return (
      <>
        <ListItem>
          <Box>
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.component.attribute.style" })}
            </Typography>
            {renderAutocompleteDropdown(BOOKLET_STYLES, "style")}
          </Box>
        </ListItem>
        <ListItem>
          <Box>
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.component.attribute.numberOfPages",
              })}
            </Typography>
            <TextField
              autoComplete="new-password"
              onChange={componentSpecOnChange}
              name="numberOfPages"
              value={componentData.componentSpec.numberOfPages}
            />
          </Box>
        </ListItem>
        <ListItem>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              {intl.formatMessage({ id: "app.component.attribute.dimension" })}
            </Typography>
            <DimensionsInput
              dimension={componentData!.componentSpec.dimension}
              setDimension={(data: ProductDimensionInput) => {
                setComponentSpec((prev) => ({ ...prev, dimension: data }));
              }}
            />
          </Box>
        </ListItem>
      </>
    );
  };

  const renderStickerView = () => {
    return (
      <>
        <ListItem>
          <Box>
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.component.attribute.purpose" })}
            </Typography>
            {renderAutocompleteDropdown(STICKER_PURPOSES, "purpose")}
          </Box>
        </ListItem>
        <ListItem>
          <Box>
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.component.attribute.shape" })}
            </Typography>
            {renderAutocompleteDropdown(STICKER_SHAPES, "shape")}
          </Box>
        </ListItem>
        <ListItem>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              {intl.formatMessage({ id: "app.component.attribute.dimension" })}
            </Typography>
            <DimensionsInput
              dimension={componentData!.componentSpec.dimension}
              setDimension={(data: ProductDimensionInput) => {
                setComponentSpec((prev) => ({ ...prev, dimension: data }));
              }}
            />
          </Box>
        </ListItem>
      </>
    );
  };

  const renderSleeveView = () => {
    return (
      <>
        <ListItem>
          <Box>
            <Typography variant="subtitle2" mb={1}>
              {intl.formatMessage({ id: "app.component.attribute.dimension" })}
            </Typography>
            <DimensionsInput
              dimension={componentData!.componentSpec.dimension}
              setDimension={(data: ProductDimensionInput) => {
                setComponentSpec((prev) => ({ ...prev, dimension: data }));
              }}
            />
          </Box>
        </ListItem>
        <ListItem>
          <Box>{renderPostProcessDropdown()}</Box>
        </ListItem>
      </>
    );
  };

  const renderView = () => {
    if (!componentData || !componentData.componentSpec) return null;

    if (
      componentData.componentSpec.productName === PRODUCT_NAME_BOOKLET.value
    ) {
      return renderBookletView();
    }

    if (
      componentData.componentSpec.productName === PRODUCT_NAME_STICKER.value
    ) {
      return renderStickerView();
    }

    if (componentData.componentSpec.productName === PRODUCT_NAME_SLEEVE.value) {
      return renderSleeveView();
    }

    return null;
  };

  return (
    <Box position="relative" display="flex" justifyContent="space-between">
      <IconButton
        onClick={deleteComponent}
        sx={{ position: "absolute", top: 5, right: 5, zIndex: 2 }}
      >
        <Tooltip
          arrow
          placement="top"
          title={intl.formatMessage({
            id: "app.customer.createProject.removeComponent",
          })}
        >
          <Cancel />
        </Tooltip>
      </IconButton>
      <Stack mt={2} mb={2} spacing={2} flexBasis="50%">
        <ListItem>
          <Box>
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.component.attribute.product" })}
            </Typography>
            {renderProductsDropdown()}
          </Box>
        </ListItem>

        {!!componentData && !!componentData.componentSpec && renderView()}
      </Stack>
      {!!componentData && !!componentData.componentSpec && (
        <Stack mt={2} mb={2} spacing={2} flexBasis="50%">
          {componentData.componentSpec.productName !==
            PRODUCT_NAME_BOOKLET.value && (
            <ListItem>
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {intl.formatMessage({
                    id: "app.component.attribute.includeArtworkInQuote",
                  })}
                </Typography>
                <IncludeArtworkInQuoteDropdown
                  componentSpec={componentData!.componentSpec}
                  setComponentSpec={setComponentSpec}
                />
              </Box>
            </ListItem>
          )}

          <ListItem>
            <Box>
              <Box display="flex" alignItems="center">
                <Typography variant="subtitle2">
                  {intl.formatMessage({
                    id: "app.component.attribute.designs",
                  })}
                </Typography>
                <UploadDesign
                  setComponentData={setComponentData}
                  parentSetDesigns={[setComponentDesigns]}
                />
              </Box>
              {componentDesigns?.map((file, i) => {
                return (
                  <Box>
                    <AttachmentButton
                      label={file.filename}
                      onClick={() => openLink(file.url)}
                    />
                    <IconButton onClick={() => deleteDesign(file.fileId, i)}>
                      <Cancel fontSize="small" />
                    </IconButton>
                  </Box>
                );
              })}
              {!componentDesigns?.length && (
                <Typography variant="caption">
                  <i>
                    {intl.formatMessage({
                      id: "app.customer.createProject.noDesignPlaceholder",
                    })}
                  </i>
                </Typography>
              )}
            </Box>
          </ListItem>
        </Stack>
      )}
    </Box>
  );
};

export default GuidedOtherSubSection;
