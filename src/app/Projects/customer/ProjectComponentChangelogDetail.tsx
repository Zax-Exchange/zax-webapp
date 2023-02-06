import { ArrowRightAlt, South } from "@mui/icons-material";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import {
  ProjectComponentChangelog,
  ProductDimension,
  PostProcessDetail,
  ProjectComponentPropertyChange,
} from "../../../generated/graphql";
import { productValueToLabelMap } from "../../constants/products";
import AttachmentButton from "../../Utils/AttachmentButton";

type DesignChangelogType = {
  id: string;
  filename: string;
};
const ProjectComponentChangelogDetail = ({
  changelog,
}: {
  changelog: ProjectComponentChangelog;
}) => {
  const theme = useTheme();
  const intl = useIntl();

  const reorderChanges = (changes: ProjectComponentPropertyChange[]) => {
    // put postprocess change to first
    let postProcessChange: ProjectComponentPropertyChange | null = null;
    let otherChanges = [];
    for (let change of changes) {
      if (change.propertyName === "postProcess") {
        postProcessChange = change;
      } else {
        otherChanges.push(change);
      }
    }
    otherChanges = otherChanges.sort((a, b) =>
      a.propertyName.localeCompare(b.propertyName)
    );
    if (!!postProcessChange) {
      otherChanges.push(postProcessChange);
    }

    return otherChanges;
  };

  const renderDimension = (dimension: ProductDimension) => {
    const dims = Object.entries(dimension).filter(([k, v]) => v !== null);
    const output = [];
    for (let [attr, dim] of dims) {
      output.push(parseFloat(dim as string));
    }
    return `${output.join("x")}`;
  };

  const renderPostProcess = (
    postProcess: PostProcessDetail[],
    isOld: boolean
  ) => {
    if (isOld && !postProcess.length) {
      return intl.formatMessage({ id: "app.versionHistory.none" });
    }
    if (!isOld && !postProcess.length) {
      return intl.formatMessage({ id: "app.versionHistory.removed" });
    } else {
      return (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  {intl.formatMessage({
                    id: "app.component.attribute.postProcess",
                  })}
                </TableCell>
                <TableCell>
                  {intl.formatMessage({ id: "app.component.side" })}
                </TableCell>
                <TableCell>
                  {intl.formatMessage({
                    id: "app.component.postProcess.printing.numberOfColors",
                  })}
                </TableCell>
                <TableCell>
                  {intl.formatMessage({
                    id: "app.component.postProcess.printing.method",
                  })}
                </TableCell>
                <TableCell>
                  {intl.formatMessage({
                    id: "app.component.postProcess.emboss.fontSize",
                  })}
                </TableCell>
                <TableCell>
                  {intl.formatMessage({
                    id: "app.component.postProcess.foilStamp.color",
                  })}
                </TableCell>
                <TableCell>
                  {intl.formatMessage({
                    id: "app.component.postProcess.estimatedArea",
                  })}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {postProcess.map((process) => {
                const dims = Object.entries(process.estimatedArea || {});
                const estimatedArea = [];
                for (let [attr, dim] of dims) {
                  if (!dim) continue;
                  estimatedArea.push(parseFloat(dim));
                }

                const res: JSX.Element[] = [];

                res.push(
                  <TableCell>
                    {intl.formatMessage({
                      id: productValueToLabelMap[process.postProcessName]
                        .labelId,
                    })}
                  </TableCell>
                );

                if (process.isInside !== null) {
                  if (process.isInside) {
                    res.push(
                      <TableCell>
                        {intl.formatMessage({
                          id: "app.component.inside",
                        })}
                      </TableCell>
                    );
                  } else {
                    res.push(
                      <TableCell>
                        {intl.formatMessage({
                          id: "app.component.outside",
                        })}
                      </TableCell>
                    );
                  }
                } else {
                  res.push(<TableCell>-</TableCell>);
                }

                if (
                  !!process.numberOfColors &&
                  !!process.numberOfColors.c &&
                  !!process.numberOfColors.t
                ) {
                  res.push(
                    <TableCell>
                      {process.numberOfColors.c}/{process.numberOfColors.t}
                    </TableCell>
                  );
                } else {
                  res.push(<TableCell>-</TableCell>);
                }

                if (process.printingMethod) {
                  res.push(
                    <TableCell>
                      {intl.formatMessage({
                        id: productValueToLabelMap[process.printingMethod]
                          .labelId,
                      })}
                    </TableCell>
                  );
                } else {
                  res.push(<TableCell>-</TableCell>);
                }

                if (process.fontSize) {
                  res.push(
                    <TableCell>
                      {process.fontSize}{" "}
                      {intl.formatMessage({ id: "app.general.unit.px" })}
                    </TableCell>
                  );
                } else {
                  res.push(<TableCell>-</TableCell>);
                }

                if (process.color) {
                  res.push(
                    <TableCell>
                      {intl.formatMessage({
                        id: productValueToLabelMap[process.color].labelId,
                      })}
                    </TableCell>
                  );
                } else {
                  res.push(<TableCell>-</TableCell>);
                }

                if (process.estimatedArea && estimatedArea.length) {
                  res.push(
                    <TableCell>
                      {estimatedArea.join("x")}{" "}
                      {intl.formatMessage({
                        id: "app.general.unit.mm",
                      })}
                    </TableCell>
                  );
                } else {
                  res.push(<TableCell>-</TableCell>);
                }

                return <TableRow>{res}</TableRow>;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
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

  const renderDesignFileChangelog = (
    filename: string,
    description: string,
    color: string,
    disabled: boolean
  ) => {
    return (
      <Box display="flex" alignItems="center" mt={1} mb={1}>
        <Box sx={{ minWidth: "200px" }}>
          <AttachmentButton
            onClick={() => {}}
            label={filename}
            disabled={disabled}
          />
        </Box>
        <ArrowRightAlt fontSize="small" sx={{ ml: 3, mr: 3 }} />
        <Typography variant="overline" color={color} sx={{ minWidth: "200px" }}>
          {description}
        </Typography>
      </Box>
    );
  };
  const getDesignsDetail = (
    oldDesigns: DesignChangelogType[],
    newDesigns: DesignChangelogType[]
  ) => {
    const res: { filename: string; isNew: boolean; isRemoved: boolean }[] = [];

    for (let design of oldDesigns) {
      if (!newDesigns.find((d) => d.id === design.id)) {
        // design is removed
        res.push({
          filename: design.filename,
          isNew: false,
          isRemoved: true,
        });
      }
    }
    for (let design of newDesigns) {
      if (!oldDesigns.find((d) => d.id === design.id)) {
        // design is newly uploaded
        res.push({
          filename: design.filename,
          isNew: true,
          isRemoved: false,
        });
      }
    }
    return res;
  };

  const renderChangeValue = (
    propertyName: string,
    newValue: any,
    oldValue: any
  ) => {
    if (propertyName === "designs") {
      const designs = getDesignsDetail(
        oldValue as DesignChangelogType[],
        newValue as DesignChangelogType[]
      );

      const res: JSX.Element[] = [];

      for (let design of designs) {
        if (design.isRemoved) {
          res.push(
            renderDesignFileChangelog(
              design.filename,
              intl.formatMessage({ id: "app.versionHistory.removed" }),
              theme.palette.error.main,
              true
            )
          );
        }
        if (design.isNew) {
          res.push(
            renderDesignFileChangelog(
              design.filename,
              intl.formatMessage({ id: "app.versionHistory.added" }),
              theme.palette.success.main,
              false
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
    if (propertyName === "dimension") {
      return renderOldAndNewValueString(
        renderDimension(JSON.parse(oldValue as string)),
        renderDimension(newValue)
      );
    }
    if (!isNaN(parseFloat(newValue))) {
      return renderOldAndNewValueString(
        parseFloat(oldValue).toString(),
        parseFloat(newValue).toString()
      );
    }
    if (propertyName === "postProcess") {
      return (
        <Box>
          {renderPostProcess(JSON.parse(oldValue), true)}
          <South fontSize="small" sx={{ mt: 1, mb: 1 }} />
          {renderPostProcess(newValue, false)}
        </Box>
      );
    }

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
    return renderOldAndNewValueString(oldValue, newValue);
  };
  return (
    <Box>
      <TableContainer>
        <TableBody>
          {reorderChanges(changelog.changes).map((change) => {
            return (
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2">
                    {intl.formatMessage({
                      id: `app.component.attribute.${change.propertyName}`,
                    })}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box display="flex" alignItems="center">
                    {renderChangeValue(
                      change.propertyName,
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

export default ProjectComponentChangelogDetail;
