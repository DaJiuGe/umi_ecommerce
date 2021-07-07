import ProForm, { ProFormText } from '@ant-design/pro-form';
import React, { useEffect, useState } from 'react';
import { Modal, Skeleton, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getSlideDetail, addSlide, updateSlide } from '@/services/slide';
import AliyunOSSUpload from '@/components/AliyunOSSUpload';

const CreateOrEdit = (props) => {
  const { visible, setVisible, parentTable, editId } = props;
  const [dataInfo, setDataInfo] = useState(undefined);
  const [form] = ProForm.useForm();
  const [defaultUploadFileList, setDefaultUploadFileList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (editId !== undefined) {
        const response = await getSlideDetail(editId);
        if (response.message === undefined) {
          setDefaultUploadFileList([
            {
              name: response.img,
              percent: 100,
              status: 'done',
              thumbUrl: response.img_url,
              url: response.img_url,
            },
          ]);
          setDataInfo({ ...response });
        } else {
          setVisible(false);
        }
      }
    };
    fetchData();
  }, [editId, setVisible]);

  const handleSubmit = async (values) => {
    let response;
    if (editId !== undefined) {
      response = await updateSlide(editId, { ...values });
    } else {
      response = await addSlide({ ...values });
    }

    if (response.status === undefined) {
      message.success(editId === undefined ? '添加成功' : '修改成功');
      setVisible(false);
      parentTable.current.reload();
    }
  };

  return (
    <Modal
      title={editId === undefined ? '添加轮播图' : '编辑轮播图'}
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      destroyOnClose
    >
      {dataInfo === undefined && editId !== undefined ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : (
        <ProForm
          form={form}
          initialValues={dataInfo}
          onFinish={async (values) => handleSubmit(values)}
        >
          <ProFormText
            label="轮播名"
            name="title"
            placeholder="请输入轮播名"
            rules={[{ required: true, message: '请输入轮播名' }]}
          />
          <ProFormText label="跳转URL" name="url" placeholder="请输入URL" />
          <ProFormText label="排序" name="seq" placeholder="请输入排序" />
          <ProForm.Item
            label="封面图"
            name="img"
            rules={[{ required: true, message: '请选择封面图' }]}
          >
            <AliyunOSSUpload
              accept="image/*"
              defaultUploadFileList={defaultUploadFileList}
              onUploaded={(value) => {
                form.setFieldsValue({ img: value });
              }}
            >
              {<Button icon={<UploadOutlined />}>点击上传</Button>}
            </AliyunOSSUpload>
          </ProForm.Item>
        </ProForm>
      )}
    </Modal>
  );
};

export default CreateOrEdit;
