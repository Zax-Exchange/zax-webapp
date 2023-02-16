import {
  Box,
  Container,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import announcementSvg from "../../static/homePageAnnoncement.svg";
import { AuthContext } from "../../context/AuthContext";
import { Campaign, CampaignOutlined } from "@mui/icons-material";
import { useIntl } from "react-intl";

const Home = () => {
  const intl = useIntl();
  const { user } = useContext(AuthContext);

  const renderAnnouncementText = (text: string) => {
    return (
      <Typography variant="caption" whiteSpace="pre-line">
        {text}
      </Typography>
    );
  };
  return (
    <Container>
      <Box mb={2}>
        <Box sx={{ display: "flex", mb: 3 }}>
          <Typography variant="h4" fontWeight={500}>
            {intl.formatMessage(
              { id: "app.home.welcomeBanner" },
              {
                name: user!.name,
              }
            )}
          </Typography>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Typography variant="subtitle2" whiteSpace="pre-line">
            {intl.formatMessage({ id: "app.home.thankYou" })}
          </Typography>
        </Box>
      </Box>

      <Paper
        sx={{
          p: 2,
        }}
      >
        <Box>
          <Box>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ flexBasis: "70%" }}>
                <List>
                  <ListItem>
                    <CampaignOutlined
                      fontSize="large"
                      color="primary"
                      sx={{
                        transform: "rotate(-15deg)",
                        transformOrigin: "50% 50%",
                      }}
                    />
                  </ListItem>
                  <ListItem>
                    <Box>
                      {renderAnnouncementText(
                        intl.formatMessage({
                          id: "app.home.announcement.underConstruction",
                        })
                      )}
                    </Box>
                  </ListItem>
                  <ListItem>
                    <Box>
                      {renderAnnouncementText(
                        intl.formatMessage({
                          id: "app.home.announcement.reportBugs",
                        })
                      )}
                    </Box>
                  </ListItem>
                  <ListItem>
                    <Box>
                      {renderAnnouncementText(
                        intl.formatMessage({
                          id: "app.home.announcement.provideFeedback",
                        })
                      )}
                    </Box>
                  </ListItem>
                  <ListItem>
                    <Box>
                      {renderAnnouncementText(
                        intl.formatMessage({
                          id: "app.home.announcement.changeLocale",
                        })
                      )}
                    </Box>
                  </ListItem>
                </List>
              </Box>
              <Box>
                <img
                  src={announcementSvg}
                  alt="announement.svg"
                  width={300}
                  height={300}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;
