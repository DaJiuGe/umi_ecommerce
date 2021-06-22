import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Avatar, Switch, message } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { getUsers, lockUser } from '@/services/user';
import CreateOrEdit from './components/CreateOrEdit';

const User = () => {
  const actionRef = useRef();

  const [createOrEditModalVisible, setCreateOrEditModalVisible] = useState(false);
  const [editId, setEditId] = useState(undefined);

  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInSearch: true,
      render: (_, record) => (
        <Avatar size={32} src={record.avatar_url} alt="头像" icon={<UserOutlined />} />
      ),
    },
    {
      title: '昵称',
      dataIndex: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '是否锁定',
      dataIndex: 'is_locked',
      hideInSearch: true,
      render: (_, record) => (
        <Switch
          unCheckedChildren="锁定"
          checkedChildren="正常"
          defaultChecked={!record.is_locked}
          onChange={async () => {
            const response = lockUser(record.id);
            if (response.status === undefined) {
              message.success('修改成功');
              actionRef.current.load();
            }
          }}
        />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      hideInSearch: true,
    },
    {
      title: '操作',
      hideInSearch: true,
      render: (_, record) => (
        <a
          onClick={() => {
            setEditId(record.id);
            setCreateOrEditModalVisible(true);
          }}
        >
          编辑
        </a>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}) => getUsers(params)}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setCreateOrEditModalVisible(true);
            }}
          >
            新建
          </Button>,
        ]}
      />

      {/* 三元运算确保每次EditModal显示时,组件都能重新挂载 */}
      {createOrEditModalVisible && (
        <CreateOrEdit
          visible={createOrEditModalVisible}
          setVisible={setCreateOrEditModalVisible}
          parentTable={actionRef}
          editId={editId}
        />
      )}
    </PageContainer>
  );
};

export default User;
