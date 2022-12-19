import { CheckCircle } from "@mui/icons-material";
import {
  Box,
  Link,
  List,
  ListItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import {
  CreateProjectComponentInput,
  CreateProjectComponentSpecInput,
  ProjectComponent,
  ProjectComponentSpec,
  ProjectDesign,
} from "../../../generated/graphql";
import { productValueToLabelMap } from "../../constants/products";
import AttachmentButton from "../../Utils/AttachmentButton";
import { openLink } from "../../Utils/openLink";

export default function ComponentSpecDetail({
  spec,
  designs,
}: {
  spec: ProjectComponentSpec | CreateProjectComponentSpecInput;
  designs?: ProjectDesign[] | null | undefined;
}) {
  const intl = useIntl();

  const {
    productName,
    style,
    boxStyle,
    numberOfPages,
    dimension,
    includeArtworkInQuote,
    purpose,
    shape,
    thickness,
    flute,
    color,
    manufacturingProcess,
    material,
    materialSource,
    postProcess,
    finish,
    outsideMaterial,
    outsideMaterialSource,
    outsideFinish,
    outsideColor,
    insideMaterial,
    insideMaterialSource,
    insideFinish,
    insideColor,
  } = spec;

  const res: JSX.Element[] = [];

  if (designs && designs.length) {
    res.push(
      <TableRow>
        <TableCell>
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle2">
              {intl.formatMessage({ id: "app.component.attribute.designs" })}
            </Typography>
            {typeof includeArtworkInQuote === "boolean" &&
              includeArtworkInQuote && (
                <Tooltip
                  title={intl.formatMessage({
                    id: "app.component.attribute.includeArtworkInQuote",
                  })}
                  placement="top"
                  arrow
                >
                  <CheckCircle fontSize="small" color="info" sx={{ ml: 1 }} />
                </Tooltip>
              )}
          </Box>
        </TableCell>
        <TableCell>
          {designs.map((design) => {
            return (
              <AttachmentButton
                label={design.filename}
                onClick={() => openLink(design.url)}
              />
            );
          })}
        </TableCell>
      </TableRow>
    );
  }
  if (productName) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: "app.component.attribute.product" })}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="caption">
            {intl.formatMessage({
              id: productValueToLabelMap[productName].labelId,
            })}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }
  if (dimension) {
    const dims = Object.entries(dimension);
    const output = [];
    for (let [attr, dim] of dims) {
      if (!dim || attr === "__typename") continue;
      output.push(parseFloat(dim));
    }
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: "app.component.attribute.dimension" })}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="caption">
            {output.join("x")}
            {intl.formatMessage({ id: "app.general.unit.mm" })}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }
  if (numberOfPages) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({
              id: "app.component.attribute.numberOfPages",
            })}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="caption">{numberOfPages}</Typography>
        </TableCell>
      </TableRow>
    );
  }

  if (boxStyle) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: "app.component.attribute.boxStyle" })}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="caption">{boxStyle}</Typography>
        </TableCell>
      </TableRow>
    );
  }
  if (style) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: "app.component.attribute.style" })}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="caption">{style}</Typography>
        </TableCell>
      </TableRow>
    );
  }
  if (purpose) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: "app.component.attribute.purpose" })}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="caption">{purpose}</Typography>
        </TableCell>
      </TableRow>
    );
  }
  if (shape) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: "app.component.attribute.shape" })}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="caption">{shape}</Typography>
        </TableCell>
      </TableRow>
    );
  }
  if (thickness) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: "app.component.attribute.thickness" })}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="caption">
            {parseFloat(thickness)}{" "}
            {intl.formatMessage({ id: "app.general.unit.mm" })}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  if (flute) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: "app.component.attribute.flute" })}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="caption">
            {intl.formatMessage({
              id: productValueToLabelMap[flute].labelId,
            })}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  if (color) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: "app.component.attribute.color" })}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="caption">
            {intl.formatMessage({
              id: productValueToLabelMap[color].labelId,
            })}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  if (manufacturingProcess) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({
              id: "app.component.attribute.manufacturingProcess",
            })}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="caption">
            {intl.formatMessage({
              id: productValueToLabelMap[manufacturingProcess].labelId,
            })}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  if (material) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: "app.component.attribute.material" })}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="caption">
            {intl.formatMessage({
              id: productValueToLabelMap[material].labelId,
            })}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  if (materialSource) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({
              id: "app.component.attribute.materialSource",
            })}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="caption">
            {intl.formatMessage({
              id: productValueToLabelMap[materialSource].labelId,
            })}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  if (postProcess && postProcess.length) {
    // only field in postProcess guaranteed to exist is postProcessName
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({
              id: "app.component.attribute.postProcess",
            })}
          </Typography>
        </TableCell>

        <TableCell>
          <Stack>
            {postProcess.map((process) => {
              const dims = Object.entries(process.estimatedArea || {});
              const estimatedArea = [];
              for (let [attr, dim] of dims) {
                if (!dim || attr === "__typename") continue;
                estimatedArea.push(parseFloat(dim));
              }
              return (
                <ListItem sx={{ padding: 0 }}>
                  <Typography variant="caption">
                    {process.isInside !== null
                      ? process.isInside
                        ? `${intl.formatMessage({
                            id: "app.component.inside",
                          })} `
                        : `${intl.formatMessage({
                            id: "app.component.outside",
                          })} `
                      : ""}

                    {intl.formatMessage({
                      id: productValueToLabelMap[process.postProcessName]
                        .labelId,
                    })}
                    {process.numberOfColors
                      ? ` ${intl.formatMessage({
                          id: "app.component.postProcess.printing.numberOfColors",
                        })}: ${process.numberOfColors.c}/${
                          process.numberOfColors.t
                        }`
                      : ""}
                    {process.printingMethod
                      ? ` ${intl.formatMessage({
                          id: "app.component.postProcess.printing.method",
                        })}: ${process.printingMethod}`
                      : ""}
                    {process.fontSize
                      ? ` ${intl.formatMessage({
                          id: "app.component.postProcess.emboss.fontSize",
                        })}: ${process.fontSize}`
                      : ""}
                    {process.color
                      ? ` ${intl.formatMessage({
                          id: "app.component.postProcess.foilStamp.color",
                        })}: ${intl.formatMessage({
                          id: productValueToLabelMap[process.color].labelId,
                        })}`
                      : ""}
                    {estimatedArea.length
                      ? ` ${intl.formatMessage({
                          id: "app.component.postProcess.estimatedArea",
                        })}: ${estimatedArea.join("x")}${intl.formatMessage({
                          id: "app.general.unit.mm",
                        })}`
                      : ""}
                  </Typography>
                </ListItem>
              );
            })}
          </Stack>
        </TableCell>
      </TableRow>
    );
  }

  if (finish) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: "app.component.attribute.finish" })}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="caption">
            {intl.formatMessage({
              id: productValueToLabelMap[finish].labelId,
            })}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  if (outsideMaterial) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({
              id: "app.component.attribute.outsideMaterial",
            })}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="caption">
            {intl.formatMessage({
              id: productValueToLabelMap[outsideMaterial].labelId,
            })}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  if (outsideMaterialSource) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({
              id: "app.component.attribute.outsideMaterialSource",
            })}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="caption">
            {intl.formatMessage({
              id: productValueToLabelMap[outsideMaterialSource].labelId,
            })}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  if (outsideFinish) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({
              id: "app.component.attribute.outsideFinish",
            })}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="caption">
            {intl.formatMessage({
              id: productValueToLabelMap[outsideFinish].labelId,
            })}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  if (outsideColor) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({
              id: "app.component.attribute.outsideColor",
            })}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="caption">
            {intl.formatMessage({
              id: productValueToLabelMap[outsideColor].labelId,
            })}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  if (insideMaterial) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({
              id: "app.component.attribute.insideMaterial",
            })}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="caption">
            {intl.formatMessage({
              id: productValueToLabelMap[insideMaterial].labelId,
            })}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  if (insideMaterialSource) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({
              id: "app.component.attribute.insideMaterialSource",
            })}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="caption">
            {intl.formatMessage({
              id: productValueToLabelMap[insideMaterialSource].labelId,
            })}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  if (insideFinish) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({
              id: "app.component.attribute.insideFinish",
            })}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="caption">
            {intl.formatMessage({
              id: productValueToLabelMap[insideFinish].labelId,
            })}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  if (insideColor) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({
              id: "app.component.attribute.insideColor",
            })}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="caption">
            {intl.formatMessage({
              id: productValueToLabelMap[insideColor].labelId,
            })}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableContainer>
      <Table size="small">
        <TableBody>{res}</TableBody>
      </Table>
    </TableContainer>
  );
}
