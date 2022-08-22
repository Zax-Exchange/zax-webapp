import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import { connect } from "getstream";
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

const streamApiKey = process.env.REACT_APP_STREAM_API_KEY!;
const streamAppId = process.env.REACT_APP_STREAM_APP_ID!;

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

const CustomerNotification = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [notifications, setNotifications] = useState([] as any[]);
  const [notiCount, setNotiCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null as any);
  const [client, setClient] = useState(null as any);
  const [feed, setFeed] = useState(null as any);

  // const client = connect(streamApiKey, user.notificationToken, streamAppId);
  // const feed = client.feed("notification", user.id);

  useEffect(() => {
    const streamClient = connect(
      streamApiKey,
      user!.notificationToken!,
      streamAppId
    );

    setClient(streamClient);
    setFeed(streamClient.feed("notification", user!.id));
  }, []);

  useEffect(() => {
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
          activityIds: [noti.id],
          projectId: notiObject.projectId,
          projectName: notiObject.projectName,
          bidCount: 1,
          unread: true,
          unseen: true,
        };
      });
      setNotifications((currentNotis: any) => [...notis, ...currentNotis]);
      setNotiCount((count) => count + 1);
    }
    if (feed) {
      feed.subscribe(callback).then(successCallback, failCallback);
      return () => {
        feed.unsubscribe();
      };
    }
  }, [feed]);

  const getNotifications = async () => {
    const feeds = await feed.get();
    const notis = [];
    for (let res of feeds.results) {
      const notiMeta = res.activities[0];
      const notiObject = JSON.parse(notiMeta.object);

      notis.push({
        activityIds: res.activities.map((act: any) => act.id),
        projectId: notiObject.projectId,
        projectName: notiObject.projectName,
        bidCount: res.activity_count,
        unread: true,
        unseen: true,
      });
    }
    console.log("all feeds: ", feeds);
    setNotifications([...notis]);
    setNotiCount(feeds.unseen);
  };

  useEffect(() => {
    // init unseen notifications when app starts
    if (feed) {
      getNotifications();
    }
  }, [feed]);

  const clearNotiCount = () => {
    setNotiCount(0);
  };
  const clearAllNotis = async () => {
    for (let noti of notifications) {
      for (let activityId of noti.activityIds) {
        await feed.removeActivity(activityId);
      }
    }
    setNotifications([]);
    clearNotiCount();
  };

  const markAllNotisAsRead = () => {
    feed.get({ mark_read: true });
  };

  const markAllNotisAsSeen = () => {
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

  const navigateToProjectDetail = async (noti: any, ind: number) => {
    notiOnClose();

    navigate(`/customer-project-detail/${noti.projectId}`);

    for (let activityId of noti.activityIds) {
      await feed.removeActivity(activityId);
    }
    clearNotiCount();
    getNotifications();
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
                  return (
                    <ListItem
                      key={i}
                      className="with-background"
                      onClick={() => navigateToProjectDetail(noti, i)}
                    >
                      <Typography
                        variant="caption"
                        sx={{ whiteSpace: "normal" }}
                      >
                        You have <b>{noti.bidCount}</b> new bid(s) for{" "}
                        <b>{noti.projectName}</b>
                      </Typography>
                    </ListItem>
                  );
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

export default CustomerNotification;
