import ProForm, { ProFormText, ProFormTextArea, ProFormDigit } from '@ant-design/pro-form';
import React, { useEffect, useState } from 'react';
import { Modal, Skeleton, message, Cascader, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getGoodsDetail, addGoods, updateGoods } from '@/services/goods';
import { getCategories } from '@/services/category';
import AliyunOSSUpload from '@/components/AliyunOSSUpload';

const CreateOrEdit = (props) => {
  const { visible, setVisible, parentTable, editId } = props;
  const [dataInfo, setUserInfo] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [form] = ProForm.useForm();

  useEffect(() => {
    const fetchData = async () => {
      const catogories = await getCategories();
      if (catogories.status === undefined) {
        setCategories(catogories);
      } else {
        setVisible(false);
      }

      if (editId !== undefined) {
        const response = await getGoodsDetail(editId);
        if (response.status === undefined) {
          setUserInfo({
            name: response.name,
            email: response.email,
            password: response.password,
          });
        } else {
          setVisible(false);
        }
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    let response;
    if (editId !== undefined) {
      response = await updateGoods(editId, values);
    } else {
      response = await addGoods(values);
    }

    if (response.status === undefined) {
      message.success(editId === undefined ? '添加成功' : '修改成功');
      setVisible(false);
      parentTable.current.reload();
    }
  };

  return (
    <Modal
      title={editId === undefined ? '添加商品' : '编辑商品'}
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      destroyOnClose
    >
      {dataInfo === undefined && editId !== undefined ? (
        <Skeleton active paragraph={{ rows: 3 }} />
      ) : (
        <ProForm
          form={form}
          initialValues={dataInfo}
          onFinish={async (values) => handleSubmit(values)}
        >
          <ProForm.Item
            label="分类"
            name="catogo_id"
            rules={[{ required: true, message: '请选择分类' }]}
          >
            <Cascader
              placeholder="请选择分类"
              fieldNames={{ label: 'name', value: 'id' }}
              options={categories}
            />
          </ProForm.Item>
          <ProFormText
            label="标题"
            name="title"
            placeholder="请输入标题"
            rules={[{ required: true, message: '请输入标题' }]}
          />
          <ProFormTextArea
            label="描述"
            name="description"
            placeholder="请输入描述"
            rules={[{ required: true, message: '请输入描述' }]}
          />
          <ProFormDigit
            label="价格"
            name="price"
            placeholder="请输入价格"
            min={0}
            max={99999999}
            rules={[{ required: true, message: '请输入价格' }]}
          />
          <ProFormDigit
            label="库存"
            name="stock"
            placeholder="请输入库存"
            min={0}
            max={99999999}
            rules={[{ required: true, message: '请输入库存' }]}
          />
          <ProForm.Item
            label="封面图"
            name="cover"
            rules={[{ required: true, message: '请选择封面图' }]}
          >
            <AliyunOSSUpload
              accept="image/*"
              onUploadDone={(value) => {
                form.setFieldsValue({ cover: value });
              }}
            >
              {<Button icon={<UploadOutlined />}>点击上传</Button>}
            </AliyunOSSUpload>
          </ProForm.Item>
          <ProFormTextArea
            label="详情"
            name="details"
            placeholder="请输入详情"
            rules={[{ required: true, message: '请输入详情' }]}
          />
        </ProForm>
      )}
    </Modal>
  );
};

export default CreateOrEdit;
