import { Business } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  List,
  ListItem,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { ProjectInvitation } from "../../../generated/graphql";
import { VENDOR_ROUTES } from "../../constants/loggedInRoutes";

const ProjectInvitationCard = ({
  invitation,
}: {
  invitation: ProjectInvitation;
}) => {
  const intl = useIntl();
  const navigate = useNavigate();

  const cardOnClick = () => {
    const dest = VENDOR_ROUTES.SEARCH_PROJECT_DETAIL.split(":");

    dest[1] = invitation.projectId;

    navigate(`${dest.join("")}`);
  };

  return (
    <Paper elevation={1}>
      <CardActionArea onClick={cardOnClick}>
        <CardContent>
          <List>
            <ListItem>
              <Box>
                <Typography variant="subtitle2">
                  {invitation.projectName}
                </Typography>
              </Box>
            </ListItem>
            <ListItem>
              <Tooltip
                title={intl.formatMessage({
                  id: "app.project.attribute.companyName",
                })}
                arrow
                placement="top"
              >
                <Business />
              </Tooltip>
              <Typography variant="caption" sx={{ ml: 2 }}>
                {invitation.customerName}
              </Typography>
            </ListItem>
          </List>
        </CardContent>
      </CardActionArea>
    </Paper>
  );
};

export default ProjectInvitationCard;
