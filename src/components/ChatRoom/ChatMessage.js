import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Layout,
  theme,
  Form,
  Button,
  Avatar,
  Input,
  Alert,
  Tooltip
} from "antd";
import styled from "styled-components";
import { UserAddOutlined } from "@ant-design/icons";
import { AppContext } from "../../context/AppProvider";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../context/AutProvider";
import useFirestore from "../../hook/useFireStore";
import Message from "./Message";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);
  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__title {
      margin: 0;
      font-weight: bold;
    }
    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  height: 85vh;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

export default function ChatMessage() {
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  
  const { Content } = Layout;
  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const messageListRef = useRef(null);
  const { selectedRoom, members, setIsInviteMemberVisible } =
    React.useContext(AppContext);
  const {
    user: { uid, photoURL, displayName }
  } = useContext(AuthContext);

  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };


  const handleOnSubmit = () => {
    addDocument('messages', {
      text: inputValue,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    });

    form.resetFields(['message']);

    // focus vào input again sau khi submit
    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus();
      });
    }
  };
  
// condition điều kiện để lấy message

const condition = React.useMemo(
  () => ({
    fieldName: 'roomId',
    operator: '==',
    compareValue: selectedRoom.id,
  }),
  [selectedRoom.id]
);
const messages = useFirestore('messages', condition);

useEffect(() => {
  //Cuộn xuống dưới cùng sau khi tin nhắn thay đổi
  if (messageListRef?.current) {
    messageListRef.current.scrollTop =
      messageListRef.current.scrollHeight + 2;
  }
}, [messages]);


  return (
    <div>
      <Content
        style={{
          margin: "24px 16px 0"
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 250,
            background: colorBgContainer
          }}
        >
          <WrapperStyled>
            {selectedRoom.id ? (
              <>
                <HeaderStyled>
                  <div className="header__info">
                    <p className="header__title">{selectedRoom.name}</p>
                    <span className="header__description">
                      {selectedRoom.description}
                    </span>
                  </div>
                  <ButtonGroupStyled>
                    <Button
                      icon={<UserAddOutlined />}
                      type="text"
                      onClick={() => setIsInviteMemberVisible(true)}
                    >
                      Mời
                    </Button>
                    <Avatar.Group size="small" maxCount={2}>
                      {members.map((member) => (
                        <Tooltip title={member.displayName} key={member.id}>
                          <Avatar src={member.photoURL}>
                            {member.photoURL
                              ? ""
                              : member.displayName?.charAt(0)?.toUpperCase()}
                          </Avatar>
                        </Tooltip>
                      ))}
                    </Avatar.Group>
                  </ButtonGroupStyled>
                </HeaderStyled>
                <ContentStyled>
                  <MessageListStyled
                  ref={messageListRef}>
                    {messages.map((mes) => (
                      <Message
                        key={mes.id}
                        text={mes.text}
                        photoURL={mes.photoURL}
                        displayName={mes.displayName}
                        createdAt={mes.createdAt}
                      />
                    ))}
                  </MessageListStyled>
                  <FormStyled form={form}>
                    <Form.Item name="message" >
                    <Input
                      ref={inputRef}

                      onChange={handleInputChange}
                      onPressEnter={handleOnSubmit}
                      placeholder="Nhập tin nhắn..."
                      bordered={false}
                      autoComplete="off"
                    />
                    </Form.Item>
                   

                    <Button type="primary" onClick={handleOnSubmit}>
                      Gửi
                    </Button>
                  </FormStyled>
                </ContentStyled>
              </>
            ) : (
              <Alert
                message="Bạn chưa chọn phòng !"
                type="info"
                showIcon
                style={{ margin: 5 }}
                closable
              />
            )}
          </WrapperStyled>
        </div>
      </Content>
    </div>
  );
}
