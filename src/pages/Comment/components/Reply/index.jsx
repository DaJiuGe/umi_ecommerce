import ProForm, { ProFormTextArea } from '@ant-design/pro-form';
import React from 'react';
import { Modal, message } from 'antd';
import { replyComment } from '@/services/comment';

const Reply = (props) => {
  const { visible, setVisible, parentTable, commentId } = props;

  const handleSubmit = async (values) => {
    await replyComment(commentId, values);
    message.success('评论成功');
    setVisible(false);
    parentTable.current.reload();
  };

  return (
    <Modal
      title={'回复评论'}
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      destroyOnClose
    >
      <ProForm onFinish={async (values) => handleSubmit(values)}>
        <ProFormTextArea
          label="回复"
          name="reply"
          placeholder="请输入标题"
          rules={[{ required: true, message: '请输入标题' }]}
        />
      </ProForm>
    </Modal>
  );
};

export default Reply;
