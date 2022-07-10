import {Section} from '@components/molecules';
import {Button, Text, Wrapper} from '@components/atoms';
import {useRouter} from 'next/router';
import React, {ReactElement, useEffect, useState} from 'react';
import getNoticeApi from '@api/mypage/getNoticeApi';
import styled from '@emotion/styled';
import theme from '@public/theme';
import {YYYYMMDD} from '@modules/setDateFormat';
import {getParsedResponse} from '@modules/replaceStrings';
import {GetServerSideProps} from 'next';
import useQueries from '@modules/hooks/useQueries';

const NoticePage = ({pageProps}: {pageProps: any}): ReactElement => {
  const [domReady, setDomReady] = useState(false);
  const router = useRouter();
  const {query} = pageProps;
  const response = pageProps.response[0];
  const [id, setId] = useState(query.id);
  const queries = {
    response,
    value: {id},
    api: () => getNoticeApi(id)
  };
  const [res, runApi] = useQueries(queries);

  useEffect(() => {
    domReady && runApi();
  }, [id]);

  useEffect(() => {
    setDomReady(true);
  }, []);

  return (
    <Section>
      <Text type="sectionHeading4">공지사항</Text>
      <Wrapper mt={34}>
        <>
          <Text type="sectionHeading4">{res.getNotice.notice.title}</Text>
          <Text type="sectionBodyText" color={theme.color.darkgray} mt={15} mb={20}>
            {YYYYMMDD(res.getNotice.notice.createdDate)}
          </Text>
          <DetailWrapper>
            <ContentWrap dangerouslySetInnerHTML={{__html: res.getNotice.notice.content}} />
          </DetailWrapper>
          <Wrapper w between>
            <Wrapper between>
              <Button
                type={res.getNotice.previous !== null ? 'white' : 'disable'}
                children="이전"
                mr="8px"
                width="64px"
                height="36px"
                onClick={() => setId(res.getNotice.previous)}
                disabled={res.getNotice.previous === null}
              />
              <Button
                type={res.getNotice.next !== null ? 'white' : 'disable'}
                children="다음"
                width="64px"
                height="36px"
                onClick={() => setId(res.getNotice.next)}
                disabled={res.getNotice.next === null}
              />
            </Wrapper>
            <Button children="목록" width="64px" height="36px" onClick={() => router.push('/mypage/notice')} />
          </Wrapper>
        </>
      </Wrapper>
    </Section>
  );
};

export default NoticePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const contextQuery = context.query;
  return getParsedResponse(context, [await getNoticeApi(Number(contextQuery.id), context)]);
};

const DetailWrapper = styled(Wrapper)`
  border-top: 1px solid ${theme.color.lineGray};
  border-bottom: 1px solid ${theme.color.lineGray};
  padding: 40px 67px 60px 20px;
  margin-bottom: 20px;
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
