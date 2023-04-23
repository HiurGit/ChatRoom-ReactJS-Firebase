import React from "react";
import {
  PlusCircleTwoTone,
 
} from "@ant-design/icons";
import { Collapse, Typography, Button } from "antd";
 
import styled from "styled-components";

 
import { AppContext } from "../../context/AppProvider";
 
 

export default function ChatRoomList() {
  const { Panel } = Collapse;

  const LinkStyled = styled(Typography.Link)`
    display: block;
    margin-bottom: 5px;
    color: white;
  `;

  const PanelStyled = styled(Panel)`
    &&& {
      .ant-collapse-header,
    
      p {
        color: white;
      }
      .ant-collapse-content-box {
        padding: 0 40px;
      }
    }
    //
  `;
  const { rooms, setIsAddRoomVisible,setSelectedRoomId } = React.useContext(AppContext);
 
  const handleAddRoom = () => {
    setIsAddRoomVisible(true);
  };



  return (
    <div>
      <Collapse ghost defaultActiveKey={["1"]}>
        <PanelStyled header="Danh sách các phòng" key="1">
          {rooms.map((room) => (
            <LinkStyled key={room.id} onClick={()=>setSelectedRoomId(room.id)} >
              <Button block="true" ghost="true" type="dashed">
                {room.name}
              </Button>
            </LinkStyled>
          ))}
        </PanelStyled>
      </Collapse>
      <Button
        style={{ color: "white", margin: "0px 10px 10px 10px" }}
        type="text"
        icon={<PlusCircleTwoTone />}
        className="add-room"
        onClick={handleAddRoom}
      >
        Thêm phòng
      </Button>
    </div>
  );
}
