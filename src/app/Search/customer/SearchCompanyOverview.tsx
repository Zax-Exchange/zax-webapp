import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Dialog,
  DialogContent,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { VendorOverview } from "../../../generated/graphql";

const SearchCompanyOverview = ({
  companyData,
}: {
  companyData: VendorOverview;
}) => {
  const [isCompanyDetailOpen, setIsCompanyDetail] = useState(false);

  return (
    <Container style={{ marginBottom: "10px" }}>
      <Card
        onClick={() => setIsCompanyDetail(true)}
        variant="elevation"
        elevation={2}
      >
        <CardActionArea>
          <CardContent>
            <Container sx={{ minWidth: 400, textAlign: "left" }}>
              <Typography>Company Name: {companyData.name}</Typography>
              <Typography>Country: {companyData.country}</Typography>
              <Typography>
                Locations: {companyData.locations.join(",")}
              </Typography>
              <Typography>
                Products: {companyData.products.join(",")}
              </Typography>
              <Typography>Lead time: {companyData.leadTime}</Typography>
              <Typography>Minimum order quantity: {companyData.moq}</Typography>
            </Container>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* <Dialog>
      <DialogContent>

      </DialogContent>
    </Dialog> */}
    </Container>
  );
};

export default SearchCompanyOverview;
