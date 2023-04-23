import React, { useContext } from "react";
import { Form, Modal, Input } from "antd";
import { AppContext } from "../../context/AppProvider";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../context/AutProvider";

export default function AddRoomModal() {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);

  const {
    user: { uid }
  } = useContext(AuthContext);
  const [form] = Form.useForm();

  const handleOk = () => {
    addDocument("rooms", { ...form.getFieldsValue(), members: [uid] });

    form.resetFields();

    setIsAddRoomVisible(false);
  };

  const handleCancel = () => {
    form.resetFields();

    setIsAddRoomVisible(false);
  };

  return (
    <div>
      <Modal
        title="Tạo phòng"
        open={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Tên phòng" name="name">
            <Input placeholder="Nhập tên phòng" />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea placeholder="Nhập mô tả" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
