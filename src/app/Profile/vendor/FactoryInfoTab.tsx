import React, { useEffect, useState } from "react";
import { useGetVendorFactoriesQuery } from "../../gql/get/vendor/vendor.generated";
import { useParams } from "react-router-dom";
import { FactoryDetail } from "../../../generated/graphql";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { useIntl } from "react-intl";
import {
  Box,
  MenuItem,
  Select,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { productValueToLabelMap } from "../../constants/products";
import FullScreenLoading from "../../Utils/Loading";

const FactoryInfoTab = () => {
  const intl = useIntl();
  const { companyId } = useParams();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const { loading, data, error } = useGetVendorFactoriesQuery({
    variables: {
      data: {
        vendorCompanyId: companyId || "",
      },
    },
    fetchPolicy: "no-cache",
  });
  const [currentFactory, setCurrentFactory] = useState<FactoryDetail | null>(
    null
  );
  const [factoriesList, setFactoriesList] = useState<FactoryDetail[]>([]);

  useEffect(() => {
    if (data && data.getVendorFactories.length) {
      setFactoriesList(data.getVendorFactories);
      setCurrentFactory(data.getVendorFactories[0]);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
      });
      setSnackbarOpen(true);
    }
  }, [error]);

  const selectFactoryOnClick = (loc: string) => {
    setCurrentFactory(factoriesList.find((f) => f.location === loc)!);
  };
  return (
    <Box>
      {loading && <FullScreenLoading />}
      {currentFactory && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            p: 2,
          }}
        >
          <Typography variant="subtitle2">
            {intl.formatMessage({
              id: "app.vendor.attribute.locations",
            })}
          </Typography>
          <Select
            value={currentFactory.location}
            labelId="factory-tab-location"
            onChange={(e) => selectFactoryOnClick(e.target.value)}
            sx={{
              width: 300,
            }}
          >
            {data!.getVendorFactories.map((factory) => {
              return (
                <MenuItem value={factory.location}>{factory.location}</MenuItem>
              );
            })}
          </Select>
        </Box>
      )}
      {data && !data.getVendorFactories.length && (
        <Typography variant="caption" color="text.secondary">
          {intl.formatMessage({
            id: "app.vendorProfile.tab.factoryInfo.noFactory",
          })}
        </Typography>
      )}
      {currentFactory && (
        <TableContainer>
          <TableHead>
            <TableRow>
              <TableCell>
                {intl.formatMessage({
                  id: "app.component.attribute.product",
                })}
              </TableCell>
              <TableCell>
                {intl.formatMessage({
                  id: "app.vendor.attribute.moq",
                })}
              </TableCell>
              <TableCell>
                {intl.formatMessage({
                  id: "app.vendor.attribute.leadTime",
                })}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentFactory.factoryProductsDetail.map((factory) => {
              return (
                <TableRow>
                  <TableCell>
                    {intl.formatMessage({
                      id: productValueToLabelMap[factory.product].labelId,
                    })}
                  </TableCell>
                  <TableCell>{factory.moq}</TableCell>
                  <TableCell>
                    {intl.formatMessage(
                      { id: "app.general.months" },
                      {
                        month: factory.leadTime,
                      }
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </TableContainer>
      )}
    </Box>
  );
};

export default FactoryInfoTab;
