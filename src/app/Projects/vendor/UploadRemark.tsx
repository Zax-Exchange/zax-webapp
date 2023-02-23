import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { BidRemark } from "../../../generated/graphql";
import { Target } from "../../../type/common";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useUploadBidRemarkMutation } from "../../gql/upload/bid/uploadBidRemark.generated";

const UploadRemark = ({
  setRemarkId,
  setRemarkFile,
  deleteExistingRemark,
}: {
  setRemarkId: (id: string) => void;
  setRemarkFile: React.Dispatch<React.SetStateAction<BidRemark | null>>;
  deleteExistingRemark: () => void;
}) => {
  const intl = useIntl();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [mutate, { error, loading, data }] = useUploadBidRemarkMutation();

  useEffect(() => {
    // server error
    if (error) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
      });
      setSnackbarOpen(true);
    }
    // upload success
    if (data) {
      setSnackbar({
        severity: "success",
        message: intl.formatMessage({
          id: "app.vendor.uploadRemark.success",
        }),
      });
      setSnackbarOpen(true);
    }
  }, [error, data]);

  const onUpload = async ({ target }: { target: Target }) => {
    if (!target.files) return;
    const file = target.files[0];
    target.value = "";

    try {
      const [uploadResult, _] = await Promise.all([
        mutate({
          variables: { file },
          fetchPolicy: "no-cache",
        }),
        deleteExistingRemark(),
      ]);
      const remarkFile = uploadResult.data?.uploadBidRemark;

      if (remarkFile) {
        setRemarkFile(remarkFile);
        setRemarkId(remarkFile.fileId);
      }
    } catch (e) {
      // invalid file type
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({
          id: "app.customer.createProject.upload.fileTypeError",
        }),
      });
      setSnackbarOpen(true);
    }
  };

  return (
    <Tooltip
      placement="right"
      title={intl.formatMessage({
        id: "app.vendor.uploadRemark.tooltip",
      })}
    >
      <IconButton component="label" sx={{ borderRadius: 40 }} color="primary">
        {!loading && (
          <input
            hidden
            type="file"
            onChange={onUpload}
            accept=".pdf, .docx, .ppt"
          />
        )}
        {loading && <CircularProgress size={24} />}
        {!loading && <CloudUploadIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default UploadRemark;
