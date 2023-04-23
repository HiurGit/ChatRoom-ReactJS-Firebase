import React from "react";
import {  Layout  } from 'antd';
export default function ChatFooter() {
    const {    Footer } = Layout;
  return (
    <div>
      {" "}
      <Footer
        style={{
          textAlign: "center"
        }}
      >
        Ant Design ©2023 Created by Thảo Nguyễn
      </Footer>
    </div>
  );
}
