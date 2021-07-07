import React, { useEffect, useState } from 'react';
import { Modal, Skeleton, Divider, Image, Typography, Row, Col } from 'antd';
import { getCommentDetail } from '@/services/comment';

const Detail = (props) => {
  const { visible, setVisible, commentId } = props;
  const [cover, setCover] = useState(undefined);
  const [title, setTitle] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [comment, setComment] = useState(undefined);
  const [reply, setReply] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCommentDetail(commentId, { include: 'goods' });
      if (response.id !== undefined) {
        const { goods } = response;
        const total = goods.price * goods.sales;
        setCover(goods.cover_url);
        setTitle(goods.title);
        setDescription(`单价: ${goods.price} · 数量: ${goods.sales} · 总价: ${total}`);
        setComment(response.content);
        setReply(response.reply);
      } else {
        setVisible(false);
      }
    };
    fetchData();
  }, [commentId, setVisible]);

  return (
    <Modal
      title={'订单详情'}
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      destroyOnClose
    >
      {title === undefined ? (
        <Skeleton active paragraph={{ rows: 6 }}></Skeleton>
      ) : (
        <div style={{ marginTop: '-16px' }}>
          <Divider orientation="left">商品</Divider>
          <Row>
            <Col>
              <Image width={64} src={cover} />
            </Col>
            <Col style={{ marginLeft: '8px' }}>
              <Row>
                <Col>
                  <Typography.Title level={5}>{title}</Typography.Title>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Typography.Text>{description}</Typography.Text>
                </Col>
              </Row>
            </Col>
          </Row>
          <Divider orientation="left">评价</Divider>
          <Typography.Paragraph>{comment}</Typography.Paragraph>
          <Divider orientation="left">回复</Divider>
          <Typography.Paragraph>{reply}</Typography.Paragraph>
        </div>
      )}
    </Modal>
  );
};

export default Detail;
