import { connect } from 'umi';
import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const DashBoard = (props) => {
  const { dispatch, dashboard } = props;

  useEffect(() => {
    dispatch({
      type: 'dashboard/fetchDashboard',
      payload: null,
    });
  }, []);

  return (
    <PageContainer>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="用户数量"
              value={dashboard.usersCount}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="商品数量"
              value={dashboard.goodsCount}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="订单数量"
              value={dashboard.orderCount}
              precision={0}
              valueStyle={{ color: '#271bc7' }}
              prefix={<ArrowDownOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default connect(({ dashboard }) => ({ dashboard }))(DashBoard);
