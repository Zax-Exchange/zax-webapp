import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import {
  connect,
  DefaultGenerics,
  FeedAPIResponse,
  NotificationActivity,
  StreamFeed,
} from "getstream";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  List,
  Paper,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import styled from "@emotion/styled";
import MuiListItem from "@mui/material/ListItem";
import { useNavigate } from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import React from "react";
import { CUSTOMER_ROUTES, VENDOR_ROUTES } from "../constants/loggedInRoutes";

const streamApiKey = process.env.REACT_APP_STREAM_API_KEY!;
const streamAppId = process.env.REACT_APP_STREAM_APP_ID!;

enum NotificationType {
  NEW_BID = "NEW_BID",
  BID_DATA_UPDATE = "BID_DATA_UPDATE",
  PROJECT_DATA_UPDATE = "PROJECT_DATA_UPDATE",
  BID_STATUS_UPDATE = "BID_STATUS_UPDATE",
  PROJECT_STATUS_UPDATE = "PROJECT_STATUS_UPDATE",
}

interface ProjectDataUpdateNotification {
  projectId: string;
  projectName: string;
}

interface Notification {
  notificationType: NotificationType;
  activityIds: string[];
  data: ProjectDataUpdateNotification;
  activityCount: number;
  unread: boolean;
  unseen: boolean;
}

const ListItem = styled(MuiListItem)(({ theme }: any) => ({
  display: "flex",
  justifyContent: "center",
  borderBottom: `0.5px solid ${theme.palette.divider}`,
  height: 67,
  "&.with-background:hover": {
    backgroundColor: "#eee",
    cursor: "pointer",
    borderRadius: 4,
  },
  "&:last-child": {
    borderBottom: 0,
  },
}));

const VendorNotification = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notiCount, setNotiCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null as any);
  const [client, setClient] = useState(null as any);
  const [feed, setFeed] = useState<StreamFeed<DefaultGenerics> | null>(null);

  // const client = connect(streamApiKey, user.notificationToken, streamAppId);
  // const feed = client.feed("notification", user.id);

  // initialize stream client and notification feed for current user
  useEffect(() => {
    const streamClient = connect(
      streamApiKey,
      user!.notificationToken!,
      streamAppId
    );

    setClient(streamClient);
    setFeed(streamClient.feed("notification", user!.id));
  }, []);

  // add listener to feed to listen for real time notifications
  useEffect(() => {
    if (feed) {
      // open up connection to receive live notification
      function successCallback() {
        console.log("subscribing to customer notifications");
      }

      function failCallback(data: any) {
        console.log(data);
      }
      function callback(data: any) {
        console.log("new notification: ", data);
        let notis = data.new;
        if (!data.new.length) return;
        notis = notis.map((noti: any) => {
          const notiObject = JSON.parse(noti.object);
          return {
            verb: noti.verb,
            notificationType: noti.notificationType as NotificationType,
            activityIds: [noti.id],
            data: {
              projectId: notiObject.projectId,
              projectName: notiObject.projectName,
            },
            activityCount: 1,
            unread: true,
            unseen: true,
          };
        });
        setNotifications((currentNotis) => [...notis, ...currentNotis]);
        setNotiCount((count) => count + 1);
      }
      feed.subscribe(callback).then(successCallback, failCallback);
      return () => {
        feed.unsubscribe();
      };
    }
  }, [feed]);

  const getNotifications = async () => {
    if (!feed) return;

    const feeds = await feed.get();
    const notis = [];

    for (let res of feeds.results) {
      const notiMeta = (res as NotificationActivity).activities[0];
      const notiObject = JSON.parse(notiMeta.object as string);

      notis.push({
        verb: notiMeta.verb,
        notificationType: notiMeta.notificationType as NotificationType,
        activityIds: (res as NotificationActivity).activities.map(
          (act) => act.id
        ),
        data: {
          projectId: notiObject.projectId,
          projectName: notiObject.projectName,
        },
        activityCount: res.activity_count as number,
        unread: true,
        unseen: true,
      });
    }
    setNotifications([...notis]);
    setNotiCount(feeds.unseen ? feeds.unseen : 0);
  };

  // init notifications when app starts
  useEffect(() => {
    if (feed) {
      getNotifications();
    }
  }, [feed]);

  const clearNotiCount = () => {
    setNotiCount(0);
  };

  const clearAllNotis = async () => {
    if (!feed) return;
    for (let noti of notifications) {
      for (let activityId of noti.activityIds) {
        await feed.removeActivity(activityId);
      }
    }
    setNotifications([]);
    clearNotiCount();
  };

  const markAllNotisAsRead = () => {
    if (!feed) return;
    feed.get({ mark_read: true });
  };

  const markAllNotisAsSeen = () => {
    if (!feed) return;
    feed.get({ mark_seen: true });
  };

  const notiOnClick = async (e: any) => {
    markAllNotisAsSeen();
    clearNotiCount();
    setAnchorEl(e.currentTarget);
  };

  const notiOnClose = () => {
    setAnchorEl(null);
  };

  const navigateToProjectDetail = async (noti: Notification, ind: number) => {
    if (!feed) return;
    notiOnClose();
    const dest = VENDOR_ROUTES.PROJECT_DETAIL.split(":");
    dest[1] = (noti.data as ProjectDataUpdateNotification).projectId;

    navigate(`${dest.join("")}`);

    for (let activityId of noti.activityIds) {
      await feed.removeActivity(activityId);
    }
    clearNotiCount();
    getNotifications();
  };

  const renderProjectDataUpdateNotificationItem = (
    noti: Notification,
    ind: number
  ) => {
    return (
      <ListItem
        key={ind}
        className="with-background"
        onClick={() => navigateToProjectDetail(noti, ind)}
      >
        <Typography variant="caption" sx={{ whiteSpace: "normal" }}>
          There's an update for{" "}
          <b>{(noti.data as ProjectDataUpdateNotification).projectName}</b>.
          Click here to view.
        </Typography>
      </ListItem>
    );
  };

  const renderNotifications = () => {
    return (
      <Popover
        id="notification-popover"
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={notiOnClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={300}
          maxHeight={400}
          sx={{ overflow: "scroll" }}
        >
          {!!notifications.length && (
            <>
              <Box display="flex" justifyContent="space-around">
                <Button onClick={clearAllNotis} sx={{ fontSize: "0.65em" }}>
                  clear all
                </Button>
                <Button
                  onClick={markAllNotisAsRead}
                  sx={{ fontSize: "0.65em" }}
                >
                  Mark all as read
                </Button>
              </Box>
              <List sx={{ padding: 0 }}>
                {notifications.map((noti, i) => {
                  switch (noti.notificationType) {
                    case NotificationType.PROJECT_DATA_UPDATE:
                      return renderProjectDataUpdateNotificationItem(noti, i);
                  }
                  return null;
                })}
              </List>
            </>
          )}
          {!notifications.length && (
            <ListItem>
              <Typography variant="caption">
                No new notifications at this moment!
              </Typography>
            </ListItem>
          )}
        </Box>
      </Popover>
    );
  };
  return (
    <Box position="relative">
      <IconButton size="large" color="primary" onClick={notiOnClick}>
        <Badge badgeContent={notiCount} color="error">
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>
      {renderNotifications()}
    </Box>
  );
};

export default VendorNotification;
