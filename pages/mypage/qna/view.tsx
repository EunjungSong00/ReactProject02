import React, {useCallback, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import styled from '@emotion/styled';
import getQnaApi from '@api/mypage/qna/getQnaApi';
import qnaDeleteApi from '@api/mypage/qna/qnaDeleteApi';
import {YYYYMMDD} from '@modules/setDateFormat';
import {Dialog, EasyVehicleRegistration} from '@components/organisms';
import Text from '@components/atoms/Text';
import ButtonNew from '@components/atoms/ButtonNew';
import Wrapper from '@components/atoms/Wrapper';
import theme from '@public/theme';
import {statusArr} from '@public/selectArr';
import {GetServerSideProps} from 'next';
import {getParsedResponse} from '@modules/replaceStrings';

const QnaView = ({pageProps}: any) => {
  const [data, setData] = useState<any>(null);
  const [dialogDelete, setDialogDelete] = useState<number | undefined>(undefined);
  const [dialogComplete, setDialogComplete] = useState<number | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const result = pageProps.response[0].getQnA;
    setData(result);
  }, []);

  const DeleteQnaAlert = useCallback(() => {
    setDialogDelete(1);
  }, []);

  const DeleteQna = useCallback(() => {
    qnaDeleteApi(Number(router.query.id)).then((res) => {
      if (res) {
        setDialogComplete(1);
        router.replace('/mypage/qna');
      }
    });
  }, [router.query.id]);

  const titleDom = (value: string) => (
    <Wrapper padding={value === 'Q' ? '0 0 30px 0' : '25px 20px 30px'}>
      <Wrapper flex>
        <TitleCircle type={value}>
          <Text color={'white'} weight={'6'} lineHeight={'36px'}>
            {value}
          </Text>
        </TitleCircle>
        <Wrapper ml={'20px'}>
          <Text size={'md'} weight={'4'} lineHeight={'36px'}>
            {data.title}
          </Text>
        </Wrapper>
      </Wrapper>
      <Wrapper flex ml={'60px'} mt={'15px'}>
        {value === 'Q' ? (
          <Text size={'xs'} weight={'5'} color={theme.color.primary} mr={'20px'}>
            {statusArr[data.status].title}
          </Text>
        ) : null}
        <Text size={'xs'} color={theme.color.lightgray}>
          {YYYYMMDD(data.createdDate)}
        </Text>
      </Wrapper>
    </Wrapper>
  );
  return (
    <>
      {dialogDelete && (
        <Dialog title="알림" dialogOpen={dialogDelete} setDialogClose={setDialogDelete} okText="확인" cancelText="닫기" onClickDialogEnter={() => DeleteQna()}>
          삭제하겠습니까?
        </Dialog>
      )}

      {dialogComplete && (
        <Dialog title="알림" dialogOpen={dialogComplete} setDialogClose={setDialogComplete}>
          삭제되었습니다.
        </Dialog>
      )}
      <EasyVehicleRegistration />
      <Wrapper background={theme.color.white}>
        <QnaHeader>
          <Text type="sectionHeading4">일대일 문의사항</Text>
          {data ? (
            <>
              <Wrapper mt={30} justifyContent={'space-between'}>
                {titleDom('Q')}
              </Wrapper>
              <Wrapper padding={'40px 20px 50px'} border={`1px solid ${theme.color.borderColor}`} borderWidth={'1px 0'}>
                <ContentWrap dangerouslySetInnerHTML={{__html: data.content}} />
              </Wrapper>
              <RightWrapper margin={'20px 0 50px'}>
                <ButtonNew children={'삭제'} white small mr={'5px'} onClick={DeleteQnaAlert} />
                <ButtonNew children={'수정'} line small onClick={() => router.replace(`/mypage/qna/update?id=${router.query.id}`)} />
              </RightWrapper>
              <Wrapper margin={'20px 0 50px'}>
                <ButtonNew children={'목록'} white small onClick={() => router.back()} />
              </Wrapper>
              {data.answer ? (
                <Wrapper background={theme.color.hoverWhite} border={`1px solid ${theme.color.borderColor}`}>
                  {titleDom('A')}
                  <Wrapper borderTop={`1px solid ${theme.color.borderColor}`} padding={'40px 40px 50px'}>
                    <ContentWrap dangerouslySetInnerHTML={{__html: data.answer}} />
                  </Wrapper>
                </Wrapper>
              ) : null}
            </>
          ) : null}
        </QnaHeader>
      </Wrapper>
    </>
  );
};

export default QnaView;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const contextQuery = context.query;
  return getParsedResponse(context, [await getQnaApi(Number(contextQuery.id), context)]);
};

const QnaHeader = styled.div`
  padding: 25px 30px;
`;

const TitleCircle = styled.div<any>`
  width: 39px;
  height: 39px;
  background: ${theme.color.darkgray};
  background: ${({type}) => (type === 'Q' ? theme.color.darkgray : theme.color.primary)};
  border-radius: 50%;
  text-align: center;
`;

const RightWrapper = styled(Wrapper)`
  float: right;
`;

const ContentWrap = styled.div<any>`
  font-family: 'SpoqaHanSansNeo-Regular';
  font-size: 15px;
  line-height: 25px;
  color: ${theme.color.black};
  strong,
  p,
  em,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font: revert;
  }
  ol li:not(.ql-direction-rtl),
  ul li:not(.ql-direction-rtl) {
    padding-left: 1.5em;
  }

  ol li {
    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
    counter-increment: list-0;
  }

  ol > li,
  ul > li {
    list-style-type: none;
  }

  li:not(.ql-direction-rtl)::before {
    margin-left: -1.5em;
    margin-right: 0.3em;
    text-align: right;
  }

  ol li:before {
    content: counter(list-0, decimal) '. ';
  }

  li::before {
    display: inline-block;
    white-space: nowrap;
    width: 1.2em;
  }

  ul > li::before {
    content: '\\2022';
  }

  blockquote {
    border-left: 4px solid #ccc;
    margin-bottom: 5px;
    margin-top: 5px;
    padding-left: 16px;
  }
`;
