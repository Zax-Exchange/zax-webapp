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
import { useGetCustomerProjects } from "../hooks/projectHooks";
import { useNavigate } from "react-router-dom";

const streamApiKey = process.env.REACT_APP_STREAM_API_KEY;
const streamAppId = process.env.REACT_APP_STREAM_APP_ID;

const ListItem = styled(MuiListItem)(({ theme }) => ({
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
  const {
    getCustomerProjectsData,
    getCustomerProjectsError,
    getCustomerProjectsLoading,
    getCustomerProjectsRefetch,
  } = useGetCustomerProjects(user.id, false);

  const [notifications, setNotifications] = useState([]);
  const [notiCount, setNotiCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const client = connect(streamApiKey, user.notificationToken, streamAppId);
  const feed = client.feed("notification", user.id);

  useEffect(() => {
    if (!getCustomerProjectsLoading && getCustomerProjectsError) {
      getCustomerProjectsRefetch();
    }
  }, [getCustomerProjectsError, getCustomerProjectsLoading]);

  useEffect(() => {
    function successCallback() {
      console.log(
        "Now listening to changes in realtime. Add an activity to see how realtime works."
      );
    }

    function failCallback(data) {
      console.log(data);
    }
    function callback(data) {
      console.log("new notification: ", data);
      let notis = data.new;
      if (!data.new.length) return;
      notis = notis.map((noti) => {
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
      setNotifications((currentNotis) => [...currentNotis, ...notis]);
      setNotiCount((count) => count + 1);
    }
    feed.subscribe(callback).then(successCallback, failCallback);
    return () => {
      feed.unsubscribe();
    };
  }, []);

  const getNotifications = async () => {
    const feeds = await feed.get();
    const notis = [];
    for (let res of feeds.results) {
      const notiMeta = res.activities[0];
      const notiObject = JSON.parse(notiMeta.object);

      notis.push({
        activityIds: res.activities.map((act) => act.id),
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
    getNotifications();
  }, []);

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

  const notiOnClick = async (e) => {
    if (
      !getCustomerProjectsData ||
      !getCustomerProjectsData.getCustomerProjects
    ) {
      getCustomerProjectsRefetch();
    }
    markAllNotisAsSeen();
    clearNotiCount();
    setAnchorEl(e.currentTarget);
  };

  const notiOnClose = () => {
    setAnchorEl(null);
  };

  const navigateToProjectDetail = async (noti, ind) => {
    if (
      !getCustomerProjectsData ||
      !getCustomerProjectsData.getCustomerProjects
    )
      return;

    notiOnClose();
    const project = getCustomerProjectsData.getCustomerProjects.find(
      (proj) => proj.id === noti.projectId
    );

    navigate("/customer-project-detail", {
      state: {
        project,
      },
    });

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
          {getCustomerProjectsLoading && <CircularProgress />}
          {getCustomerProjectsError && (
            <Typography>
              Could not load notifications at this moment.
            </Typography>
          )}
          {getCustomerProjectsData &&
            getCustomerProjectsData.getCustomerProjects &&
            !!notifications.length && (
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
                        <Typography variant="caption">
                          You have <b>{noti.bidCount}</b> new bid(s) for{" "}
                          <b>{noti.projectName}</b>
                        </Typography>
                      </ListItem>
                    );
                  })}
                </List>
              </>
            )}
          {getCustomerProjectsData &&
            getCustomerProjectsData.getCustomerProjects &&
            !notifications.length && (
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
          <NotificationsIcon />
        </Badge>
      </IconButton>
      {renderNotifications()}
    </Box>
  );
};

export default CustomerNotification;
