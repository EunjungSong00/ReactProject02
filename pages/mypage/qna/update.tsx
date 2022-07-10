import React, {useCallback, useState, memo} from 'react';
import {GetServerSideProps} from 'next';
import {useRouter} from 'next/router';
import {getParsedResponse} from '@modules/replaceStrings';
import getQnaApi from '@api/mypage/qna/getQnaApi';
import qnaUpdateApi from '@api/mypage/qna/qnaUpdateApi';
import {Dialog, EasyVehicleRegistration, Popup} from '@components/organisms';
import Text from '@components/atoms/Text';
import Wrapper from '@components/atoms/Wrapper';
import Select from '@components/atoms/Select';
import {Input} from '@components/atoms';
import Editor from '@components/organisms/Editor';
import ButtonNew from '@components/atoms/ButtonNew';
import {PopupType} from '@components/organisms/Popup';
import {categoryArr} from '@public/selectArr';
import theme from '@public/theme';
import styled from '@emotion/styled';

const QnaUpdate = ({pageProps}: any) => {
  const res = pageProps.response[0].getQnA;
  const [category, setCategory] = useState(res?.category);
  const [content, setContent] = useState(res?.content);
  const [title, setTitle] = useState(res?.title);
  const [dialogCreate, setDialogCreate] = useState<number | undefined>(undefined);
  const [dialogCancel, setDialogCancel] = useState<number | undefined>(undefined);
  const [popupContent, setPopupContent] = useState<PopupType>(undefined);
  const router = useRouter();

  const handleChangeCategory = useCallback((event: any) => {
    setCategory(event.target.value);
  }, []);

  const handleChangeTitle = useCallback((event: any) => {
    setTitle(event.target.value);
  }, []);

  const onEditorChange = useCallback((value) => {
    setContent(value.replaceAll('"', '&quot;'));
  }, []);

  const ClickCancel = useCallback(() => {
    setDialogCancel(1);
  }, []);

  const ClickCreate = useCallback(() => {
    if (category !== '0' && title && content) {
      updateQna();
    } else {
      setDialogCreate(1);
    }
  }, [router.query.id, category, content, title]);

  const updateQna = useCallback(() => {
    const query = {
      id: Number(router.query.id),
      category,
      content,
      title
    };
    qnaUpdateApi(query).then((res) => {
      if (res) {
        if (res.response?.errors) {
          setPopupContent(res.response.errors[0].message.toString());
        } else {
          setPopupContent('수정이 완료되었습니다.');
        }
      }
    });
  }, [router.query.id, category, content, title]);

  return (
    <>
      {dialogCancel && (
        <Dialog
          title="알림"
          dialogOpen={dialogCancel}
          setDialogClose={setDialogCancel}
          okText="확인"
          cancelText="닫기"
          onClickDialogEnter={() => router.replace(`/mypage/qna/view?id=${router.query.id}`)}
        >
          문의 글 수정을 취소하시겠습니까?
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
          <Text type="sectionHeading4">일대일 문의사항 수정</Text>
          <Wrapper flex mt={25}>
            <SelectWrapper>
              <Select value={category} onChange={handleChangeCategory} options={categoryArr} placeholder={'분류'} width={'145px'} height={'36px'} />
            </SelectWrapper>
            <Wrapper flexNum={6}>
              <Input type={'squareInputSmall'} placeholder="제목을 입력해 주세요." value={title} onChange={handleChangeTitle} />
            </Wrapper>
          </Wrapper>
          <Wrapper mt={15}>
            <Editor value={content} onChange={onEditorChange} />
          </Wrapper>
          <Wrapper flex mt={65} justifyContent={'center'}>
            <ButtonNew children={'취소'} small line mr={'5px'} onClick={() => ClickCancel()} />
            <ButtonNew children={'수정'} small onClick={() => ClickCreate()} />
          </Wrapper>
        </QnaHeader>
      </Wrapper>
      <Popup content={popupContent} setContent={setPopupContent} okText="확인" onClickPopupEnter={() => router.replace(`/mypage/qna/view?id=${router.query.id}`)} />
    </>
  );
};

export default memo(QnaUpdate);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const contextQuery = context.query;
  return getParsedResponse(context, [await getQnaApi(Number(contextQuery.id), context)]);
};

const QnaHeader = styled.div`
  padding: 25px 30px;
`;

const SelectWrapper = styled.div`
  margin-right: 20px;
  flex: 1;
`;
