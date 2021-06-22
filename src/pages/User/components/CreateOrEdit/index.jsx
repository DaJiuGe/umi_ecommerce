import ProForm, { ProFormText } from '@ant-design/pro-form';
import React, { useEffect, useState } from 'react';
import { Modal, Skeleton, message } from 'antd';
import { getUser, addUser, updateUser } from '@/services/user';

const CreateOrEdit = (props) => {
  const { visible, setVisible, parentTable, editId } = props;
  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      if (editId !== undefined) {
        const response = await getUser(editId);
        if (response.status === undefined) {
          setUserInfo({
            name: response.name,
            email: response.email,
            password: response.password,
          });
        } else {
          setVisible(false);
        }
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    let response;
    if (editId !== undefined) {
      response = await updateUser(editId, values);
    } else {
      response = await addUser(values);
    }

    if (response.status === undefined) {
      message.success(editId === undefined ? '添加成功' : '修改成功');
      setVisible(false);
      parentTable.current.reload();
    }
  };

  return (
    <Modal
      title={editId === undefined ? '添加用户' : '编辑用户'}
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      destroyOnClose
    >
      {userInfo === undefined && editId !== undefined ? (
        <Skeleton active paragraph={{ rows: 3 }} />
      ) : (
        <ProForm initialValues={userInfo} onFinish={async (values) => handleSubmit(values)}>
          <ProFormText
            label="用户名"
            name="name"
            placeholder="请输入用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          />
          <ProFormText
            label="邮箱"
            name="email"
            placeholder="请输入邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入正确的邮箱格式' },
            ]}
          />
          {editId === undefined && (
            <ProFormText.Password
              label="密码"
              name="password"
              placeholder="请输入密码"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码最少6位' },
              ]}
            />
          )}
        </ProForm>
      )}
    </Modal>
  );
};

export default CreateOrEdit;
