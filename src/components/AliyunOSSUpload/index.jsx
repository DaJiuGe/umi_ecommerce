import React, { useState, useEffect } from 'react';
import { Upload, message } from 'antd';
import { getOSSConifg } from '@/services/common';

const AliyunOSSUpload = (props) => {
  const [OSSData, setOSSData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ossData = await getOSSConifg();
        setOSSData(ossData);
      } catch (error) {
        message.error(error);
      }
    };
    fetchData();
  }, []);

  /**
   * 额外的上传参数
   * @param file
   * @returns
   */
  const getExtraData = (file) => {
    return {
      key: file.key,
      OSSAccessKeyId: OSSData.accessid,
      policy: OSSData.policy,
      Signature: OSSData.signature,
      expire: OSSData.expire,
      host: OSSData.host,
      dir: OSSData.dir,
    };
  };

  /**
   * 文件上传过程中触发的回调函数，直到上传完成
   * @param file
   */
  const onChange = ({ file }) => {
    if (file.status === 'done') {
      props.onUploadDone(file.key);
      message.success('上传成功');
    }
  };

  /**
   * 文件上传前的操作
   * @param file
   * @returns
   */
  const beforeUpload = async (file) => {
    const expire = OSSData.expire * 1000;

    if (expire < Date.now()) {
      await this.init();
    }

    const dir = 'react/';
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = dir + Date.now() + suffix;

    // 解决: ES Lint: no-param-reassign
    const retFile = file;
    retFile.key = OSSData.dir + dir + filename;
    retFile.url = OSSData.host + OSSData.dir + dir + filename;

    return retFile;
  };

  const uploadProps = {
    name: 'file',
    accept: props.accept || '',
    action: OSSData.host,
    listType: 'picture',
    maxCount: 1,
    data: getExtraData,
    onChange,
    beforeUpload,
  };

  return <Upload {...uploadProps}>{props.children}</Upload>;
};

export default AliyunOSSUpload;
