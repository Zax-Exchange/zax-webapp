import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import CustomerProjectDetail from "./customer/CustomerProjectDetail";
import VendorProjectDetail from "./vendor/VendorProjectDetail";
import { Dialog } from "@mui/material";
import PermissionDenied from "../Utils/PermissionDenied";
import NotFound from "../Utils/NotFound";
import { useIntl } from "react-intl";

const ProjectDetail = () => {
  const { user } = useContext(AuthContext);
  const [permissionedDenied, setPermissionDenied] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const intl = useIntl();

  if (permissionedDenied) {
    return (
      <Dialog open={true}>
        <PermissionDenied />
      </Dialog>
    );
  }

  if (notFound) {
    return (
      <Dialog open>
        <NotFound
          description={intl.formatMessage({ id: "app.error.project.notFound" })}
        />
      </Dialog>
    );
  }

  if (user?.isVendor) {
    return (
      <VendorProjectDetail
        setNotFound={setNotFound}
        setPermissionDenied={setPermissionDenied}
      />
    );
  }

  if (!user?.isVendor) {
    return (
      <CustomerProjectDetail
        setNotFound={setNotFound}
        setPermissionDenied={setPermissionDenied}
      />
    );
  }

  return null;
};

export default ProjectDetail;
