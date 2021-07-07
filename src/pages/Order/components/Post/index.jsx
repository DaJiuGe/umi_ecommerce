import React from 'react';
import { Modal, message } from 'antd';
import { postOrder } from '@/services/order';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';

const Post = (props) => {
  const { visible, setVisible, orderId } = props;

  const handleSubmit = async (values) => {
    const response = await postOrder(orderId, values);
    if (response === undefined || response.message !== undefined) {
      message.success('发货成功');
    }
  };

  const EXPRESS_TYPE = [
    { label: '顺丰', value: 'SF' },
    { label: '圆通', value: 'YTO' },
    { label: '韵达', value: 'YD' },
  ];

  return (
    <Modal
      title={'订单详情'}
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      destroyOnClose
    >
      <ProForm onFinish={async (values) => handleSubmit(values)}>
        <ProFormSelect
          label="快递类型"
          name="express_type"
          options={EXPRESS_TYPE}
          rules={[{ required: true, message: '请选择快递类型' }]}
        />
        <ProFormText
          label="快递单号"
          name="express_no"
          rules={[{ required: true, message: '请输入快递单号' }]}
        />
      </ProForm>
    </Modal>
  );
};

export default Post;
