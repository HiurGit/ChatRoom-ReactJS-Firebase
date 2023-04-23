import React, { useState } from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

 


export const AuthContext = React.createContext();
export default function AutProvider({ children }) {


  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({
          displayName,
          email,
          uid,
          photoURL
        });
        setIsLoading(false);
        navigate("/");
        return;
      }

      // reset user info
      setUser({});
      setIsLoading(false);
      navigate("/login");
    });

    // clean function
    return () => {
      unsubscibed();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? <Spin style={{ position: "fixed", inset: 0 }} /> : children}
    </AuthContext.Provider>
  );
}
