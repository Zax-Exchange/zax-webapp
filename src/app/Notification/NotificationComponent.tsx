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
import {
  CUSTOMER_ROUTES,
  GENERAL_ROUTES,
  VENDOR_ROUTES,
} from "../constants/loggedInRoutes";
import {
  EmitEventType,
  NotificationStatus,
  Notification,
  ReceiveEventType,
  NotificationType,
} from "./types/common";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080", { transports: ["websocket"] });

const ListItem = styled(MuiListItem)(({ theme }: any) => ({
  display: "flex",
  justifyContent: "center",
  borderBottom: `0.5px solid ${theme.palette.divider}`,
  height: 67,

  "&:last-child": {
    borderBottom: 0,
  },
  ":hover": {
    backgroundColor: "#eee",
    cursor: "pointer",
    borderRadius: 4,
  },
}));

const NotificationComponent = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [anchorEl, setAnchorEl] = useState(null as any);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    if (anchorEl) {
      console.log("marking seen");
      socket.emit(EmitEventType.MARK_SEEN, {
        notificationIds: notifications.map((noti) => noti.notificationId),
      });
    }
  }, [anchorEl]);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("socket connected");

      setIsConnected(true);
      socket.emit(EmitEventType.INIT_CONNECTION, {
        userId: user!.id,
      });

      socket.emit(EmitEventType.GET_NOTIFICATIONS);
    });

    socket.on(
      ReceiveEventType.USER_NOTIFICATIONS,
      (notifications: Notification[]) => {
        setNotifications(notifications);
      }
    );

    socket.on(
      ReceiveEventType.NEW_NOTIFICATION,
      (notification: Notification) => {
        setNotifications((prev) => [notification, ...prev]);
      }
    );
    socket.on("disconnect", () => {
      console.log("socket disconnected");
      setIsConnected(false);
    });

    return () => {
      console.log("noti dismount");
      socket.disconnect();

      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  const clearNotification = (id: string) => {
    socket.emit(EmitEventType.CLEAR, {
      notificationIds: [id],
    });
  };

  const clearAllNotifications = () => {
    socket.emit(EmitEventType.CLEAR, {
      notificationIds: notifications.map((noti) => noti.notificationId),
    });
  };

  const closeNotifications = () => {
    setAnchorEl(null);
  };

  const notificationOnClick = (noti: Notification) => {
    closeNotifications();
    if (noti.notificationType === NotificationType.PROJECT) {
      const dest = GENERAL_ROUTES.PROJECT_DETAIL.split(":");

      dest[1] = noti.data.projectId!;

      navigate(`${dest.join("")}`);
    }
    if (noti.notificationType === NotificationType.PO_INVOICE) {
      navigate(GENERAL_ROUTES.PO_INVOICE);
    }

    clearNotification(noti.notificationId);
  };

  const renderNotifications = () => {
    return (
      <Popover
        id="notification-popover"
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={closeNotifications}
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
                <Button
                  sx={{ fontSize: "0.65em" }}
                  onClick={clearAllNotifications}
                >
                  clear all
                </Button>
              </Box>
              <List sx={{ padding: 0 }}>
                {notifications.map((noti, i) => {
                  return (
                    <ListItem onClick={() => notificationOnClick(noti)}>
                      <Typography variant="caption">
                        {noti.data.message}
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
    <Box position="relative" p={0}>
      <IconButton
        size="large"
        color="primary"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Badge
          badgeContent={
            notifications.filter(
              (noti) => noti.status === NotificationStatus.UNSEEN
            ).length
          }
          color="error"
        >
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>
      {renderNotifications()}
    </Box>
  );
};

export default NotificationComponent;
