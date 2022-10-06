import {
  ListItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useIntl } from "react-intl";
import {
  CreateProjectComponentSpecInput,
  ProjectComponentSpec,
} from "../../../generated/graphql";
import { productValueToLabelMap } from "../../constants/products";

export default function ComponentSpecDetail({
  spec,
}: {
  spec: ProjectComponentSpec | CreateProjectComponentSpecInput;
}) {
  const intl = useIntl();

  const {
    productName,
    boxStyle,
    dimension,
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
    outsidePostProcess,
    outsideFinish,
    outsideColor,
    insideMaterial,
    insideMaterialSource,
    insidePostProcess,
    insideFinish,
    insideColor,
  } = spec;

  const res: JSX.Element[] = [];

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
            {productValueToLabelMap[productName].label}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }
  if (dimension) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: "app.component.attribute.dimension" })}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="caption">{dimension}</Typography>
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
  if (thickness) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({ id: "app.component.attribute.thickness" })}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="caption">{thickness}</Typography>
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
            {productValueToLabelMap[flute].label}
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
          <Typography variant="caption">{color}</Typography>
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
            {productValueToLabelMap[manufacturingProcess].label}
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
            {productValueToLabelMap[material].label}
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
            {productValueToLabelMap[materialSource].label}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  if (postProcess && postProcess.length) {
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
              return (
                <ListItem sx={{ padding: 0 }}>
                  <Typography variant="caption">{process}</Typography>
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
            {productValueToLabelMap[finish].label}
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
            {productValueToLabelMap[outsideMaterial].label}
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
            {productValueToLabelMap[outsideMaterialSource].label}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  if (outsidePostProcess && outsidePostProcess.length) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({
              id: "app.component.attribute.outsidePostProcess",
            })}
          </Typography>
        </TableCell>

        <TableCell>
          <Stack>
            {outsidePostProcess.map((process) => {
              return (
                <ListItem sx={{ padding: 0 }}>
                  <Typography variant="caption">{process}</Typography>
                </ListItem>
              );
            })}
          </Stack>
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
            {productValueToLabelMap[outsideFinish].label}
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
          <Typography variant="caption">{outsideColor}</Typography>
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
            {productValueToLabelMap[insideMaterial].label}
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
            {productValueToLabelMap[insideMaterialSource].label}
          </Typography>
        </TableCell>
      </TableRow>
    );
  }

  if (insidePostProcess && insidePostProcess.length) {
    res.push(
      <TableRow>
        <TableCell>
          <Typography variant="subtitle2">
            {intl.formatMessage({
              id: "app.component.attribute.insidePostProcess",
            })}
          </Typography>
        </TableCell>

        <TableCell>
          <Stack>
            {insidePostProcess.map((process) => {
              return (
                <ListItem sx={{ padding: 0 }}>
                  <Typography variant="caption">{process}</Typography>
                </ListItem>
              );
            })}
          </Stack>
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
            {productValueToLabelMap[insideFinish].label}
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
          <Typography variant="caption">{insideColor}</Typography>
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