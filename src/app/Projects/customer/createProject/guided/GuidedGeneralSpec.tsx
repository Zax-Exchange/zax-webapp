import { Box, Button, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { useIntl } from "react-intl";

import { CreateProjectInput } from "../../../../../generated/graphql";

import ProjectSpecInput from "../common/ProjectSpecInput";

export default function GuidedGeneralSpec({
  projectData,
  setProjectData,
  activeStep,
  setActiveStep,
}: {
  projectData: CreateProjectInput;
  setProjectData: Dispatch<SetStateAction<CreateProjectInput>>;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
}) {
  const intl = useIntl();

  const shouldDisableNextButton = () => {
    for (let key in projectData) {
      const attr = key as keyof CreateProjectInput;
      if (attr === "components") continue;
      if (Array.isArray(projectData[attr])) {
        if ((projectData[attr] as []).length === 0) return true;
      } else if (!(projectData[attr] as string).length) {
        return true;
      }
    }

    if (
      isNaN(parseFloat(projectData.totalWeight!)) ||
      parseFloat(projectData.totalWeight!) === 0
    ) {
      return true;
    }

    if (
      isNaN(parseFloat(projectData.targetPrice!)) ||
      parseFloat(projectData.targetPrice!) === 0
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Box mb={1.5}>
        <Typography variant="h6" textAlign="left">
          {intl.formatMessage({
            id: "app.customer.createProject.guidedCreate.generalSpec.title",
          })}
        </Typography>
      </Box>
      <ProjectSpecInput
        setProjectData={setProjectData}
        projectData={projectData}
      />
      <Box>
        {/* <Button
          variant="text"
          onClick={() => setActiveStep((step) => step - 1)}
          disabled={activeStep === 0}
        >
          {intl.formatMessage({ id: "app.general.back" })}
        </Button> */}

        <Button
          variant="contained"
          onClick={() => setActiveStep((step) => step + 1)}
          disabled={shouldDisableNextButton()}
        >
          {intl.formatMessage({ id: "app.general.next" })}
        </Button>
      </Box>
    </>
  );
}
