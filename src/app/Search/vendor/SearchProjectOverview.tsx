import { useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Container,
} from "@mui/material";
import React from "react";
import { ProjectOverview } from "../../../generated/graphql";
import { VENDOR_ROUTES } from "../../constants/loggedInRoutes";

const SearchProjectOverview = ({
  projectData,
}: {
  projectData: ProjectOverview;
}) => {
  const navigate = useNavigate();

  const handleProjectOnClick = (projectId: string) => {
    const dest = VENDOR_ROUTES.SEARCH_PROJECT_DETAIL.split(":");
    dest[1] = projectId;
    navigate(`${dest.join("")}`);
  };

  const date = new Date(parseInt(projectData.createdAt, 10))
    .toISOString()
    .slice(0, 10);

  return (
    <Container style={{ marginBottom: "10px" }}>
      <Card
        className="search-project-overview-container"
        onClick={() => handleProjectOnClick(projectData.id)}
        variant="elevation"
        elevation={2}
      >
        <CardActionArea>
          <CardContent>
            <Container sx={{ minWidth: 400, textAlign: "left" }}>
              <Typography>Project Name: {projectData.name}</Typography>
              <Typography>
                Products: {projectData.products.join(",")}
              </Typography>
              <Typography>Company: {projectData.companyName}</Typography>
              <Typography>Delivery date: {projectData.deliveryDate}</Typography>
              <Typography>
                Delivery address: {projectData.deliveryAddress}
              </Typography>
              <Typography>Budget: {projectData.budget}</Typography>
              <Typography>Posted on: {date}</Typography>
            </Container>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
};

export default SearchProjectOverview;
