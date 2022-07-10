import React, {ChangeEventHandler, useEffect, useMemo, useRef, useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import Wrapper from '@components/atoms/Wrapper';

interface IEditor {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Editor = ({value, onChange}: IEditor) => {
  const [isOpen, setOpen] = useState(false);
  const ReactQuill = isOpen && typeof window === 'object' ? require('react-quill') : () => false;
  const quillRef = useRef(null);

  useEffect(() => {
    setOpen(true);
  }, []);

  /* 이미지 제어 */
  /* const imageHandler = () => {
    // console.info('imageHandler');
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '.png,.jpg,.jpeg');
    input.click();
    input.onchange = async function () {
      const file = input.files[0];
      // console.info('User trying to uplaod this:', file);

      // const id = await uploadFile(file); // I'm using react, so whatever upload function
      const range = this.quill.getSelection();
      // const link = `${ROOT_URL}/file/${id}`;
      // console.info(range);
      // this part the image is inserted
      // by 'image' option below, you just have to put src(link) of img here.
      // this.quill.insertEmbed(range.index, 'image', link);
    };
    /!* input.onchange = (e) => {
      const filefile = e.target.files;
      const formData = new FormData();
      formData.append('files', filefile[0]);

      // console.info(formData);
      /!*
      //file 등록
      const tempFile = api.file.postTempFileUpload(formData);
      tempFile.then(res = > {
        //커서위치 및 fileSrno 얻기
        const fileSrno = res.fileSrno;
        const range = this.quill.getSelection();

        this.quill.insertEmbed(range.index, 'imagee', 'http://localhost:8002/master/api/v1/upload
      })

       *!/
    }; *!/
  }; */

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          // [{ 'font': [] }],
          [{header: [1, 2, 3, 4, 5, false]}],
          ['bold', 'italic', 'underline', 'strike'] /* , 'blockquote' */
          // [{list: 'ordered'}, {list: 'bullet'}, {indent: '-1'}, {indent: '+1'}],
          // ['link'],
          // [{align: []}, {color: []}, {background: []}], dropdown with defaults from theme
          // ['clean']
        ] /* ,
        handlers: {
          image: imageHandler
        } */
      }
    }),
    []
  );

  return <>{!!ReactQuill && isOpen && <ReactQuill style={{height: '400px'}} value={value || ''} theme="snow" modules={modules} ref={quillRef} onChange={onChange} />}</>;
};

export default Editor;
