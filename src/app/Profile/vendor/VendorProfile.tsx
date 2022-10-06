import {
  Box,
  Container,
  Divider,
  Grid,
  Link,
  List,
  Paper,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  TypographyProps,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { VendorDetail } from "../../../generated/graphql";
import { useGetVendorDetailQuery } from "../../gql/get/vendor/vendor.generated";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import FullScreenLoading from "../../Utils/Loading";
import logo from "../../../static/logo2.png";
import { TranslatableAttribute } from "../../../type/common";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import styled from "@emotion/styled";
import MuiListItem from "@mui/material/ListItem";

type TypographyVariant =
  | "button"
  | "caption"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "inherit"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "overline";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vendor-profile-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const CompanyInfoListItem = styled(MuiListItem)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
}));

const VendorProfile = () => {
  const theme = useTheme();
  const intl = useIntl();
  const { companyId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [vendorData, setVendorData] = useState<VendorDetail | null>(null);
  const [currentTab, setCurrentTab] = useState(0);

  const VENDOR_PROFILE_TABS: TranslatableAttribute[] = [
    {
      label: intl.formatMessage({ id: "app.vendorProfile.tab.companyInfo" }),
      value: "companyInfo",
    },
    {
      label: intl.formatMessage({ id: "app.vendorProfile.tab.certifications" }),
      value: "certifications",
    },
    {
      label: intl.formatMessage({
        id: "app.vendorProfile.tab.productShowcase",
      }),
      value: "productShowcase",
    },
  ];

  const {
    data: getVendorDetailData,
    error: getVendorDetailError,
    loading: getVendorDetailLoading,
  } = useGetVendorDetailQuery({
    variables: {
      data: {
        companyId: companyId ? companyId : "",
      },
    },
  });

  useEffect(() => {
    if (getVendorDetailError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [getVendorDetailError]);

  useEffect(() => {
    if (getVendorDetailData && getVendorDetailData.getVendorDetail) {
      setVendorData(getVendorDetailData.getVendorDetail);
    }
  }, [getVendorDetailData]);

  const profileTabOnChange = (event: React.SyntheticEvent, newTab: number) => {
    setCurrentTab(newTab);
  };

  const renderTypography = (
    value: string | number | number[] | string[],
    props: TypographyProps & { variant: TypographyVariant }
  ) => {
    if (Array.isArray(value)) {
      return <Typography {...props}>{value.join(", ")}</Typography>;
    }
    return <Typography {...props}>{value}</Typography>;
  };

  if (getVendorDetailLoading) {
    return <FullScreenLoading />;
  }

  if (vendorData) {
    const {
      // logo,
      name,
      isVerified,

      contactEmail,
      phone,
      companyUrl,
      fax,

      country,
      leadTime,
      locations,
      moq,
      products,
    } = vendorData;
    return (
      <Container>
        <Box display="flex" flexDirection="row">
          <Box>
            <img
              src="https://media-exp1.licdn.com/dms/image/C4D0BAQHiNSL4Or29cg/company-logo_200_200/0/1519856215226?e=1672272000&v=beta&t=uDarHkbAqGPqXXIxMHqwHMuYnp7Qj69d6__4V0lDM5c"
              height={112}
              width={112}
              alt="logo"
            />
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center" ml={2}>
            {renderTypography(name, { variant: "h5", fontWeight: 500 })}
            {!isVerified && (
              <Tooltip
                title={intl.formatMessage({
                  id: "app.company.attribute.verified",
                })}
                placement="right"
                arrow
              >
                <CheckCircleIcon
                  fontSize="small"
                  color="success"
                  sx={{ ml: 1 }}
                />
              </Tooltip>
            )}
          </Box>
        </Box>

        <Paper sx={{ mt: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={currentTab} onChange={profileTabOnChange}>
              {VENDOR_PROFILE_TABS.map((tab, i) => {
                return <Tab label={tab.label} key={i} />;
              })}
            </Tabs>
          </Box>
          <TabPanel value={currentTab} index={0}>
            <Box display="flex">
              <List>
                <CompanyInfoListItem>
                  {renderTypography(
                    intl.formatMessage({
                      id: "app.company.attribute.contactEmail",
                    }),
                    {
                      variant: "subtitle2",
                    }
                  )}
                  {renderTypography(contactEmail, {
                    variant: "caption",
                  })}
                </CompanyInfoListItem>
                <CompanyInfoListItem>
                  {renderTypography(
                    intl.formatMessage({
                      id: "app.company.attribute.phone",
                    }),
                    {
                      variant: "subtitle2",
                    }
                  )}
                  {renderTypography(phone, {
                    variant: "caption",
                  })}
                </CompanyInfoListItem>
                {!!fax && (
                  <CompanyInfoListItem>
                    {renderTypography(
                      intl.formatMessage({
                        id: "app.company.attribute.fax",
                      }),
                      {
                        variant: "subtitle2",
                      }
                    )}
                    {renderTypography(fax, {
                      variant: "caption",
                    })}
                  </CompanyInfoListItem>
                )}

                {!!companyUrl && (
                  <CompanyInfoListItem>
                    {renderTypography(
                      intl.formatMessage({
                        id: "app.company.attribute.companyUrl",
                      }),
                      {
                        variant: "subtitle2",
                      }
                    )}
                    <Link
                      href={companyUrl}
                      rel="noopener"
                      target="_blank"
                      sx={{ textDecoration: "none" }}
                    >
                      {companyUrl}
                    </Link>
                  </CompanyInfoListItem>
                )}
              </List>
              <List>
                {
                  <CompanyInfoListItem>
                    {renderTypography(
                      intl.formatMessage({
                        id: "app.company.attribute.country",
                      }),
                      {
                        variant: "subtitle2",
                      }
                    )}
                    {renderTypography(country, {
                      variant: "caption",
                    })}
                  </CompanyInfoListItem>
                }
                {
                  <CompanyInfoListItem>
                    {renderTypography(
                      intl.formatMessage({
                        id: "app.vendor.attribute.products",
                      }),
                      {
                        variant: "subtitle2",
                      }
                    )}
                    {renderTypography(products, {
                      variant: "caption",
                    })}
                  </CompanyInfoListItem>
                }
                {
                  <CompanyInfoListItem>
                    {renderTypography(
                      intl.formatMessage({
                        id: "app.vendor.attribute.moq",
                      }),
                      {
                        variant: "subtitle2",
                      }
                    )}
                    {renderTypography(moq, {
                      variant: "caption",
                    })}
                  </CompanyInfoListItem>
                }
                {
                  <CompanyInfoListItem>
                    {renderTypography(
                      intl.formatMessage({
                        id: "app.vendor.attribute.locations",
                      }),
                      {
                        variant: "subtitle2",
                      }
                    )}
                    {renderTypography(locations, {
                      variant: "caption",
                    })}
                  </CompanyInfoListItem>
                }
                {
                  <CompanyInfoListItem>
                    {renderTypography(
                      intl.formatMessage({
                        id: "app.vendor.attribute.leadTime",
                      }),
                      {
                        variant: "subtitle2",
                      }
                    )}
                    {renderTypography(leadTime, {
                      variant: "caption",
                    })}
                  </CompanyInfoListItem>
                }
              </List>
            </Box>
          </TabPanel>
        </Paper>
      </Container>
    );
  }

  return <Container>Could not find vendor.</Container>;
};

export default VendorProfile;