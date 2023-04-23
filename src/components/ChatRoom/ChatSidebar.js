import React from "react";
import { Layout } from "antd";
// import ChatUserInfo from './ChatHeader';
// import ChatRoomList from './ChatRoomList';
// import styled from 'styled-components';

import ChatRoomList from "./ChatRoomList";
import ChatUser from "./ChatUser";

const { Sider } = Layout;

export default function ChatSidebar() {
  return (
    <Sider>
      <ChatRoomList />

      <ChatUser />
    </Sider>
  );
}
