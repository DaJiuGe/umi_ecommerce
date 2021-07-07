import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Image, Button, Switch, message, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getSlides, updateSlideStatus, deleteSlide } from '@/services/slide';
import CreateOrEdit from './components/CreateOrEdit';

const Goods = () => {
  const actionRef = useRef();

  const [createOrEditModalVisible, setCreateOrEditModalVisible] = useState(false);
  const [editId, setEditId] = useState(undefined);

  const showCreateOrEditModalVisible = (isShow) => {
    setCreateOrEditModalVisible(isShow);
    setEditId(undefined);
  };

  const handleUpdateSlideStatus = async (id) => {
    const response = await updateSlideStatus(id);
    if (response.message !== undefined) {
      message.success('修改成功');
    }
    actionRef.current.reload();
  };

  const handleDeleteSlide = async (id) => {
    const response = await deleteSlide(id);
    if (response.message !== undefined) {
      message.success('修改成功');
    }
    actionRef.current.reload();
  };

  const columns = [
    {
      title: '轮播图片',
      dataIndex: 'img_url',
      render: (_, record) => (
        <Image
          width={64}
          src={record.img_url}
          alt="轮播图片"
          placeholder={<Image width={400} src={record.img_url} />}
        />
      ),
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '跳转链接',
      dataIndex: 'url',
    },
    {
      title: '是否禁用',
      dataIndex: 'status',
      render: (_, record) => (
        <Switch
          defaultChecked={record.status === 1}
          checkedChildren="启用"
          unCheckedChildren="禁用"
          onChange={() => handleUpdateSlideStatus(record.id)}
        />
      ),
    },
    {
      title: '排序',
      dataIndex: 'seq',
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="edit"
          onClick={() => {
            setEditId(record.id);
            setCreateOrEditModalVisible(true);
          }}
        >
          编辑
        </a>,
        <Popconfirm key="deleteConfirm" title={'确认删除吗'} okText="是" cancelText="否">
          <a
            key="delete"
            onClick={() => {
              handleDeleteSlide(record.id);
            }}
          >
            删除
          </a>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}) => getSlides(params)}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={false}
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
