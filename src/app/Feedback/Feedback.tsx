import { BugReport, TextSnippet } from "@mui/icons-material";
import {
  Dialog,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";
import { AuthContext } from "../../context/AuthContext";
import { Locale } from "../../context/LocaleContext";
import { openLink } from "../Utils/openLink";
import BugReportForm from "./modal/BugReportForm";

const Feedback = () => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const locale: Locale = intl.locale as Locale;

  const [bugFormOpen, setBugFormOpen] = useState(false);

  const openBugForm = () => {
    switch (locale) {
      case "en":
        openLink("https://forms.gle/9ihX1NRwsiBvu5N67");
        break;
      case "zh-cn":
        openLink("https://forms.gle/NbxPeUkTbo4YKdNcA");
        break;
    }
  };

  const openFeedbackForm = () => {
    switch (locale) {
      case "en":
        if (user) {
          if (user!.isVendor) {
            openLink("https://forms.gle/UrKrewdvgM8NeX4q7");
          } else {
            openLink("https://forms.gle/HErQubMk4hLoAGkE7");
          }
        } else {
          openLink("https://forms.gle/8iihHkRz8qYyRWAP9");
        }
        break;
      case "zh-cn":
        if (user) {
          if (user!.isVendor) {
            openLink("https://forms.gle/381CAV3LcST6jdbE9");
          } else {
            openLink("https://forms.gle/BF23PFXn9aLtLuW37");
          }
        } else {
          openLink("https://forms.gle/oX24k1jEas1oE92Q9");
        }
        break;
    }
  };

  return (
    <>
      {/* <Dialog open={bugFormOpen} onClose={() => setBugFormOpen(false)}>
        <BugReportForm setBugFormOpen={setBugFormOpen} />
      </Dialog> */}
      <SpeedDial
        ariaLabel="Feedback button"
        sx={{ position: "fixed", bottom: "64px", right: "16px", zIndex: 2 }}
        icon={<SpeedDialIcon />}
      >
        <SpeedDialAction
          key="bug-report"
          icon={<BugReport />}
          tooltipTitle={intl.formatMessage({
            id: "app.feedback.action.bugReport",
          })}
          onClick={openBugForm}
        />
        (
        <SpeedDialAction
          key="feedback-form"
          icon={<TextSnippet />}
          tooltipTitle={intl.formatMessage({
            id: "app.feedback.action.feedbackForm",
          })}
          onClick={openFeedbackForm}
        />
        )
      </SpeedDial>
    </>
  );
};

export default Feedback;
