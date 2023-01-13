import {
  Card,
  CardActionArea,
  CardContent,
  List,
  ListItem,
  Typography,
  Dialog,
  DialogContent,
  Container,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  Tooltip,
} from "@mui/material";
import VendorBidModal from "./modals/VendorBidModal";
import { useContext, useEffect, useState } from "react";
import FullScreenLoading from "../../Utils/Loading";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import ProjectChat from "../chat/ProjectChat";
import {
  BidStatus,
  ProjectBid,
  ProjectComponent,
  VendorDetail,
} from "../../../generated/graphql";
import { AuthContext } from "../../../context/AuthContext";
import React from "react";
import { useGetVendorDetailQuery } from "../../gql/get/vendor/vendor.generated";
import { useIntl } from "react-intl";
import {
  useGetCustomerDetailQuery,
  useGetPurchaseOrderQuery,
} from "../../gql/get/customer/customer.generated";
import { useNavigate } from "react-router-dom";
import {
  CUSTOMER_ROUTES,
  GENERAL_ROUTES,
} from "../../constants/loggedInRoutes";
import CreatePOModal from "./modals/CreatePOModal";
import { ErrorOutline, EventAvailableOutlined } from "@mui/icons-material";

type VendorBidOverviewMenuSelection =
  | "view-profile"
  | "open-conversation"
  | "export-to-pdf"
  | "create-po"
  | "accept"
  | "reject";

/**
 * Bid overview card displayed in CustomerProjectDetail
 * @param {*} param0
 * @returns
 */
const VendorBidOverview = ({
  bid,
  projectComponents,
}: {
  bid: ProjectBid;
  projectComponents: ProjectComponent[];
}) => {
  const navigate = useNavigate();
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [vendorData, setVendorData] = useState<VendorDetail | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [isCreatePOModalOpen, setIsCreatePOModalOpen] = useState(false);

  const {
    loading: getPurchaseOrderLoading,
    error: getPurchaseOrderError,
    data: getPurchaseOrderData,
  } = useGetPurchaseOrderQuery({
    variables: {
      data: {
        projectId: projectComponents[0].projectId,
        projectBidId: bid.id,
      },
    },
  });

  const {
    data: getCustomerDetailData,
    error: getCustomerDetailError,
    loading: getCustomerDetailLoading,
  } = useGetCustomerDetailQuery({
    variables: {
      data: {
        companyId: user!.companyId,
      },
    },
  });

  const {
    loading: getVendorDetailLoading,
    error: getVendorDetailError,
    data: getVendorDetailData,
  } = useGetVendorDetailQuery({
    variables: {
      data: {
        companyId: bid.companyId,
      },
    },
  });

  const [vendorBidMenuAnchor, setVendorBidMenuAnchor] =
    useState<HTMLButtonElement | null>(null);
  const vendorBidMenuOpen = !!vendorBidMenuAnchor;

  useEffect(() => {
    if (getVendorDetailData && getVendorDetailData.getVendorDetail) {
      setVendorData(getVendorDetailData.getVendorDetail as VendorDetail);
    }
  }, [getVendorDetailData]);

  const moreOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setVendorBidMenuAnchor(e.currentTarget);
  };

  const moreOnClose = () => {
    setVendorBidMenuAnchor(null);
  };

  const viewVendorProfile = () => {
    const dest = CUSTOMER_ROUTES.VENDOR_PROFILE.split(":");
    dest[1] = bid.companyId;

    navigate(`${dest.join("")}`);
  };
  const vendorBidMenuOnClick = (type: VendorBidOverviewMenuSelection) => {
    switch (type) {
      case "open-conversation":
        setChatOpen(true);
        break;
      case "view-profile":
        viewVendorProfile();
        break;
      case "create-po":
        navigate(GENERAL_ROUTES.PO_INVOICE);
        break;
      default:
        break;
    }
    moreOnClose();
  };

  // If there's an existing PO, we render view PO, otherwise we render create PO
  const renderPOMenuItem = () => {};

  const renderBidStatus = (status: BidStatus) => {
    switch (status) {
      case BidStatus.Open:
        return (
          <Tooltip
            title={intl.formatMessage({ id: "app.bid.status.open.tooltip" })}
            placement="top"
            arrow
          >
            <EventAvailableOutlined color="success" />
          </Tooltip>
        );
      case BidStatus.Outdated:
        return (
          <Tooltip
            title={intl.formatMessage({
              id: "app.bid.status.outdated.tooltip",
            })}
            placement="top"
            arrow
          >
            <ErrorOutline color="warning" />
          </Tooltip>
        );
    }
    return null;
  };
  if (getVendorDetailLoading || getCustomerDetailLoading) {
    return <FullScreenLoading />;
  }

  if (getVendorDetailError || getCustomerDetailError) {
    return (
      <Typography>
        {intl.formatMessage({ id: "app.general.network.error" })}
      </Typography>
    );
  }
  return (
    <Card sx={{ width: "100%", position: "relative" }}>
      {vendorData && (
        <>
          <CardActionArea onClick={() => setIsBidModalOpen(true)}>
            <CardContent>
              <List>
                <ListItem>{renderBidStatus(bid.status)}</ListItem>
                <ListItem>
                  <Typography variant="subtitle2">
                    {intl.formatMessage({ id: "app.general.vendor" })}:{" "}
                    {vendorData.name}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography variant="caption">
                    {intl.formatMessage({ id: "app.general.createdAt" })}:{" "}
                    {bid.createdAt.slice(0, 10)}
                  </Typography>
                </ListItem>
              </List>
            </CardContent>
          </CardActionArea>
          <IconButton
            sx={{ position: "absolute", right: "4px", top: 0 }}
            id="vendor-bid-button"
            onClick={moreOnClick}
          >
            <MoreIcon />
          </IconButton>
          <Menu
            id="vendor-bid-menu"
            anchorEl={vendorBidMenuAnchor}
            open={vendorBidMenuOpen}
            onClose={moreOnClose}
            sx={{ padding: 0 }}
          >
            <MenuList dense sx={{ padding: "4px 0 4px" }}>
              <MenuItem onClick={() => vendorBidMenuOnClick("view-profile")}>
                {intl.formatMessage({
                  id: "app.customer.projectDetail.bid.menu.viewVendorProfile",
                })}
              </MenuItem>
              <MenuItem
                onClick={() => vendorBidMenuOnClick("open-conversation")}
              >
                {intl.formatMessage({
                  id: "app.customer.projectDetail.bid.menu.openConversation",
                })}
              </MenuItem>

              {/* <MenuItem onClick={() => vendorBidMenuOnClick("export-to-pdf")}>
                {intl.formatMessage({
                  id: "app.customer.projectDetail.bid.menu.exportToPdf",
                })}
              </MenuItem> */}

              <MenuItem onClick={() => vendorBidMenuOnClick("create-po")}>
                {intl.formatMessage({
                  id: "app.customer.projectDetail.bid.menu.createPO",
                })}
              </MenuItem>

              {/* <MenuItem onClick={() => vendorBidMenuOnClick("accept")}>
                {intl.formatMessage({
                  id: "app.customer.projectDetail.bid.menu.acceptBid",
                })}
              </MenuItem>

              <MenuItem onClick={() => vendorBidMenuOnClick("reject")}>
                {intl.formatMessage({
                  id: "app.customer.projectDetail.bid.menu.rejectBid",
                })}
              </MenuItem> */}
            </MenuList>
          </Menu>

          <Dialog
            open={isBidModalOpen}
            onClose={() => setIsBidModalOpen(false)}
            maxWidth="lg"
            fullWidth={true}
          >
            <DialogContent>
              <VendorBidModal
                vendorData={vendorData}
                bid={bid}
                projectComponents={projectComponents}
                setIsBidModalOpen={setIsBidModalOpen}
              />
            </DialogContent>
          </Dialog>

          <Dialog
            open={isCreatePOModalOpen}
            onClose={() => setIsCreatePOModalOpen(false)}
            maxWidth="md"
            fullWidth={true}
          >
            <DialogContent>
              <CreatePOModal />
            </DialogContent>
          </Dialog>

          <ProjectChat
            chatOpen={chatOpen}
            setChatOpen={setChatOpen}
            projectBidId={bid.id}
            customerName={getCustomerDetailData!.getCustomerDetail.name}
            vendorName={vendorData.name}
          />
        </>
      )}
    </Card>
  );
};

export default VendorBidOverview;
