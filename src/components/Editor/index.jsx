import React, { useState } from 'react';
// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';
import './index.css';
import { ContentUtils } from 'braft-utils';
import AliyunOSSUpload from '@/components/AliyunOSSUpload';
import { UploadOutlined } from '@ant-design/icons';

const Editor = (props) => {
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(props.content ?? null),
  );

  const handleEditorChange = (editorStateObj) => {
    setEditorState(editorStateObj);

    const htmlContent = editorStateObj.toHTML();
    props.onEdited(editorStateObj.isEmpty() ? '' : htmlContent);
  };

  const uploadPicture = (url) => {
    setEditorState(
      ContentUtils.insertMedias(editorState, [
        {
          type: 'IMAGE',
          url,
        },
      ]),
    );
  };

  const extendControls = [
    {
      key: 'antd-uploader',
      type: 'component',
      component: (
        <AliyunOSSUpload
          accept="image/*"
          showUploadList={false}
          onPictureUploaded={(url) => uploadPicture(url)}
        >
          {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
          <button type="button" className="control-item button upload-button" data-title="插入图片">
            <UploadOutlined />
            &nbsp;插入图片
          </button>
        </AliyunOSSUpload>
      ),
    },
  ];

  return (
    <div className="my-editor">
      <BraftEditor
        value={editorState}
        onChange={handleEditorChange}
        extendControls={extendControls}
      />
    </div>
  );
};

export default Editor;
