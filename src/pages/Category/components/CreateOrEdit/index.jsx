import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import React, { useEffect, useState } from 'react';
import { Modal, Skeleton, message } from 'antd';
import { getCategories, getCategoryDetail, addCategory, updateCategory } from '@/services/category';

const CreateOrEdit = (props) => {
  const { visible, setVisible, parentTable, editId } = props;
  const [dataInfo, setDataInfo] = useState(undefined);
  const [categories, setCategories] = useState([]);
  const [form] = ProForm.useForm();

  useEffect(() => {
    const fetchData = async () => {
      const categoriesRemote = await getCategories({ type: 'all' });
      if (categoriesRemote.status === undefined) {
        const categoryOptions = categoriesRemote.map((item) => {
          const { id, name } = item;
          return { label: name, value: id };
        });
        setCategories(categoryOptions);
      } else {
        setVisible(false);
      }

      if (editId !== undefined) {
        const response = await getCategoryDetail(editId);
        if (response.id !== undefined) {
          setDataInfo(response);
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
      response = await updateCategory(editId, values);
    } else {
      response = await addCategory(values);
    }

    if (response.status === undefined) {
      message.success(editId === undefined ? '添加成功' : '修改成功');
      setVisible(false);
      parentTable.current.reload();
    }
  };

  return (
    <Modal
      title={editId === undefined ? '添加分类' : '编辑分类'}
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
      destroyOnClose
    >
      {dataInfo === undefined && editId !== undefined ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : (
        <ProForm
          initialValues={dataInfo}
          onFinish={async (values) => handleSubmit(values)}
          form={form}
        >
          {(dataInfo === undefined || dataInfo.pid !== 0) && (
            <ProFormSelect
              label="父级分类"
              name="pid"
              placeholder="请选择分类，不选则创建顶级分类"
              options={categories}
            />
          )}
          <ProFormText
            label="分类名称"
            name="name"
            placeholder="请输入分类名称"
            rules={[{ required: true, message: '请输入分类名称' }]}
          />
        </ProForm>
      )}
    </Modal>
  );
};

export default CreateOrEdit;
