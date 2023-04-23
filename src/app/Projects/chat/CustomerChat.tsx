import {
  Box,
  CircularProgress,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ProjectChat from "./ProjectChat";
import {
  useGetVendorDetailLazyQuery,
  useGetVendorDetailQuery,
} from "../../gql/get/vendor/vendor.generated";
import { ProjectBid } from "../../../generated/graphql";
import { useGetCustomerDetailQuery } from "../../gql/get/customer/customer.generated";
import { AuthContext } from "../../../context/AuthContext";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { useIntl } from "react-intl";

const VendorMessageRow = ({ companyId }: { companyId: string }) => {
  const { data, loading, error } = useGetVendorDetailQuery({
    variables: {
      data: {
        companyId,
      },
    },
  });

  if (error) {
    return null;
  }

  return (
    <>
      {loading && <CircularProgress />}
      <Typography variant="caption">{data?.getVendorDetail?.name}</Typography>
    </>
  );
};
const CustomerChat = ({ bids }: { bids: ProjectBid[] }) => {
  const { user } = useContext(AuthContext);
  const intl = useIntl();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [chatIndexToOpen, setChatIndexToOpen] = useState(0);
  const [vendorsList, setVendorsList] = useState<string[]>(
    bids.map((bid) => bid.companyId)
  );
  const {
    data: companyData,
    loading: companyLoading,
    error: companyError,
  } = useGetCustomerDetailQuery({
    variables: {
      data: {
        companyId: user!.companyId,
      },
    },
  });

  useEffect(() => {
    if (companyError) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [companyError]);

  return (
    <Paper sx={{ display: "flex" }}>
      <Box
        sx={{
          flexBasis: "15%",
          background: "white",
          borderTopLeftRadius: "4px",
          borderBottomLeftRadius: "4px",
          borderRight: "1px solid #f1f1f1",
          maxWidth: "12rem",
        }}
      >
        <List sx={{ p: 0, maxHeight: "555px", overflowY: "scroll" }}>
          {vendorsList.map((id, ind) => {
            return (
              <ListItem
                onClick={() => {
                  setChatIndexToOpen(ind);
                }}
                sx={{
                  background: ind === chatIndexToOpen ? "#f1f1f1" : "none",
                  ":hover": {
                    cursor: "pointer",
                    background: ind === chatIndexToOpen ? "#f1f1f1" : "#faf9f9",
                  },
                }}
              >
                <VendorMessageRow companyId={id} />
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Box sx={{ flexGrow: 2, background: "white", borderRadius: "4px" }}>
        { user &&
          <ProjectChat
            userId={user.id}
            projectBidId={bids[chatIndexToOpen] ? bids[chatIndexToOpen].id : ""}
          />
        }
      </Box>
    </Paper>
  );
};

export default CustomerChat;
