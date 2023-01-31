import {
  Box,
  DialogContent,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { ProjectChangelog } from "../../../../generated/graphql";
import ProjectChangelogDetail from "../ProjectChangelogDetail";
import ReactGA from "react-ga4";
import {
  EVENT_ACTION,
  EVENT_CATEGORY,
  EVENT_LABEL,
} from "../../../../analytics/constants";

const ProjectChangelogModal = ({
  changelog,
}: {
  changelog: ProjectChangelog[];
}) => {
  const intl = useIntl();
  // changelog comes in in descending order (new -> old)
  const [currentVersion, setCurrentVersion] = useState(changelog[0]);

  const versionOnChange = (e: SelectChangeEvent<number>) => {
    setCurrentVersion(changelog[e.target.value as number]);
  };

  useEffect(() => {
    ReactGA.event({
      action: EVENT_ACTION.MODAL_VIEW,
      category: EVENT_CATEGORY.PROJECT,
      label: EVENT_LABEL.PROJECT_CHANGELOG,
    });
  }, []);
  return (
    <>
      <DialogContent>
        <Box mb={2} display="flex" alignItems="center">
          <Typography variant="h6" sx={{ mr: 2 }}>
            {intl.formatMessage({ id: "app.versionHistory" })}
          </Typography>
          <Select onChange={versionOnChange} defaultValue={0}>
            {changelog.map((_, ind) => {
              return (
                <MenuItem value={ind}>
                  {intl.formatMessage({ id: "app.versionHistory.revision" })}{" "}
                  {changelog.length - ind}{" "}
                  {ind === 0
                    ? `(${intl.formatMessage({
                        id: "app.versionHistory.latest",
                      })})`
                    : ""}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
        <ProjectChangelogDetail changelog={currentVersion} />
      </DialogContent>
    </>
  );
};

export default ProjectChangelogModal;
