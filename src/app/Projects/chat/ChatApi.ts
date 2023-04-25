import { envConfig } from "../../Config/EnvConfig";

type MessageSentEvent = {
  chatId: string;
  timestamp: Date;
  message: MessageData
}

type MessageData = {
  chatId: string;
  messageId: number;
  message: string;
  userId: string;
  sentAt: string;
  updatedAt: string;
}

type ChatUserData = {
  chatId: string;
  userId: string;
  userName: string;
  userImage: string;
  lastReadMessageId: number;
  notificationSetting: string;
}

type ChatData = {
  id: string;
  name: string;
  projectBidId: string;
  image: string;
  users: ChatUserData[];
}

const createOrGetChatByProjectBidId = async (projectBidId: string) => {
  const response = await fetch(`${envConfig.chatserviceUrl}/chat/projectBid/${projectBidId}`);
  const responseBody: ChatData = await response.json();
  return responseBody
}

const addUserToChat = async (chatId: string, userId: string, userName: string) => {
  const body = JSON.stringify({
      chatId,
      userId,
      userName,
      userImage: null,
  });
  const response = await fetch(`${envConfig.chatserviceUrl}/chatAccess`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body,
  });
  if (response.status != 200) {
    console.log(`err adding user to chat chatId=${chatId} userId=${userId} response=${response}`)
  }
  const chat: ChatData = await response.json();
  return chat;
}

const getMessages = async (chatId: string, before: Date) => {
  const dateStr = before.toISOString();
  const response = await fetch(`${envConfig.chatserviceUrl}/message/chat/${chatId}?before=${dateStr}&count=10`);
  const responseBody: MessageData[] = await response.json();
  return responseBody;
}

const sendMessage = async (chatId: string, userId: string, text: string) => {
  const body = JSON.stringify({
    userId: userId,
    message: text
  });
  const response = await fetch(`${envConfig.chatserviceUrl}/message/chat/${chatId}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: body,
  });
  if (response.status != 200) {
    console.log(`err sending message=${body} chatId=${chatId} response=${response}`)
  }
  return response;
}

const subscribeToChat = (chatId: string, userId: string | null, 
  onMessageEvent: (msg: MessageSentEvent)=>void, onCloseEvent: (event: CloseEvent)=>void) => {

  const websocket = new WebSocket(envConfig.chatWebsocketUrl);

  websocket.onopen = (event) => {
    websocket.send(JSON.stringify({
      "type": "ChatSubscriptionRequest",
      "chatId": chatId,
      "userId": userId
    }));
    console.log(`subscribed to websocket connection for chat ${chatId}`)
  }

  websocket.onmessage = (event) => {
    try {
      const incomingdata = JSON.parse(event.data.toString());
      if (incomingdata.type === 'MessageSentEvent') {
        const messageSentEvent: MessageSentEvent = incomingdata;
        onMessageEvent(messageSentEvent)
      }
    } catch (err) {
      console.log(`err=${err} event.data=${event.data}`)
    }
  }

  websocket.onclose = (event) => {
    onCloseEvent(event);
  }

  return websocket;
}

const ChatApi = {
  getMessages,
  createOrGetChatByProjectBidId,
  addUserToChat,
  sendMessage,
  subscribeToChat,
}

export {
  MessageData,
  ChatData,
  ChatUserData,
  ChatApi
}