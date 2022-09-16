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
import { useGetCompanyDetailQuery } from "../../gql/get/company/company.generated";
import { useGetVendorDetailQuery } from "../../gql/get/vendor/vendor.generated";
import { useIntl } from "react-intl";

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
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [vendorData, setVendorData] = useState<VendorDetail | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  const {
    data: getCompanyDetailData,
    error: getCompanyDetailError,
    loading: getCompanyDetailLoading,
  } = useGetCompanyDetailQuery({
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

  const convertToDate = (timestamp: string) => {
    return new Date(parseInt(timestamp, 10)).toISOString().slice(0, 10);
  };

  const moreOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setVendorBidMenuAnchor(e.currentTarget);
  };

  const moreOnClose = () => {
    setVendorBidMenuAnchor(null);
  };

  const vendorBidMenuOnClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    switch (e.currentTarget.dataset.type) {
      case "conversation":
        setChatOpen(true);
        break;
      default:
        break;
    }
    moreOnClose();
  };

  const renderBidStatus = (status: BidStatus) => {
    let res: string = "";

    switch (status) {
      case BidStatus.Open:
        res = intl.formatMessage({ id: "app.bid.status.open" });
        break;
      case BidStatus.Outdated:
        res = intl.formatMessage({ id: "app.bid.status.outdated" });
        break;
      case BidStatus.Accepted:
        res = intl.formatMessage({ id: "app.bid.status.accepted" });
        break;
      case BidStatus.Rejected:
        res = intl.formatMessage({ id: "app.bid.status.rejected" });
        break;
      case BidStatus.Expired:
        res = intl.formatMessage({ id: "app.bid.status.expired" });
        break;
    }
    if (res) {
      return (
        <Typography variant="overline">
          <i>{res}</i>
        </Typography>
      );
    }
    return null;
  };
  if (getVendorDetailLoading || getCompanyDetailLoading) {
    return <FullScreenLoading />;
  }

  if (getVendorDetailError || getCompanyDetailError) {
    return (
      <Typography>
        {intl.formatMessage({ id: "app.general.network.error" })}
      </Typography>
    );
  }
  return (
    <Card sx={{ width: "100%", position: "relative" }} variant="outlined">
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
                    {convertToDate(bid.createdAt)}
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
              <MenuItem onClick={vendorBidMenuOnClick} data-type="view-profile">
                {intl.formatMessage({
                  id: "app.customer.createProject.menu.viewVendorProfile",
                })}
              </MenuItem>
              <MenuItem onClick={vendorBidMenuOnClick} data-type="conversation">
                {intl.formatMessage({
                  id: "app.customer.createProject.menu.openConversation",
                })}
              </MenuItem>

              <MenuItem onClick={vendorBidMenuOnClick}>
                {intl.formatMessage({
                  id: "app.customer.createProject.menu.exportToPdf",
                })}
              </MenuItem>

              <MenuItem onClick={vendorBidMenuOnClick}>
                {intl.formatMessage({
                  id: "app.customer.createProject.menu.acceptBid",
                })}
              </MenuItem>

              <MenuItem onClick={vendorBidMenuOnClick}>
                {intl.formatMessage({
                  id: "app.customer.createProject.menu.rejectBid",
                })}
              </MenuItem>
            </MenuList>
          </Menu>

          <Dialog
            open={isBidModalOpen}
            onClose={() => setIsBidModalOpen(false)}
            maxWidth="md"
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

          <ProjectChat
            chatOpen={chatOpen}
            setChatOpen={setChatOpen}
            projectBidId={bid.id}
            customerName={getCompanyDetailData!.getCompanyDetail!.name}
            vendorName={vendorData.name}
          />
        </>
      )}
    </Card>
  );
};

export default VendorBidOverview;
