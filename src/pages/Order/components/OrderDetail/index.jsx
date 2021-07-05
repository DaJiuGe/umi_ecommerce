import React, { useEffect, useState } from 'react';
import { Modal, Skeleton, Image, Typography, Row, Col, Divider } from 'antd';
import { getOrderDetail } from '@/services/order';

const OrderDetail = (props) => {
  const { visible, setVisible, orderId } = props;
  const [dataInfo, setDataInfo] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOrderDetail(orderId, { include: 'goods,orderDetails' });
      if (response.id !== undefined) {
        const { goods, orderDetails } = response;
        const orderList = [];
        for (let i = 0; i < goods.data.length; i += 1) {
          const goodsData = goods.data[i];
          const orderDetailsData = orderDetails.data[i];
          const { price, num } = orderDetailsData;
          const total = price * num;
          orderList.push({
            cover: goodsData.cover_url,
            title: goodsData.title,
            description: `单价: ${price} · 数量: ${num} · 总价: ${total}`,
          });
        }
        setDataInfo(orderList);
      } else {
        setVisible(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Modal
      title={'订单详情'}
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      destroyOnClose
    >
      {dataInfo === undefined ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        dataInfo.map((item, index, arr) => {
          return (
            <div key={item.title + item.cover_url}>
              <Row>
                <Col>
                  <Image width={64} src={item.cover} />
                </Col>
                <Col style={{ marginLeft: '8px' }}>
                  <Row>
                    <Col>
                      <Typography.Title level={5}>{item.title}</Typography.Title>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Typography.Text>{item.description}</Typography.Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
              {index !== arr.length - 1 && <Divider />}
            </div>
          );
        })
      )}
    </Modal>
  );
};

export default OrderDetail;
