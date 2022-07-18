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
import { useState } from "react";

const VendorBidOverview = ({ bid, projectComponents }) => {
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);

  const convertToDate = (timestamp) => {
    return new Date(Date(timestamp)).toISOString().slice(0, 10);
  }

  return <Card>
    <CardActionArea onClick={() => setIsBidModalOpen(true)}>
      <CardContent>
        <List>
          <ListItem><Typography>Vendor: {bid.companyId}</Typography></ListItem>
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
        <VendorBidModal bid={bid} projectComponents={projectComponents} setIsBidModalOpen={setIsBidModalOpen}/>
      </DialogContent>
    </Dialog>
  </Card>
}

export default VendorBidOverview