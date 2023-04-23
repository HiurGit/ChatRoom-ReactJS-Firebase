import { Button, Col, Row } from "antd";
import React from "react";
import firebase, { auth } from '../../firebase/config';
import { addDocument,generateKeywords } from '../../firebase/services';

 

const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();



export default function Login() {
 
    const handleFbLogin =  async () => {
      const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider);
      const { additionalUserInfoGM, userGM } = await auth.signInWithPopup(googleProvider);
      if (additionalUserInfo?.isNewUser) {
        addDocument('users', {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          providerId: additionalUserInfo.providerId,
          keywords: generateKeywords(user.displayName?.toLowerCase()),
        });
      }

    };
    const handleGoogleLogin = () => {
      auth.signInWithPopup(googleProvider);

    };
    
 
    return (
      <div>
        <Row justify={"center"}>
          <Col span={8}>
            <h1 style={{ textAlign: "center" }} level={3}>
              Chat Room T3H
            </h1>
            <Button style={{ width: "100%", marginBottom: 10 }} onClick={handleGoogleLogin}>
              Đăng nhập bằng Google
            </Button>
            <Button style={{ width: "100%" }} onClick={handleFbLogin}>
              Đăng nhập bằng Facebook
            </Button>
          </Col>
        </Row>
      </div>
    );
 
}
