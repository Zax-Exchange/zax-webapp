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

  const processOldAndNewComponents = (
    oldComps: { id: string; name: string }[],
    newComps: { id: string | null; name: string }[]
  ) => {
    const res: { name: string; isNew: boolean; isRemoved: boolean }[] = [];

    for (let comp of oldComps) {
      if (!newComps.find((d) => d.id === comp.id)) {
        // comp is removed
        res.push({
          name: comp.name,
          isNew: false,
          isRemoved: true,
        });
      }
    }
    for (let comp of newComps) {
      if (!oldComps.find((d) => d.id === comp.id)) {
        // comp is newly uploaded
        res.push({
          name: comp.name,
          isNew: true,
          isRemoved: false,
        });
      }
    }
    return res;
  };

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

  const renderComponentChangelog = (
    componentName: string,
    description: string,
    color: string
  ) => {
    return (
      <Box display="flex" alignItems="center" mt={1} mb={1}>
        <Typography variant="overline" sx={{ minWidth: "200px" }}>
          {componentName}
        </Typography>
        <ArrowRightAlt fontSize="small" sx={{ ml: 3, mr: 3 }} />
        <Typography variant="overline" color={color} sx={{ minWidth: "200px" }}>
          {description}
        </Typography>
      </Box>
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

    if (propertyName === "components") {
      const comps = processOldAndNewComponents(oldValue, newValue);

      const res: JSX.Element[] = [];

      for (let comp of comps) {
        if (comp.isRemoved) {
          res.push(
            renderComponentChangelog(
              comp.name,
              intl.formatMessage({ id: "app.versionHistory.removed" }),
              theme.palette.error.main
            )
          );
        }
        if (comp.isNew) {
          res.push(
            renderComponentChangelog(
              comp.name,
              intl.formatMessage({ id: "app.versionHistory.added" }),
              theme.palette.success.main
            )
          );
        }
      }

      return (
        <Box display="flex" flexDirection="column">
          {res}
        </Box>
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
