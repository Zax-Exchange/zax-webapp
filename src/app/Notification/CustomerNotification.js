import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import { connect } from "getstream";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const streamApiKey = process.env.REACT_APP_STREAM_API_KEY;
const streamAppId = process.env.REACT_APP_STREAM_APP_ID;
const streamApiSecret = process.env.REACT_APP_STREAM_API_SECRET;

const CustomerNotification = () => {
  const { user } = useContext(AuthContext);

  const [notifications, setNotifications] = useState([]);

  const client = connect(streamApiKey, user.notificationToken, streamAppId);
  const feed = client.feed("notification", user.id);

  function callback(data) {
    let notis = data.new;
    notis = notis.map((noti) => JSON.parse(noti.object));
    setNotifications(notis);
  }

  function successCallback() {
    console.log(
      "Now listening to changes in realtime. Add an activity to see how realtime works."
    );
  }

  function failCallback(data) {
    console.log(data);
  }

  useEffect(() => {
    feed.subscribe(callback).then(successCallback, failCallback);
    return () => {
      feed.unsubscribe();
    };
  }, []);

  const renderNotifications = () => {
    return (
      <>
        {notifications.map((noti) => {
          return (
            <Typography>
              New bid from {noti.companyName} for project {noti.name}
            </Typography>
          );
        })}
      </>
    );
  };

  return (
    <Box>
      <Tooltip title={notifications.length} arrow open={!!notifications.length}>
        <IconButton onClick={renderNotifications}>
          <NotificationsIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CustomerNotification;
