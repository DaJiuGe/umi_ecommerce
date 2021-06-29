import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, Switch, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getCategories, lockCategory } from '@/services/category';
import CreateOrEdit from './components/CreateOrEdit';

const Category = () => {
  const actionRef = useRef();

  const [createOrEditModalVisible, setCreateOrEditModalVisible] = useState(false);
  const [editId, setEditId] = useState(undefined);

  const showCreateOrEditModalVisible = (isShow) => {
    setCreateOrEditModalVisible(isShow);
    setEditId(undefined);
  };

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      title: '是否启用',
      dataIndex: 'status',
      render: (_, record) => (
        <Switch
          unCheckedChildren="禁用"
          checkedChildren="启用"
          defaultChecked={record.status === 0}
          onChange={async () => {
            const response = lockCategory(record.id);
            if (response.status === undefined) {
              message.success('修改成功');
              actionRef.current.reload();
            }
          }}
        />
      ),
    },
    {
      title: '操作',
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

  const handleGetCategories = async (params) => {
    const response = await getCategories({ ...params, type: 'all' });
    return {
      data: response,
      success: true,
      total: response.length,
    };
  };

  return (
    <PageContainer>
      <ProTable
        headerTitle="分类管理"
        search={false}
        pagination={false}
        editable={{
          type: 'multiple',
        }}
        dateFormatter="string"
        columns={columns}
        actionRef={actionRef}
        rowKey="id"
        request={async (params = {}) => handleGetCategories(params)}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setCreateOrEditModalVisible(true);
            }}
          >
            添加分类
          </Button>,
        ]}
      />

      {/* 确保每次EditModal显示时,组件都能重新挂载 */}
      {createOrEditModalVisible && (
        <CreateOrEdit
          visible={createOrEditModalVisible}
          setVisible={showCreateOrEditModalVisible}
          parentTable={actionRef}
          editId={editId}
        />
      )}
    </PageContainer>
  );
};

export default Category;
