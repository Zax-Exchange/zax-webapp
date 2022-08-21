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
import { useContext, useEffect, useState } from "react";
import FullScreenLoading from "../../Utils/Loading";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import ProjectChat from "../chat/ProjectChat";
import { ProjectBid, ProjectComponent, useGetCompanyDetailQuery, useGetVendorDetailQuery, VendorDetail } from "../../../generated/graphql";
import { AuthContext } from "../../../context/AuthContext";
import React from "react";

/**
 * Bid overview card displayed in CustomerProjectDetail
 * @param {*} param0
 * @returns
 */
const VendorBidOverview = ({ bid, projectComponents } : {
  bid: ProjectBid
  projectComponents: ProjectComponent[]
}) => {
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
      companyId: user!.companyId
    }
  });
  const {
    loading: getVendorDetailLoading,
    error: getVendorDetailError,
    data: getVendorDetailData,
  } = useGetVendorDetailQuery({
    variables: {
      companyId: bid.companyId
    }
  });

  const [vendorBidMenuAnchor, setVendorBidMenuAnchor] = useState<HTMLButtonElement | null>(null);
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

  const vendorBidMenuOnClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    switch (e.currentTarget.dataset.type) {
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
            customerName={getCompanyDetailData!.getCompanyDetail!.name}
            vendorName={vendorData.name}
          />
        </>
      )}
    </Card>
  );
};

export default VendorBidOverview;
