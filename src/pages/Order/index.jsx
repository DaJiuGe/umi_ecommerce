import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Tag } from 'antd';
import Detail from './components/Detail';
import Post from './components/Post';
import { getOrders } from '@/services/order';

const Order = () => {
  const actionRef = useRef();

  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [PostModalVisible, setPostModalVisible] = useState(false);
  const [orderId, setOrderId] = useState(undefined);

  const showDetailModalVisible = (isShow) => {
    setDetailModalVisible(isShow);
    setOrderId(undefined);
  };

  const showPostModalVisible = (isShow) => {
    setPostModalVisible(isShow);
    setOrderId(undefined);
  };

  const orderStatus = {
    1: '下单', // 下单
    2: '支付', // 支付
    3: '发货', // 发货
    4: '收货', // 收货
    5: '过期', // 过期
  };

  const orderStatusTag = {
    1: 'success', // 下单
    2: 'success', // 支付
    3: 'success', // 发货
    4: 'success', // 收货
    5: 'error', // 过期
  };

  const columns = [
    {
      title: '单号',
      dataIndex: 'order_no',
    },
    {
      title: '用户',
      hideInSearch: true,
      dataIndex: ['user', 'name'],
    },
    {
      title: '金额',
      dataIndex: 'amount',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: orderStatus,
      render: (_, record) => (
        <Tag color={orderStatusTag[record.status]}>{orderStatus[record.status]}</Tag>
      ),
    },
    {
      title: '支付时间',
      dataIndex: 'pay_time',
      hideInSearch: true,
    },
    {
      title: '支付类型',
      dataIndex: 'pay_type',
      hideInSearch: true,
    },
    {
      title: '支付单号',
      dataIndex: 'trade_no',
    },
    {
      title: '操作',
      valueType: 'option',
      hideInSearch: true,
      render: (_, record) => [
        <a
          key="detail"
          onClick={() => {
            setOrderId(record.id);
            setDetailModalVisible(true);
          }}
        >
          详情
        </a>,
        record.status === 2 && (
          <a
            key="post"
            onClick={() => {
              setOrderId(record.id);
              setPostModalVisible(true);
            }}
          >
            发货
          </a>
        ),
      ],
    },
  ];

  const handleGetOrders = async (params) => {
    const response = await getOrders({ ...params, include: 'user' });
    return {
      data: response.data,
      success: true,
      total: response.meta.pagination.total,
    };
  };

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}) => handleGetOrders(params)}
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
        headerTitle="订单管理"
        toolBarRender={null}
      />

      {detailModalVisible && (
        <Detail
          visible={detailModalVisible}
          setVisible={showDetailModalVisible}
          orderId={orderId}
        />
      )}
      {PostModalVisible && (
        <Post visible={PostModalVisible} setVisible={showPostModalVisible} orderId={orderId} />
      )}
    </PageContainer>
  );
};

export default Order;
