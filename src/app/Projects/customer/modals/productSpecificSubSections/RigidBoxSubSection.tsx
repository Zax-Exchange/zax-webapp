import styled from "@emotion/styled";
import {
  Autocomplete,
  Button,
  IconButton,
  List,
  ListItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useCallback, useState } from "react";
import { CreateProjectComponentSpecInput } from "../../../../../generated/graphql";
import {
  POST_PROCESS_DEBOSS,
  POST_PROCESS_EMBOSS,
  POST_PROCESS_FOIL_STAMP,
  POST_PROCESS_PRINTING,
  RIGID_BOX_FINISHES,
  RIGID_BOX_MATERIALS,
  RIGID_BOX_MATERIAL_SOURCES,
  RIGID_BOX_POST_PROCESSES,
} from "../../../../constants/products";
import MuiStack from "@mui/material/Stack";
import { isValidAlphanumeric } from "../../../../Utils/inputValidators";
import CancelIcon from "@mui/icons-material/Cancel";

type RigidBoxPostProcessDetail = {
  postProcessName: string;
  numberOfColors?: string;
  color?: string;
  estimatedArea?: string;
  fontSize?: string;
};

const Stack = styled((props: any) => {
  return <MuiStack {...props} spacing={1.5} />;
})(() => ({}));

const RigidBoxSubSection = ({
  setComponentSpec,
  componentSpec,
}: {
  setComponentSpec: React.Dispatch<
    React.SetStateAction<CreateProjectComponentSpecInput>
  >;
  componentSpec: CreateProjectComponentSpecInput;
}) => {
  const [insidePostProcessDetail, setInsidePostProcessDetail] =
    useState<RigidBoxPostProcessDetail>({} as RigidBoxPostProcessDetail);

  const [outsidePostProcessDetail, setOutsidePostProcessDetail] =
    useState<RigidBoxPostProcessDetail>({} as RigidBoxPostProcessDetail);

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
    setOutsidePostProcessDetail({} as RigidBoxPostProcessDetail);
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
    setInsidePostProcessDetail({} as RigidBoxPostProcessDetail);
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

  // combine post process detail into string based on post process name
  const formatPostProcessDetail = (
    postProcessDetail: RigidBoxPostProcessDetail
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

  const renderAutocompleteDropdown = useCallback(
    (
      options: string[],
      componentSpecAttribute: keyof CreateProjectComponentSpecInput,
      label: string,
      helperText: string = "",
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
              helperText={helperText}
            />
          )}
        />
      );
    },
    []
  );

  const renderPostProcessSection = (
    postProcessDetail: RigidBoxPostProcessDetail,
    setPostProcessDetail: React.Dispatch<
      React.SetStateAction<RigidBoxPostProcessDetail>
    >,
    label: string
  ) => {
    return (
      <>
        <Autocomplete
          sx={{ width: 250 }}
          options={RIGID_BOX_POST_PROCESSES}
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
    postProcessDetail: RigidBoxPostProcessDetail,
    postProcessOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    addPostProcess: () => void
  ) => {
    let subSection = null;
    if (postProcessDetail.postProcessName === POST_PROCESS_PRINTING) {
      subSection = (
        <>
          <ListItem>
            <TextField
              key="number-of-colors"
              autoComplete="new-password"
              label="Number Of Colors To Print"
              onChange={postProcessOnChange}
              name="numberOfColors"
              value={postProcessDetail.numberOfColors}
            />
          </ListItem>
          <ListItem>
            <TextField
              key="printing-estimated-area"
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
              key="emboss-font-size"
              autoComplete="new-password"
              label="Emboss Font Size"
              onChange={postProcessOnChange}
              name="fontSize"
              value={postProcessDetail.fontSize}
            />
          </ListItem>
          <ListItem>
            <TextField
              key="emboss-estimated-area"
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
              key="deboss-font-size"
              autoComplete="new-password"
              label="Deboss Font Size"
              onChange={postProcessOnChange}
              name="fontSize"
              value={postProcessDetail.fontSize}
            />
          </ListItem>
          <ListItem>
            <TextField
              key="deboss-estimated-area"
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
              key="foil-stamp-color"
              autoComplete="new-password"
              label="Foil Stamp Color"
              onChange={postProcessOnChange}
              name="color"
              value={postProcessDetail.color}
            />
          </ListItem>
          <ListItem>
            <TextField
              key="foil-stamp-estimated-area"
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

  const renderComponentSpecSection = () => {
    const renderMaterialsDropdown = (
      componentSpecAttribute: keyof CreateProjectComponentSpecInput,
      label: string
    ) => {
      return renderAutocompleteDropdown(
        RIGID_BOX_MATERIALS,
        componentSpecAttribute,
        label
      );
    };
    const renderRigixBoxMaterialSourcesDropdown = (
      componentSpecAttribute: keyof CreateProjectComponentSpecInput,
      label: string
    ) => {
      return renderAutocompleteDropdown(
        RIGID_BOX_MATERIAL_SOURCES,
        componentSpecAttribute,
        label
      );
    };

    const renderRigidBoxFinishesDropdown = (
      componentSpecAttribute: keyof CreateProjectComponentSpecInput,
      label: string
    ) => {
      return renderAutocompleteDropdown(
        RIGID_BOX_FINISHES,
        componentSpecAttribute,
        label
      );
    };
    return (
      <>
        <Stack>
          <ListItem>
            <Typography variant="subtitle2">General Specs</Typography>
          </ListItem>
          <ListItem>
            <TextField
              autoComplete="new-password"
              label="Dimension"
              onChange={componentSpecOnChange}
              name="dimension"
              value={componentSpec.dimension}
            />
          </ListItem>
          <ListItem>
            <TextField
              autoComplete="new-password"
              label="Thickness"
              onChange={componentSpecOnChange}
              name="thickness"
              value={componentSpec.thickness}
            />
          </ListItem>
        </Stack>
        <Stack>
          <ListItem>
            <Typography variant="subtitle2">Outside Specs</Typography>
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              RIGID_BOX_MATERIALS,
              "outsideMaterial",
              "Outside Material",
              "If unsure, we recommend C2S."
            )}
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              RIGID_BOX_MATERIAL_SOURCES,
              "outsideMaterialSource",
              "Outside Material Source",
              "If unsure, we recoomend Standard."
            )}
          </ListItem>
          <ListItem>
            {renderAutocompleteDropdown(
              RIGID_BOX_FINISHES,
              "outsideFinish",
              "Outside Finish",
              "If unsure, we recoomend SHIT."
            )}
          </ListItem>
          <ListItem>
            {renderPostProcessSection(
              outsidePostProcessDetail,
              setOutsidePostProcessDetail,
              "Outside Post Process"
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
            {renderMaterialsDropdown("insideMaterial", "Inside Material")}
          </ListItem>
          <ListItem>
            {renderRigixBoxMaterialSourcesDropdown(
              "insideMaterialSource",
              "Inside Material Source"
            )}
          </ListItem>
          <ListItem>
            {renderRigidBoxFinishesDropdown("insideFinish", "Inside Finish")}
          </ListItem>
          <ListItem>
            {renderPostProcessSection(
              insidePostProcessDetail,
              setInsidePostProcessDetail,
              "Inside Post Process"
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

export default RigidBoxSubSection;
