import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Image, Button, Switch, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getGoods, onGoods, recommendGoods } from '@/services/goods';
import CreateOrEdit from './components/CreateOrEdit';

const Goods = () => {
  const actionRef = useRef();

  const [createOrEditModalVisible, setCreateOrEditModalVisible] = useState(false);
  const [editId, setEditId] = useState(undefined);

  const showCreateOrEditModalVisible = (isShow) => {
    setCreateOrEditModalVisible(isShow);
    setEditId(undefined);
  };

  const columns = [
    {
      title: '商品图',
      dataIndex: 'cover_url',
      hideInSearch: true,
      render: (_, record) => (
        <Image
          width={64}
          src={record.cover_url}
          alt="商品图"
          placeholder={<Image width={400} src={record.cover_url} />}
        />
      ),
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '价格',
      dataIndex: 'price',
      hideInSearch: true,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      hideInSearch: true,
    },
    {
      title: '销量',
      dataIndex: 'sales',
      hideInSearch: true,
    },
    {
      title: '是否上架',
      dataIndex: 'is_on',
      valueType: 'radioButton',
      valueEnum: { 0: '已下架', 1: '已上架' },
      render: (_, record) => (
        <Switch
          unCheckedChildren="已下架"
          checkedChildren="已上架"
          defaultChecked={record.is_on === 1}
          onChange={async () => {
            const response = onGoods(record.id);
            if (response.status === undefined) {
              message.success('修改成功');
              actionRef.current.reload();
            }
          }}
        />
      ),
    },
    {
      title: '是否推荐',
      dataIndex: 'is_recommend',
      valueType: 'radioButton',
      valueEnum: { 0: '未推荐', 1: '已推荐' },
      render: (_, record) => (
        <Switch
          unCheckedChildren="未推荐"
          checkedChildren="已推荐"
          defaultChecked={record.is_recommend === 1}
          onChange={async () => {
            const response = recommendGoods(record.id);
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
        request={async (params = {}) => getGoods(params)}
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
        headerTitle="商品管理"
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

export default Goods;
