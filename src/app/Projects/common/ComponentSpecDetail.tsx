import { CheckCircle, ImageOutlined, InfoOutlined } from "@mui/icons-material";
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
  TableHead,
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
    const rawBoxStyle = productValueToLabelMap[boxStyle];
    const cdn = process.env.REACT_APP_CLOUDFRONT_URL;

    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: "app.component.attribute.boxStyle" })}
          </Typography>
        </TableCell>
        <TableCell>
          <Box display="flex" alignItems="center">
            <Typography variant="caption" sx={{ mr: 1 }}>
              {intl.formatMessage({ id: rawBoxStyle.labelId })}
            </Typography>
            <Tooltip
              title={
                <>
                  <img
                    height={150}
                    width={150}
                    src={`${cdn}/box-styles/${rawBoxStyle.code}.png`}
                    alt="box_style"
                  />
                </>
              }
              placement="right"
            >
              <ImageOutlined fontSize="small" color="info" />
            </Tooltip>
          </Box>
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
          <Typography variant="caption">
            {intl.formatMessage({ id: productValueToLabelMap[style].labelId })}
          </Typography>
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
          <Typography variant="caption">
            {intl.formatMessage({
              id: productValueToLabelMap[purpose].labelId,
            })}
          </Typography>
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
          <Typography variant="caption">
            {intl.formatMessage({ id: productValueToLabelMap[shape].labelId })}
          </Typography>
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
                    if (!dim || attr === "__typename") continue;
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
                    res.push(<TableCell>{process.printingMethod}</TableCell>);
                  } else {
                    res.push(<TableCell>-</TableCell>);
                  }

                  if (process.fontSize) {
                    res.push(
                      <TableCell>
                        {process.fontSize}
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

                  if (process.estimatedArea) {
                    res.push(
                      <TableCell>
                        {estimatedArea.join("x")}
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
          <Stack></Stack>
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
