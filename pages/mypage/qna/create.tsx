import React, {useCallback, useState, memo} from 'react';
import {useRouter} from 'next/router';
import styled from '@emotion/styled';
import useInput from '@hooks/useInput';
import qnaCreateApi from '@api/mypage/qna/qnaCreateApi';
import {Dialog, EasyVehicleRegistration, Popup} from '@components/organisms';
import Text from '@components/atoms/Text';
import Wrapper from '@components/atoms/Wrapper';
import Select from '@components/atoms/Select';
import {Button, Input} from '@components/atoms';
import Editor from '@components/organisms/Editor';
import theme from '@public/theme';
import ButtonNew from '@components/atoms/ButtonNew';
import {categoryArr} from '@public/selectArr';
import {PopupType} from '@components/organisms/Popup';

const QnaCreate = () => {
  const [category, setCategory] = useState('0');
  const [contents, setContents] = useState('');
  const [title, onChangeTitle] = useInput('');
  const [dialogCancel, setDialogCancel] = useState<number | undefined>(undefined);
  const [dialogCreate, setDialogCreate] = useState<number | undefined>(undefined);
  const [popupContent, setPopupContent] = useState<PopupType>(undefined);

  const router = useRouter();

  const handleChangeCategory = useCallback((event: any) => {
    setCategory(event.target.value);
  }, []);

  const onEditorChange = useCallback((value) => {
    setContents(value.replaceAll('"', '&quot;'));
  }, []);

  const ClickCancel = useCallback(() => {
    setDialogCancel(1);
  }, []);

  const ClickCreate = useCallback(() => {
    if (category !== '0' && title && contents) {
      createQna();
    } else {
      setDialogCreate(1);
    }
  }, [category, contents, title]);

  const createQna = useCallback(() => {
    qnaCreateApi({category, contents, title}).then((res) => {
      if (res) {
        if (res.response?.errors) {
          setPopupContent(res.response.errors[0].message.toString());
        } else {
          setPopupContent('등록이 완료되었습니다.');
        }
      }
    });
  }, [category, contents, title]);

  return (
    <>
      {dialogCancel && (
        <Dialog title="알림" dialogOpen={dialogCancel} setDialogClose={setDialogCancel} okText="확인" cancelText="닫기" onClickDialogEnter={() => router.back()}>
          문의 글 등록을 취소하시겠습니까?
        </Dialog>
      )}

      {dialogCreate && (
        <Dialog title="알림" dialogOpen={dialogCreate} setDialogClose={setDialogCreate}>
          값을 입력하세요.
        </Dialog>
      )}
      <EasyVehicleRegistration />
      <Wrapper background={theme.color.white}>
        <QnaHeader>
          <Text type="sectionHeading4">일대일 문의사항 작성</Text>
          <Wrapper flex mt={25}>
            <SelectWrapper>
              <Select value={category} onChange={handleChangeCategory} options={categoryArr} placeholder={'분류'} width={'145px'} height={'36px'} />
            </SelectWrapper>
            <Wrapper flexNum={6}>
              <Input type={'squareInputSmall'} placeholder="제목을 입력해 주세요." value={title} onChange={onChangeTitle} />
            </Wrapper>
          </Wrapper>
          <Wrapper mt={15}>
            <Editor value={contents} onChange={onEditorChange} />
          </Wrapper>
          <Wrapper flex mt={65} justifyContent={'center'}>
            <ButtonNew children={'작성 취소'} small line mr={'5px'} onClick={() => ClickCancel()} />
            <ButtonNew children={'문의 하기'} small onClick={() => ClickCreate()} />
          </Wrapper>
        </QnaHeader>
      </Wrapper>
      <Popup content={popupContent} setContent={setPopupContent} okText="확인" onClickPopupEnter={() => router.replace('/mypage/qna')} />
    </>
  );
};

export default memo(QnaCreate);

const QnaHeader = styled.div`
  padding: 25px 30px;
`;

const SelectWrapper = styled.div`
  margin-right: 20px;
  flex: 1;
`;
