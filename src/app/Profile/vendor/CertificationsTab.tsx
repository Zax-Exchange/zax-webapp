import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { useGetCertificationsQuery } from "../../gql/get/vendor/vendor.generated";
import useCustomSnackbar from "../../Utils/CustomSnackbar";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack5";
import AttachmentButton from "../../Utils/AttachmentButton";
import { GenericFile } from "../../../generated/graphql";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  OpenInNew,
} from "@mui/icons-material";
import { openLink } from "../../Utils/openLink";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const CertificationsTab = () => {
  const intl = useIntl();
  const { companyId } = useParams();
  const { setSnackbar, setSnackbarOpen } = useCustomSnackbar();
  const [certsList, setCertsList] = useState<GenericFile[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const { loading, data, error } = useGetCertificationsQuery({
    variables: {
      data: {
        companyId: companyId || "",
      },
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (data && data.getCertifications) {
      setCertsList(data.getCertifications);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setSnackbar({
        severity: "error",
        message: intl.formatMessage({ id: "app.general.network.error" }),
      });
      setSnackbarOpen(true);
    }
  }, [error]);

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const renderCert = (cert: GenericFile) => {
    if (cert.filename.split(".").pop() === "pdf") {
      return (
        <Box>
          <Document
            file={cert.url}
            onLoadSuccess={(pdf) => console.log(pdf)}
            onLoadError={(e) => console.log(e)}
          >
            <Page
              pageNumber={1}
              renderTextLayer={false}
              // scale={}
              renderAnnotationLayer={false}
              renderInteractiveForms={false}
            />
          </Document>
        </Box>
      );
    }
    return (
      <Box>
        <img alt="img" src={cert.url} height={200} width={200} />
      </Box>
    );
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {!certsList.length && !loading && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            {intl.formatMessage({ id: "app.vendorProfile.cert.noCert" })}
          </Typography>
        </Box>
      )}
      {!!certsList.length && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box>
              <IconButton onClick={prevPage} disabled={currentPage === 0}>
                <ArrowLeft fontSize="large" />
              </IconButton>
            </Box>
            <Box>
              <IconButton
                onClick={nextPage}
                disabled={currentPage === certsList.length - 1}
              >
                <ArrowRight fontSize="large" />
              </IconButton>
            </Box>
          </Box>
          <Box>{renderCert(certsList[currentPage])}</Box>
          <Box sx={{ position: "absolute", right: 2, top: 16 }}>
            <Button
              onClick={() => openLink(certsList[currentPage].url)}
              variant="outlined"
            >
              {intl.formatMessage({ id: "app.general.viewDetail" })}
              <OpenInNew sx={{ ml: 1 }} />
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CertificationsTab;
