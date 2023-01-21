import {
  Box,
  Button,
  Collapse,
  Container,
  DialogActions,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect, useState } from "react";
import React from "react";
import {
  ProjectBid,
  ProjectBidComponent,
  ProjectComponent,
  ProjectComponentSpec,
  VendorDetail,
} from "../../../../generated/graphql";
import { useIntl } from "react-intl";
import ComponentSpecDetail from "../../common/ComponentSpecDetail";
import { PRODUCT_NAME_MOLDED_FIBER_TRAY } from "../../../constants/products";
import { countries } from "../../../constants/countries";
import AttachmentButton from "../../../Utils/AttachmentButton";
import { openLink } from "../../../Utils/openLink";
import ReactGA from "react-ga4";
import { CUSTOMER_ROUTES } from "../../../constants/loggedInRoutes";

/**
 * Bid modal shown in CustomerProjectDetail
 * @param {*} param0
 * @returns
 */

type ProjectComponentRow = {
  quantity: number;
  price: string;
  bidComponent: ProjectBidComponent;
  projectComponent: ProjectComponent;
  isLast: boolean;
};

const BidComponentRow = ({ row }: { row: ProjectComponentRow }) => {
  const intl = useIntl();
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        key={row.projectComponent.name}
        sx={{ "& > *": { borderBottom: "unset" } }}
      >
        {row.isLast ? (
          <TableCell sx={{ width: "1em" }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        ) : (
          <TableCell sx={{ width: "1em" }} />
        )}
        <TableCell component="th" scope="row" align="right">
          {row.isLast ? row.projectComponent.name : ""}
        </TableCell>
        <TableCell align="right">{row.quantity}</TableCell>
        <TableCell align="right">${parseFloat(row.price)}</TableCell>

        <TableCell align="right">
          {row.isLast ? `$${row.bidComponent.samplingFee}` : "-"}
        </TableCell>

        <TableCell align="right">
          {row.isLast
            ? row.bidComponent.toolingFee
              ? `$${row.bidComponent.toolingFee}`
              : "-"
            : "-"}
        </TableCell>
      </TableRow>
      {row.isLast && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <ComponentSpecDetail
                  spec={row.projectComponent.componentSpec}
                />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

const VendorBidModal = ({
  bid,
  projectComponents,
  setIsBidModalOpen,
  vendorData,
}: {
  bid: ProjectBid;
  projectComponents: ProjectComponent[];
  setIsBidModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  vendorData: VendorDetail;
}) => {
  const intl = useIntl();

  // Get projectComponent based on bidComponent
  const getComponent = (id: string) => {
    return projectComponents.find((comp) => comp.id === id);
  };

  const getCountryPhoneCode = () => {
    return countries.find((country) => country.label === vendorData.country)!
      .phone;
  };

  useEffect(() => {}, []);

  return (
    <>
      <Box mb={2} pl={3} mt={1}>
        <Box>
          <Typography variant="subtitle2">
            {intl.formatMessage({
              id: "app.customer.projectDetail.bidModal.vendorInformation",
            })}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column">
          <Typography variant="caption">{`${vendorData.name}`}</Typography>

          <Typography variant="caption">
            {`${intl.formatMessage({
              id: "app.company.attribute.phone",
            })}: +(${getCountryPhoneCode()}) ${vendorData.phone}`}
          </Typography>

          {vendorData.fax && (
            <Typography variant="caption">
              {`${intl.formatMessage({
                id: "app.company.attribute.fax",
              })}: +(${getCountryPhoneCode()}) ${vendorData.fax}`}
            </Typography>
          )}
          <Typography variant="caption">{`${intl.formatMessage({
            id: "app.company.attribute.contactEmail",
          })}: ${vendorData.contactEmail}`}</Typography>
        </Box>
        {!!bid.remarkFile && (
          <Box mt={2}>
            <Typography variant="subtitle2">
              {intl.formatMessage({
                id: "app.vendor.search.AdditionRemarks",
              })}
            </Typography>
            <Box display="flex">
              <AttachmentButton
                label={bid.remarkFile!.filename}
                onClick={() => openLink(bid.remarkFile!.url)}
              />
            </Box>
          </Box>
        )}
      </Box>

      <TableContainer component={Box}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          {bid.components.map((comp, bidCompIndex) => {
            const rows: ProjectComponentRow[] = [];
            const projectComponent = getComponent(comp.projectComponentId)!;

            if (projectComponent) {
              comp.quantityPrices.forEach((qp, i) => {
                rows.push({
                  quantity: qp.quantity,
                  price: qp.price,
                  bidComponent: comp,
                  projectComponent,
                  isLast: i === comp.quantityPrices.length - 1,
                });
              });
            }

            return (
              <>
                {bidCompIndex === 0 && (
                  <TableHead>
                    <TableRow>
                      <TableCell width="10%" />
                      <TableCell align="right" width="20%">
                        {intl.formatMessage({
                          id: "app.component.attribute.name",
                        })}
                      </TableCell>
                      <TableCell align="right" width="15%">
                        {intl.formatMessage({
                          id: "app.bid.attribute.quantity",
                        })}
                      </TableCell>
                      <TableCell align="right" width="15%">
                        {intl.formatMessage({ id: "app.bid.attribute.price" })}
                      </TableCell>
                      <TableCell align="right" width="20%">
                        {intl.formatMessage({
                          id: "app.bid.attribute.samplingFee",
                        })}
                      </TableCell>

                      <TableCell align="right" width="20%">
                        {intl.formatMessage({
                          id: "app.bid.attribute.toolingFee",
                        })}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                )}
                <TableBody>
                  {rows.map((row) => (
                    <>
                      <BidComponentRow row={row} />
                    </>
                  ))}
                </TableBody>
                <TableBody sx={{ height: 20 }} />
              </>
            );
          })}
        </Table>
      </TableContainer>
    </>
  );
};

export default VendorBidModal;
