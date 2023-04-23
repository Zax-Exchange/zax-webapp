import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import MessageInput from "./MessageInput";
import { Messages, MessageUserData } from "./Messages";
import React from "react";
import "./Chat.scss";
import { ChatData, ChatApi } from "./ChatApi";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { envConfig } from "../../Config/EnvConfig";

const gqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  uri: envConfig.webserviceUrl
});
const getUser = async (userId: string) => {
  try {
    const result = await gqlClient.query({
      query: gql`query GetUser($data: GetUserInput!) {
        getUser(data: $data) {
          companyId
          email
          id
          isVendor
          power
          name
          status
        }
      }`,
      variables: {
        data: {
          userId,
        },
      },
    });
    return result;
  } catch (err) {
    console.log(`failed to retrieve user userId=${userId}`)
    return null;
  }
}


const ProjectChat = ({
  userId, 
  projectBidId,
}: {
  userId: string;
  projectBidId: string;
}) => {
  const [chat, setChat] = useState<ChatData|null>(null)
  const [userData, setUserData] = useState<Map<string,MessageUserData>>(new Map<string,MessageUserData>());

  // fetch chat and set chat
  useEffect(() => {
    const init = async () => {
      var chat = await ChatApi.createOrGetChatByProjectBidId(projectBidId);
      chat = await ChatApi.addUserToChat(chat.id, userId)
      setChat(chat);
    };
    init();
  }, []);

  // once chat has been set, fetch all the user information
  useEffect(() => {
    if (chat === null ) {
      return; 
    }
    const userMap = new Map<string,MessageUserData>();
    Promise.all(chat.users.map((user) => {
      return getUser(user.userId);
    }))
    .then((users) => {
      users.forEach((user) => {
        if (user == null) {
          return;
        }
        userMap.set(user.data.id, {
          userId: user.data.id,
          userName: user.data.name,
          userImage: undefined,
        })
      })
      setUserData(userMap)
    });
  }, [chat]);

  return (
    <Box>
      {chat && userId &&
        <Messages chat={chat} userId={userId} users={userData}/>
      }
      <MessageInput chatId={chat==null? null : chat.id} userId={userId}/>
    </Box>
  );
};

export default ProjectChat;
