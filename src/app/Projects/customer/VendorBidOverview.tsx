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
import VendorBidModal from "./VendorBidModal";
import { useEffect, useState } from "react";
import {
  useGetCompanyDetail,
  useGetVendorDetail,
} from "../../hooks/companyHooks";
import FullScreenLoading from "../../Utils/Loading";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import CustomerProjectChat from "../chat/ProjectChat";
import ProjectChat from "../chat/ProjectChat";

/**
 * Bid overview card displayed in CustomerProjectDetail
 * @param {*} param0
 * @returns
 */
const VendorBidOverview = ({ bid, projectComponents }) => {
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [vendorData, setVendorData] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);

  const {
    getCompanyDetailData,
    getCompanyDetailError,
    getCompanyDetailLoading,
  } = useGetCompanyDetail();
  const {
    getVendorDetail,
    getVendorDetailLoading,
    getVendorDetailError,
    getVendorDetailData,
  } = useGetVendorDetail();

  const [vendorBidMenuAnchor, setVendorBidMenuAnchor] = useState(null);
  const vendorBidMenuOpen = !!vendorBidMenuAnchor;

  useEffect(() => {
    getVendorDetail({
      variables: {
        companyId: bid.companyId,
      },
    });
  }, []);

  useEffect(() => {
    if (getVendorDetailData && getVendorDetailData.getVendorDetail) {
      setVendorData(getVendorDetailData.getVendorDetail);
    }
  }, [getVendorDetailData]);

  const convertToDate = (timestamp) => {
    return new Date(Date(timestamp)).toISOString().slice(0, 10);
  };

  const moreOnClick = (e) => {
    setVendorBidMenuAnchor(e.currentTarget);
  };

  const moreOnClose = () => {
    setVendorBidMenuAnchor(null);
  };

  const vendorBidMenuOnClick = (e) => {
    switch (e.target.dataset.type) {
      case "conversation":
        setChatOpen(true);
        break;
      default:
        break;
    }
    moreOnClose();
  };

  if (getVendorDetailLoading || getCompanyDetailLoading) {
    return <FullScreenLoading />;
  }

  if (getVendorDetailError || getCompanyDetailError) {
    return <Typography>Error</Typography>;
  }
  return (
    <Card sx={{ width: "100%", position: "relative" }}>
      {getVendorDetailError && <Typography>Something went wrong.</Typography>}

      {vendorData && (
        <>
          <CardActionArea onClick={() => setIsBidModalOpen(true)}>
            <CardContent>
              <List>
                <ListItem>
                  <Typography>Vendor: {vendorData.name}</Typography>
                </ListItem>
                <ListItem>
                  <Typography>
                    Created On: {convertToDate(bid.createdAt)}
                  </Typography>
                </ListItem>
              </List>
            </CardContent>
          </CardActionArea>
          <IconButton
            sx={{ position: "absolute", right: "4px", top: 0 }}
            id="vendor-bid-button"
            onClick={moreOnClick}
            onClose={moreOnClose}
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
                View vendor profile
              </MenuItem>
              <MenuItem onClick={vendorBidMenuOnClick} data-type="conversation">
                Open conversation
              </MenuItem>

              <MenuItem onClick={vendorBidMenuOnClick}>Export to pdf</MenuItem>

              <MenuItem onClick={vendorBidMenuOnClick}>Accept</MenuItem>

              <MenuItem onClick={vendorBidMenuOnClick}>Reject</MenuItem>
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
            customerName={getCompanyDetailData.getCompanyDetail.name}
            vendorName={vendorData.name}
          />
        </>
      )}
    </Card>
  );
};

export default VendorBidOverview;
