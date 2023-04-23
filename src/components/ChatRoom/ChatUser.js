import React, { useEffect } from "react";
import { Button, Avatar, Typography } from "antd";
import styled from "styled-components";

import { auth, db } from "../../firebase/config";
import { AuthContext } from "../../context/AutProvider";
const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;

  .username {
    color: white;
    margin-left: 5px;
  }
`;

const LoginStyled = styled.div`
  display: flex;
  align-items: flex-start;

  justify-content: space-evenly;
  padding: 10px 10px;
 
`;
export default function ChatUser() {
  useEffect(() => {
     db.collection('users').onSnapshot((snapshot)=>{
      const data = snapshot.docs.map(doc=>({
        ...doc.data(),
        id : doc.id
      }))
     })
  
  }, [ ])
  const {
    user: { displayName, photoURL },
  } = React.useContext(AuthContext);
   
  return (
    <>
      <WrapperStyled>
      <div>
        <Avatar src={photoURL}>
          {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className='username'>{displayName}</Typography.Text>
      </div>
      </WrapperStyled>

      <LoginStyled>
        <div>
          <Button
            ghost
            onClick={() => {
              // clear state in App Provider when logout

              auth.signOut();
            }}
          >
            Đăng xuất
          </Button>
        </div>
      </LoginStyled>
    </>
  );
}
