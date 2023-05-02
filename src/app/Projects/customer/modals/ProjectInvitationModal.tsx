import { Cancel, OpenInNew } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  List,
  ListItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { throttle } from "lodash";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import {
  ProjectInvitation,
  VendorOverview,
} from "../../../../generated/graphql";
import { useCreateProjectInvitationMutation } from "../../../gql/create/project/project.generated";
import { useDeleteProjectInvitationMutation } from "../../../gql/delete/project/project.generated";
import {
  useGetCustomerProjectInvitationsQuery,
  useGetCustomerProjectQuery,
} from "../../../gql/get/customer/customer.generated";
import { useSearchVendorCompaniesLazyQuery } from "../../../gql/get/vendor/vendor.generated";
import useCustomSnackbar from "../../../Utils/CustomSnackbar";
import Projects from "../../Projects";
import { openLink } from "../../../Utils/openLink";
import { CUSTOMER_ROUTES } from "../../../constants/loggedInRoutes";

type InvitationItem = {
  vendorName: string;
  id: string;
};
const ProjectInvitationModal = ({
  setProjectInvitationModalOpen,
  setInviteVendorToSignupOpen,
}: {
  setProjectInvitationModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setInviteVendorToSignupOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const { projectId } = useParams();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();

  const [input, setInput] = useState("");
  const [options, setOptions] = useState<VendorOverview[]>([]);

  const [selectedVendors, setSelectedVendors] = useState<VendorOverview[]>([]);

  const [vendorsToAdd, setVendorsToAdd] = useState<string[]>([]);
  const [vendorsToDelete, setVendorsToDelete] = useState<string[]>([]);

  // for display purpose
  const [vendorsList, setVendorsList] = useState<InvitationItem[]>([]);

  const [existingBidVendors, setExistingBidVendors] = useState<string[]>([]);

  const {
    data: getProjectInvitationsData,
    loading: getProjectInvitationsLoading,
    error: getProjectInvitationsError,
  } = useGetCustomerProjectInvitationsQuery({
    variables: {
      data: {
        projectId: projectId!,
      },
    },
    fetchPolicy: "no-cache",
  });

  const {
    data: getProjectData,
    loading: getProjectLoading,
    error: getProjectError,
  } = useGetCustomerProjectQuery({
    variables: {
      data: {
        projectId: projectId || "",
        userId: user!.id,
      },
    },
    fetchPolicy: "no-cache",
  });

  const [
    deleteInvitation,
    { loading: deleteInvitationLoading, error: deleteInvitationError },
  ] = useDeleteProjectInvitationMutation();
  const [
    createInvitation,
    { loading: createInvitationLoading, error: createInvitationError },
  ] = useCreateProjectInvitationMutation();

  const [
    searchVendors,
    {
      data: searchVendorsData,
      error: searchVendorsError,
      loading: searchVendorsLoading,
    },
  ] = useSearchVendorCompaniesLazyQuery();

  const fetch = useMemo(() => {
    return throttle(
      (cb: () => void) => {
        cb();
      },
      250,
      { leading: true }
    );
  }, []);
  useEffect(() => {
    if (
      getProjectData &&
      getProjectData.getCustomerProject.bids &&
      getProjectData.getCustomerProject.bids.length
    ) {
      setExistingBidVendors(
        getProjectData.getCustomerProject.bids.map((bid) => bid.companyId)
      );
    }
  }, [getProjectData]);

  useEffect(() => {
    if (
      createInvitationError ||
      searchVendorsError ||
      getProjectInvitationsError ||
      deleteInvitationError
    ) {
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.error" }),
        severity: "error",
      });
      setSnackbarOpen(true);
    }
  }, [
    createInvitationError,
    searchVendorsError,
    getProjectInvitationsError,
    deleteInvitationError,
  ]);

  useEffect(() => {
    fetch(() => {
      if (input) {
        searchVendors({
          variables: {
            data: {
              userInput: input,
            },
          },
          fetchPolicy: "network-only",
        });
      }
    });
  }, [fetch, input]);

  useEffect(() => {
    if (searchVendorsData && searchVendorsData.searchVendorCompanies.hits.length) {
      setOptions(
        searchVendorsData.searchVendorCompanies.hits.map((data) => data.vendor)
      );
    }
  }, [searchVendorsData]);

  useEffect(() => {
    // init list to display
    if (
      getProjectInvitationsData &&
      getProjectInvitationsData.getCustomerProjectInvitations
    ) {
      setVendorsList(
        getProjectInvitationsData.getCustomerProjectInvitations.map((inv) => ({
          id: inv.vendorCompanyId,
          vendorName: inv.vendorName,
        }))
      );
    }
  }, [getProjectInvitationsData]);

  const addVendorOnClick = () => {
    const toAdd: string[] = [];
    const toDisplay: InvitationItem[] = [];

    selectedVendors.forEach((vendor) => {
      if (
        getProjectInvitationsData &&
        getProjectInvitationsData.getCustomerProjectInvitations
          .map((inv) => inv.vendorCompanyId)
          .includes(vendor.id)
      ) {
        // if vendor was deleted from original invitations, add them back to display list
      } else {
        // newly added vendors, add to toAdd list that'll get sent to server later on
        toAdd.push(vendor.id);
      }
      toDisplay.push({
        vendorName: vendor.name,
        id: vendor.id,
      });
    });
    setVendorsToAdd((prev) => [...prev, ...toAdd]);
    setVendorsList((prev) => [...prev, ...toDisplay]);
    setInput("");
    setSelectedVendors([]);
  };

  const removeVendorFromToAddList = (id: string) => {
    if (vendorsToAdd.includes(id)) {
      // vendor is newly added
      const ind = vendorsToAdd.findIndex((vid) => vid === id);
      const copyVendorsToAdd = [...vendorsToAdd];
      copyVendorsToAdd.splice(ind, 1);

      setVendorsToAdd(copyVendorsToAdd);
    } else if (
      getProjectInvitationsData &&
      getProjectInvitationsData.getCustomerProjectInvitations
        .map((inv) => inv.vendorCompanyId)
        .includes(id)
    ) {
      // vendor is pre-existing
      const ind2 = vendorsList.findIndex((v) => v.id === id);
      const copyVendorsList = [...vendorsList];
      copyVendorsList.splice(ind2, 1);
      setVendorsToDelete((prev) => [...prev, id]);
    }

    const ind2 = vendorsList.findIndex((v) => v.id === id);
    const copyVendorsList = [...vendorsList];
    copyVendorsList.splice(ind2, 1);

    setVendorsList(copyVendorsList);
  };

  const openVendorProfile = (id: string) => {
    const dest = CUSTOMER_ROUTES.VENDOR_PROFILE.split(":");
    dest[1] = id;

    openLink(dest.join(""));
  };
  const renderInvitationListItem = (vendorName: string, vendorId: string) => {
    return (
      <ListItem sx={{ p: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            ":hover": {
              backgroundColor: "#fafafa",
            },
            width: "100%",
            p: 1.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="subtitle2">{vendorName}</Typography>

            <IconButton
              onClick={() => openVendorProfile(vendorId)}
              sx={{ ml: 1 }}
              disableRipple
            >
              <OpenInNew />
            </IconButton>
          </Box>
          <IconButton
            onClick={() => removeVendorFromToAddList(vendorId)}
            sx={{ mr: 1 }}
          >
            <Cancel />
          </IconButton>
        </Box>
      </ListItem>
    );
  };
  const createInvitationOnClick = async () => {
    try {
      await Promise.all([
        createInvitation({
          variables: {
            data: {
              customerCompanyId: user!.companyId,
              vendorCompanyIds: vendorsToAdd,
              projectId: projectId!,
            },
          },
        }),
        deleteInvitation({
          variables: {
            data: {
              customerCompanyId: user!.companyId,
              vendorCompanyIds: vendorsToDelete,
              projectId: projectId!,
            },
          },
        }),
      ]);
      setSnackbar({
        message: intl.formatMessage({ id: "app.general.network.success" }),
        severity: "success",
      });
      setSnackbarOpen(true);
      setProjectInvitationModalOpen(false);
    } catch (error) {}
  };

  if (!projectId) {
    return <Projects />;
  }

  // TODO: delete project invitation should also trigger a reload on vendor screen
  return (
    <>
      <DialogTitle>
        {intl.formatMessage({
          id: "app.customer.projectDetail.inviteVendors.modal.title",
        })}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="space-around">
          <Box sx={{ display: "flex", justifyContent: "center", mb: 0.5 }}>
            <Autocomplete
              sx={{ width: 400 }}
              loading={searchVendorsLoading}
              loadingText={
                intl.formatMessage({ id: "app.general.loading" }) + "..."
              }
              multiple
              options={options}
              disableCloseOnSelect
              getOptionDisabled={(option) => {
                // if vendor is in the toAdd list already
                let disabled = vendorsToAdd.includes(option.id);

                if (getProjectInvitationsData) {
                  // if invitation sent already
                  disabled =
                    disabled ||
                    getProjectInvitationsData.getCustomerProjectInvitations
                      .map((inv) => inv.vendorName)
                      .includes(option.name);
                }

                if (existingBidVendors && existingBidVendors.length) {
                  // if vendor already bid on this private project
                  disabled = disabled || existingBidVendors.includes(option.id);
                }

                return (
                  disabled ||
                  selectedVendors.map((v) => v.id).includes(option.id)
                );
              }}
              getOptionLabel={(option) => option.name}
              onBlur={() => {
                setOptions([]);
              }}
              onChange={(e, v) => {
                setSelectedVendors(v);
              }}
              inputValue={input}
              value={selectedVendors}
              onInputChange={(e, v) => setInput(v)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={intl.formatMessage({
                    id: "app.general.company.vendorName",
                  })}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                  InputLabelProps={{
                    sx: {
                      fontSize: 16,
                      top: -7,
                    },
                  }}
                />
              )}
            />
            <Box>
              <Button
                variant="contained"
                style={{ marginLeft: "4px" }}
                onClick={addVendorOnClick}
                disabled={selectedVendors.length === 0}
              >
                {intl.formatMessage({ id: "app.general.add" })}
              </Button>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Typography color="text.secondary" fontSize={"0.8rem"}>
            {intl.formatMessage({
              id: "app.customer.projectDetail.inviteVendors.signup",
            })}
          </Typography>
          <Link
            onClick={() => {
              setProjectInvitationModalOpen(false);
              setInviteVendorToSignupOpen(true);
            }}
            fontSize={"0.8rem"}
            sx={{
              ":hover": {
                cursor: "pointer",
              },
              ml: 0.5,
            }}
          >
            {intl.formatMessage({
              id: "app.customer.projectDetail.inviteVendors.inviteToSignup",
            })}
          </Link>
        </Box>
        <Box sx={{ overflow: "hidden" }}>
          {getProjectInvitationsLoading && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {!!vendorsList.length && (
            <List sx={{ maxHeight: "240px", overflow: "scroll" }}>
              {vendorsList.map((vendor) => {
                return (
                  <>{renderInvitationListItem(vendor.vendorName, vendor.id)}</>
                );
              })}
            </List>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ m: 2 }}>
        <Button
          variant="outlined"
          onClick={() => setProjectInvitationModalOpen(false)}
          disabled={createInvitationLoading}
        >
          {intl.formatMessage({ id: "app.general.cancel" })}
        </Button>
        <LoadingButton
          onClick={createInvitationOnClick}
          variant="contained"
          loading={createInvitationLoading || deleteInvitationLoading}
          disabled={!vendorsToAdd.length && !vendorsToDelete.length}
        >
          {intl.formatMessage({ id: "app.general.save" })}
        </LoadingButton>
      </DialogActions>
    </>
  );
};

export default ProjectInvitationModal;
