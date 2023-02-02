import { ArrowRightAlt } from "@mui/icons-material";
import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import { Project, ProjectChangelog } from "../../../generated/graphql";
import { productValueToLabelMap } from "../../constants/products";

const ProjectChangelogDetail = ({
  changelog,
}: {
  changelog: ProjectChangelog;
}) => {
  const intl = useIntl();
  const theme = useTheme();

  const renderOldAndNewValueString = (oldValue: string, newValue: string) => {
    return (
      <>
        <Typography
          variant="caption"
          color={theme.palette.error.main}
          sx={{ minWidth: "200px" }}
        >
          {oldValue}
        </Typography>
        <ArrowRightAlt fontSize="small" sx={{ ml: 3, mr: 3 }} />
        <Typography
          variant="caption"
          color={theme.palette.success.main}
          sx={{ minWidth: "200px" }}
        >
          {newValue}
        </Typography>
      </>
    );
  };
  const renderChangeValue = (
    propertyName: keyof Project,
    newValue: any,
    oldValue: any
  ) => {
    if (productValueToLabelMap[oldValue] && productValueToLabelMap[newValue]) {
      return renderOldAndNewValueString(
        intl.formatMessage({
          id: productValueToLabelMap[oldValue].labelId,
        }),
        intl.formatMessage({
          id: productValueToLabelMap[newValue].labelId,
        })
      );
    }

    if (propertyName === "orderQuantities") {
      return renderOldAndNewValueString(
        oldValue.join(", "),
        newValue.join(", ")
      );
    }

    if (!isNaN(parseFloat(newValue))) {
      return renderOldAndNewValueString(
        parseFloat(oldValue).toString(),
        parseFloat(newValue).toString()
      );
    }

    return renderOldAndNewValueString(oldValue, newValue);
  };

  return (
    <Box>
      <TableContainer>
        <TableBody>
          {changelog.changes.map((change) => {
            return (
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2">
                    {intl.formatMessage({
                      id: `app.project.attribute.${change.propertyName}`,
                    })}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" alignItems="center">
                    {renderChangeValue(
                      change.propertyName as keyof Project,
                      change.newValue,
                      change.oldValue
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </TableContainer>
    </Box>
  );
};

export default ProjectChangelogDetail;
