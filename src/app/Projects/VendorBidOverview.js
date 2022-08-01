import { 
  Card,
  CardActionArea,
  CardContent,
  List,
  ListItem,
  Typography,
  Dialog,
  DialogContent, 
  Container
} from "@mui/material";
import VendorBidModal from "./VendorBidModal";
import { useEffect, useState } from "react";
import { useGetVendorDetail } from "../hooks/companyHooks";
import FullScreenLoading from "../Utils/Loading";

/**
 * Bid overview card displayed in CustomerProjectDetail
 * @param {*} param0 
 * @returns 
 */
const VendorBidOverview = ({ bid, projectComponents }) => {
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [vendorData, setVendorData] = useState(null);

  const {
    getVendorDetail,
    getVendorDetailLoading,
    getVendorDetailError,
    getVendorDetailData
  } = useGetVendorDetail();

  useEffect(() => {
    getVendorDetail({
      variables: {
        companyId: bid.companyId
      }
    })
  }, [])

  useEffect(() => {
    if (getVendorDetailData && getVendorDetailData.getVendorDetail) {
      setVendorData(getVendorDetailData.getVendorDetail)
    }
  }, [getVendorDetailData]);

  const convertToDate = (timestamp) => {
    return new Date(Date(timestamp)).toISOString().slice(0, 10);
  }

  if (getVendorDetailLoading) {
    return <FullScreenLoading />
  }


  return <Card>

    {getVendorDetailError && <Typography>Something went wrong.</Typography>}

    {
      vendorData &&
      <>
        <CardActionArea onClick={() => setIsBidModalOpen(true)}>
          <CardContent>
            <List>
              <ListItem><Typography>Vendor: {vendorData.name}</Typography></ListItem>
              <ListItem><Typography>Created On: {convertToDate(bid.createdAt)}</Typography></ListItem>

            </List>
          </CardContent>
        </CardActionArea>
        <Dialog
          open={isBidModalOpen}
          onClose={() => setIsBidModalOpen(false)}
          maxWidth="md"
          fullWidth={true}
        >
          <DialogContent>
            <VendorBidModal vendorData={vendorData} bid={bid} projectComponents={projectComponents} setIsBidModalOpen={setIsBidModalOpen}/>
          </DialogContent>
        </Dialog>
      </>
    }
  </Card>
}

export default VendorBidOverview