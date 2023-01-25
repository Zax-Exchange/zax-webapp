import styled from "@emotion/styled";
import { Box, List, Typography } from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import {
  CustomerProject,
  Project,
  VendorGuestProject,
  VendorProject,
} from "../../../generated/graphql";
import { ProjectOverviewListItem } from "../customer/CustomerProjectOverviewCard";

const ProjectDetailListItem = styled(ProjectOverviewListItem)(() => ({
  flexDirection: "column",
  alignItems: "flex-start",
}));

const ProjectSpecDetail = ({
  projectData,
  isVendorProject = false,
  isGuestProject = false,
}: {
  projectData: Project | CustomerProject | VendorProject | VendorGuestProject;
  isVendorProject?: boolean;
  isGuestProject?: boolean;
}) => {
  const intl = useIntl();
  const renderAttributeTitle = (attr: string) => {
    return <Typography variant="subtitle2">{attr}</Typography>;
  };

  // Render project fields
  const renderProjectField = (
    projectAttribute: keyof Project,
    projectFieldData: string | number | number[]
  ) => {
    if (Array.isArray(projectFieldData)) {
      return (
        <Typography variant="caption">{projectFieldData.join(", ")}</Typography>
      );
    }

    let fieldString = projectFieldData;
    if (projectAttribute === "totalWeight") {
      fieldString += ` ${intl.formatMessage({ id: "app.general.unit.g" })}`;
    }
    if (projectAttribute === "targetPrice") {
      fieldString = `${parseFloat(fieldString as string)} ${intl.formatMessage({
        id: "app.general.currency.usd",
      })}`;
    }
    return <Typography variant="caption">{fieldString}</Typography>;
  };

  return (
    <>
      <Box p={3}>
        <Box display="flex">
          <List sx={{ mr: 16 }}>
            {isVendorProject && (
              <ProjectDetailListItem>
                {renderAttributeTitle(
                  intl.formatMessage({
                    id: "app.vendor.project.attribute.customerName",
                  })
                )}
                {renderProjectField("companyName", projectData.companyName)}
              </ProjectDetailListItem>
            )}

            <ProjectDetailListItem>
              {renderAttributeTitle(
                intl.formatMessage({ id: "app.project.attribute.name" })
              )}
              {renderProjectField("name", projectData.name)}
            </ProjectDetailListItem>

            {isGuestProject && (
              <ProjectDetailListItem>
                {renderAttributeTitle(
                  intl.formatMessage({
                    id: "app.project.attribute.guestEmail",
                  })
                )}
                {renderProjectField(
                  "guestEmail",
                  (projectData as VendorGuestProject).guestEmail
                )}
              </ProjectDetailListItem>
            )}

            <ProjectDetailListItem>
              {renderAttributeTitle(
                intl.formatMessage({
                  id: "app.project.attribute.category",
                })
              )}
              {renderProjectField("category", projectData.category)}
            </ProjectDetailListItem>

            <ProjectDetailListItem>
              {renderAttributeTitle(
                intl.formatMessage({
                  id: "app.project.attribute.totalWeight",
                })
              )}
              {renderProjectField("totalWeight", projectData.totalWeight)}
            </ProjectDetailListItem>

            <ProjectDetailListItem>
              {renderAttributeTitle(
                intl.formatMessage({
                  id: "app.project.attribute.deliveryDate",
                })
              )}

              {renderProjectField("deliveryDate", projectData.deliveryDate)}
            </ProjectDetailListItem>
          </List>
          <List>
            <ProjectDetailListItem>
              {renderAttributeTitle(
                intl.formatMessage({
                  id: "app.project.attribute.targetPrice",
                })
              )}
              {renderProjectField("targetPrice", projectData.targetPrice)}
            </ProjectDetailListItem>
            <ProjectDetailListItem>
              {renderAttributeTitle(
                intl.formatMessage({
                  id: "app.project.attribute.orderQuantities",
                })
              )}
              {renderProjectField(
                "orderQuantities",
                projectData.orderQuantities
              )}
            </ProjectDetailListItem>
            <ProjectDetailListItem>
              {renderAttributeTitle(
                intl.formatMessage({
                  id: "app.general.createdAt",
                })
              )}
              <Typography variant="caption">
                {projectData.createdAt.slice(0, 10)}
              </Typography>
            </ProjectDetailListItem>
            <ProjectDetailListItem>
              {renderAttributeTitle(
                intl.formatMessage({
                  id: "app.general.updatedAt",
                })
              )}
              <Typography variant="caption">
                {projectData.updatedAt.slice(0, 10)}
              </Typography>
            </ProjectDetailListItem>
          </List>
        </Box>
        <Box>
          <List sx={{ pt: 0 }}>
            <ProjectDetailListItem>
              {renderAttributeTitle(
                intl.formatMessage({
                  id: "app.project.attribute.deliveryAddress",
                })
              )}

              {renderProjectField(
                "deliveryAddress",
                projectData.deliveryAddress
              )}
            </ProjectDetailListItem>
          </List>
        </Box>
      </Box>
    </>
  );
};

export default ProjectSpecDetail;
