import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Tag, Rate } from 'antd';
import { getComments } from '@/services/comment';
import Detail from './components/Detail';
import Reply from './components/Reply';

const Comment = () => {
  const actionRef = useRef();

  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [commentId, setCommentId] = useState(undefined);

  const showDetailModalVisible = (isShow) => {
    setDetailModalVisible(isShow);
    setCommentId(undefined);
  };

  const showReplyModalVisible = (isShow) => {
    setReplyModalVisible(isShow);
    setCommentId(undefined);
  };

  const RATE_TAGS = [
    <Tag color="success" key="rate1">
      好评
    </Tag>,
    <Tag color="warning" key="rate2">
      中评
    </Tag>,
    <Tag color="error" key="rate3">
      差评
    </Tag>,
  ];

  const columns = [
    {
      title: '商品',
      hideInTable: true,
      dataIndex: ['goods', 'title'],
    },
    {
      title: '内容',
      hideInSearch: true,
      dataIndex: 'content',
    },
    {
      title: '评级',
      dataIndex: 'rate',
      valueType: 'radioButton',
      valueEnum: { 0: '好评', 1: '中评', 2: '差评' },
      initialValue: 0,
      render: (_, record) => [RATE_TAGS[record.rate]],
    },
    {
      title: '星级',
      dataIndex: 'star',
      hideInSearch: true,
      render: (_, record) => <Rate disabled defaultValue={record.star} />,
    },
    {
      title: '回复',
      dataIndex: 'reply',
      hideInSearch: true,
    },
    {
      title: '评价时间',
      dataIndex: 'updated_at',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="detail"
          onClick={() => {
            setCommentId(record.id);
            setDetailModalVisible(true);
          }}
        >
          详情
        </a>,
        <a
          key="reply"
          onClick={() => {
            setCommentId(record.id);
            setReplyModalVisible(true);
          }}
        >
          回复
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}) => getComments({ ...params, include: 'goods' })}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        headerTitle="评价管理"
        toolBarRender={null}
      />

      {/* 确保每次EditModal显示时,组件都能重新挂载 */}
      {detailModalVisible && (
        <Detail
          visible={detailModalVisible}
          setVisible={showDetailModalVisible}
          parentTable={actionRef}
          commentId={commentId}
        />
      )}
      {replyModalVisible && (
        <Reply
          visible={replyModalVisible}
          setVisible={showReplyModalVisible}
          parentTable={actionRef}
          commentId={commentId}
        />
      )}
    </PageContainer>
  );
};

export default Comment;
