
import React from 'react';

import ChatSidebar from './ChatSidebar';
import ChatMessage from './ChatMessage';
// import ChatMessage from './ChatMessage';
import {  Layout  } from 'antd';
 
import ChatFooter from './ChatFooter';
 

export default function ChatRoom() {
  

 
  return (
    <div>
     <Layout>
      <ChatSidebar/>
      <Layout>
       
        <ChatMessage/>
       <ChatFooter/>
      </Layout>
    </Layout>
    </div>
  )
}
