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
  ProjectDesign,
} from "../../../../../generated/graphql";
import { TranslatableAttribute } from "../../../../../type/common";
import {
  BOOKLET_STYLES,
  GUIDED_PROJECT_ALL_POST_PROCESS,
  GUIDED_PROJECT_INSIDE_PRODUCTS,
  GUIDED_PROJECT_OTHER_PRODUCTS,
  productValueToLabelMap,
  PRODUCT_NAME_BOOKLET,
  PRODUCT_NAME_CORRUGATE_TRAY,
  PRODUCT_NAME_PAPER_TRAY,
  PRODUCT_NAME_STICKER,
  STICKER_PURPOSES,
  STICKER_SHAPES,
} from "../../../../constants/products";
import { useDeleteProjectDesignMutation } from "../../../../gql/delete/project/project.generated";
import {
  isValidAlphanumeric,
  isValidFloat,
} from "../../../../Utils/inputValidators";
import UploadDesign from "../../UploadDesign";
import DimensionsInput from "../common/DimensionsInput";
import IncludeArtworkInQuoteDropdown from "../common/IncludeArtworkInQuoteDropdown";
import { GuidedCreateSetComponentData } from "./GuidedCreateProject";

const bookletInitialState: CreateProjectComponentSpecInput = {
  productName: PRODUCT_NAME_BOOKLET.value,
  dimension: {
    x: "",
    y: "",
    z: "",
  },
  includeArtworkInQuote: false,
};

const stickerInitialState: CreateProjectComponentSpecInput = {
  productName: PRODUCT_NAME_STICKER.value,
  dimension: {
    x: "",
    y: "",
  },
  purpose: "",
  shape: "",
  includeArtworkInQuote: false,
};

const GuidedOther = ({
  setComponentData,
  setComponentDesigns,
  setActiveStep,
  deleteComponentDesign,
  componentDesigns,
  componentData,
  isRequired,
  activeStep,
}: {
  setComponentData: GuidedCreateSetComponentData;
  setComponentDesigns: (data: ProjectDesign | null) => void;
  setActiveStep: Dispatch<SetStateAction<number>>;
  deleteComponentDesign: (ind: number) => void;
  componentDesigns: ProjectDesign[] | null;
  componentData: CreateProjectComponentInput | null;
  isRequired: boolean; // If there are no outerBox spec and insideTray spec added, this one is required
  activeStep: number;
}) => {
  const intl = useIntl();
  const [componentSpec, setComponentSpec] =
    useState<CreateProjectComponentSpecInput>(
      {} as CreateProjectComponentSpecInput
    );

  // view based on selected productName, either booklet or stickers or null
  const [view, setView] = useState<string | null>(
    componentData && componentData.componentSpec
      ? componentData.componentSpec.productName
      : null
  );

  const [
    deleteProjectDesign,
    { error: deleteProjectDesignError, data: deleteProjectDesignData },
  ] = useDeleteProjectDesignMutation();

  useEffect(() => {
    if (view) {
      if (view === PRODUCT_NAME_BOOKLET.value) {
        setComponentSpec(bookletInitialState);
      }
      if (view === PRODUCT_NAME_STICKER.value) {
        setComponentSpec(stickerInitialState);
      }
    } else {
      setComponentSpec({} as CreateProjectComponentSpecInput);
    }

    if (view !== PRODUCT_NAME_BOOKLET.value) {
      deleteComponentDesigns();
    }
  }, [view]);

  // intialize componentSpec if there's existing data, we need this to run after the above useEffect
  // so that initialized data does not get overwritten when the above one executes
  useEffect(() => {
    if (componentData && componentData.componentSpec) {
      setComponentSpec(componentData.componentSpec);
    }
  }, []);

  const componentSpecOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    let isAllowed = true;

    switch (e.target.name) {
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

  const shouldDisableNextButton = () => {
    if (!Object.keys(componentSpec).length) return true;

    if (
      componentSpec.includeArtworkInQuote &&
      (!componentDesigns || !componentDesigns.length)
    )
      return true;

    if (componentSpec.productName === PRODUCT_NAME_BOOKLET.value) {
      if (
        !componentSpec.dimension.x ||
        !componentSpec.dimension.y ||
        !componentSpec.dimension.z
      )
        return true;
      for (let key in componentSpec) {
        const attribute = key as keyof CreateProjectComponentSpecInput;

        // These four are required for outside spec
        switch (attribute) {
          case "style":
            if (!componentSpec[attribute]) return true;
        }
      }
    } else {
      if (!componentSpec.dimension.x || !componentSpec.dimension.y) return true;
      for (let key in componentSpec) {
        const attribute = key as keyof CreateProjectComponentSpecInput;

        // These four are required for outside spec
        switch (attribute) {
          case "purpose":
          case "shape":
            if (!componentSpec[attribute]) return true;
        }
      }
    }

    return false;
  };

  const saveComponentData = () => {
    const compData = {
      name: "Other Printing & Packaging",
      designIds: componentDesigns?.map((d) => d.designId),
      componentSpec: componentSpec,
    } as CreateProjectComponentInput;

    setComponentData(compData);
  };

  const deleteComponentDesigns = () => {
    if (componentDesigns) {
      Promise.all(
        componentDesigns.map((design) => {
          return deleteProjectDesign({
            variables: {
              data: {
                designId: design.designId,
              },
            },
          });
        })
      );
      setComponentDesigns(null);
    }
  };
  const handleNext = () => {
    saveComponentData();
    setActiveStep((step) => step + 1);
  };

  const handleBack = () => {
    if (Object.keys(componentSpec).length || componentDesigns) {
      saveComponentData();
    }
    setActiveStep((step) => step - 1);
  };

  const skipToNext = () => {
    setComponentData(null);
    setActiveStep((step) => step + 1);
    deleteComponentDesigns();
  };

  const deleteDesign = async (id: string, ind: number) => {
    try {
      await deleteProjectDesign({
        variables: {
          data: {
            designId: id,
          },
        },
      });

      deleteComponentDesign(ind);
    } catch (error) {}
  };

  const renderAutocompleteDropdown = (
    options: TranslatableAttribute[],
    attribute: keyof CreateProjectComponentSpecInput,
    label: string
  ) => {
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
          setComponentSpec((spec) => {
            if (!v) {
              return {
                ...spec!,
                [attribute]: "",
              };
            }

            if (v.value === componentSpec[attribute]) {
              return spec!;
            } else {
              return {
                ...spec!,
                [attribute]: v.value,
              };
            }
          });
        }}
        renderInput={(params) => (
          <TextField
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
  };

  const renderProductsDropdown = () => {
    const getDefaultProduct = () => {
      if (componentSpec.productName) {
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
            setView(null);
            return;
          }
          setView(v.value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={intl.formatMessage({
              id: "app.customer.createProject.guidedCreate.otherPrintingAndPackaging",
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
    );
  };

  const renderBookletView = () => {
    return (
      <>
        <ListItem>
          {renderAutocompleteDropdown(
            BOOKLET_STYLES,
            "style",
            intl.formatMessage({
              id: "app.component.attribute.type",
            })
          )}
        </ListItem>
        <ListItem>
          <DimensionsInput
            componentSpec={componentSpec}
            setComponentSpec={setComponentSpec}
          />
        </ListItem>
      </>
    );
  };

  const renderStickerView = () => {
    return (
      <>
        <ListItem>
          {renderAutocompleteDropdown(
            STICKER_PURPOSES,
            "purpose",
            intl.formatMessage({ id: "app.component.attribute.purpose" })
          )}
        </ListItem>
        <ListItem>
          {renderAutocompleteDropdown(
            STICKER_SHAPES,
            "shape",
            intl.formatMessage({ id: "app.component.attribute.shape" })
          )}
        </ListItem>
        <ListItem>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              {intl.formatMessage({ id: "app.component.attribute.dimension" })}
            </Typography>
            <DimensionsInput
              componentSpec={componentSpec}
              setComponentSpec={setComponentSpec}
            />
          </Box>
        </ListItem>
      </>
    );
  };

  const renderView = () => {
    if (view === PRODUCT_NAME_BOOKLET.value) {
      return renderBookletView();
    }

    if (view === PRODUCT_NAME_STICKER.value) {
      return renderStickerView();
    }

    return null;
  };

  return (
    <>
      <Box>
        <Typography variant="h6" textAlign="left">
          {intl.formatMessage({
            id: "app.customer.createProject.guidedCreate.other.title",
          })}
        </Typography>
      </Box>
      <Stack mt={2} mb={2} spacing={2}>
        <ListItem>{renderProductsDropdown()}</ListItem>

        {renderView()}
        {!!view && (
          <ListItem>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {intl.formatMessage({
                  id: "app.component.attribute.includeArtworkInQuote",
                })}
              </Typography>
              <IncludeArtworkInQuoteDropdown
                componentSpec={componentSpec}
                setComponentSpec={setComponentSpec}
              />
            </Box>
          </ListItem>
        )}
        {!!componentDesigns && (
          <ListItem>
            <Box>
              <Typography variant="subtitle2">
                {intl.formatMessage({
                  id: "app.component.attribute.designs",
                })}
              </Typography>
              {componentDesigns.map((file, i) => {
                return (
                  <Box>
                    <Link href={file.url} target="_blank" rel="noopener">
                      {file.filename}
                    </Link>
                    <IconButton onClick={() => deleteDesign(file.designId, i)}>
                      <Cancel fontSize="small" />
                    </IconButton>
                  </Box>
                );
              })}
            </Box>
          </ListItem>
        )}
      </Stack>
      <Box>
        <UploadDesign
          setComponentData={setComponentData}
          parentSetDesigns={[setComponentDesigns]}
        />
        <Button variant="text" onClick={handleBack} style={{ marginRight: 8 }}>
          {intl.formatMessage({ id: "app.general.back" })}
        </Button>
        <Button
          variant="text"
          onClick={skipToNext}
          style={{ marginRight: 8 }}
          disabled={isRequired}
        >
          {intl.formatMessage({
            id: "app.customer.createProject.guidedCreate.skip",
          })}
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={shouldDisableNextButton()}
        >
          {intl.formatMessage({ id: "app.general.next" })}
        </Button>
      </Box>
    </>
  );
};

export default GuidedOther;
