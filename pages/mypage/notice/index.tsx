import {useCallback, useEffect, useState, ReactElement} from 'react';
import {Text, Wrapper, Select, Input, Txt} from '@components/atoms';
import {Section} from '@components/molecules';
import Table from '@components/organisms/Table';
import styled from '@emotion/styled';
import theme from '@public/theme';
import {useRouter} from 'next/router';
import useInput from '@hooks/useInput';
import getNoticeListApi, {SearchType} from '@api/mypage/getNoticeListApi';
import {YYYYMMDD} from '@modules/setDateFormat';
import {columnArr} from '@public/selectArr';
import {GetServerSideProps} from 'next';
import useQuery, {IQuery} from '@modules/hooks/useQuery';
import useButtonEl from '@modules/hooks/useButtonEl';
import {EasyVehicleRegistration} from '@components/organisms';

const Notice = ({pageProps}: {pageProps: any}): ReactElement => {
  const router = useRouter();
  const queries = pageProps.query;
  const [searchType, setSearchType] = useState(queries.searchType || SearchType[0]);
  const [keyword, onChangeKeyword] = useInput<string>(queries.keyword || '');
  const [pagesAmount, setPagesAmount] = useState<number>(1);
  const [list, setList] = useState<any>([]);
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const [tableHeight, setTableHeight] = useState<undefined | number>(undefined);
  const searchTypeVal = keyword ? searchType : undefined;
  const SearchButton = useButtonEl('검색');
  const QnAButton = useButtonEl('일대일 문의 하기');

  const noticeListQuery: IQuery = {
    response: pageProps.response,
    value: {keyword, searchType: searchTypeVal},
    api: getNoticeListApi
  };

  const [res, runNoticeListApi, Pagination, useQueryOptions] = useQuery(noticeListQuery, pagesAmount);
  useEffect(() => {
    const result = res?.getNoticeList;
    setNoticeList(result);
  }, [res]);

  useEffect(() => {
    clickedIndex >= 0 && router.push(`${router.pathname}/notice-page?id=${list[clickedIndex].id.replace('IMPORTANT', '')}`);
  }, [list, clickedIndex]);

  const setNoticeList = useCallback((res: any) => {
    const data = res?.results.map((item: any) => ({
      ...item,
      id: item.status === 'IMPORTANT' ? `IMPORTANT${item.id}` : item.id.toString()
    }));
    setList(data);
    setPagesAmount(res?.totalPages);
    if (res?.total > 1) {
      setTableHeight(667);
    } else {
      setTableHeight(undefined);
    }
  }, []);

  const handleChangeSearchType = useCallback((event: any) => {
    setSearchType(event.target.value);
  }, []);

  const submitByEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        runNoticeListApi();
      }
    },
    [keyword, searchType]
  );

  const onClickSearch = useCallback(() => {
    runNoticeListApi();
  }, [keyword, searchType]);

  return (
    <>
      <EasyVehicleRegistration />
      <Section padding="30px 36px" border="1px solid #cccccc">
        <Txt type="medium" fontSize="24px" style={{letterSpacing: '-1px'}}>
          공지 사항
        </Txt>{' '}
        <Wrapper w between mt={26}>
          <Wrapper w>
            <Select value={searchType} options={columnArr} onChange={handleChangeSearchType} width={'130px'} height={'42px'} mr={10} />

            <Input
              value={keyword}
              onChange={onChangeKeyword}
              version="b"
              whcbr={[235, 42, 'transparent', '1px solid #d8d8d8', 2]}
              placeholder="검색어를 입력하세요."
              maxLength={20}
              onKeyPress={submitByEnter}
            />

            <SearchButton whcbr={[120, 42, '#0073e8', 'none', 2]} ml={10} onClick={onClickSearch} loading={useQueryOptions.loading} />
          </Wrapper>
          <QnAButton whcbr={[120, 42, 'white', '1px solid #0073e8', 2]} style={{color: '#0073e8'}} onClick={() => router.push('/mypage/qna')} />
        </Wrapper>
        <TableWrapper>
          <Table data={[list, dataOptions]} setClickedIndex={setClickedIndex} heightFix={tableHeight} />
        </TableWrapper>
        <Wrapper w pt={25} pb={80}>
          <Pagination />
        </Wrapper>
      </Section>
    </>
  );
};

export default Notice;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {query} = context;
  const response = await getNoticeListApi(query, context);
  return response;
};

const dataOptions: any = [
  {
    dataKey: 'id',
    dataName: '번호',
    options: {
      formatter(val: string) {
        return val.includes('IMPORTANT') ? (
          <Wrapper w width="100%">
            <InfoText>중요</InfoText>
          </Wrapper>
        ) : (
          val
        );
      }
    }
  },
  {
    dataKey: 'title',
    dataName: '제목',
    options: {
      textAlign: 'left',
      formatter(val: string): ReactElement {
        return (
          <Wrapper maxWidth={'600px'} height={20}>
            {val}
          </Wrapper>
        );
      }
    }
  },
  {
    dataKey: 'createdDate',
    dataName: '작성일',
    options: {
      formatter(val: string) {
        return YYYYMMDD(val);
      }
    }
  }
];

const TableWrapper = styled(Wrapper)`
  margin-top: 30px;
  table thead tr th {
    background-color: #f6f7fa !important;
  }

  table thead tr th:first-of-type {
    width: 10% !important;
  }

  table thead tr th:last-child {
    width: 20% !important;
  }

  table tbody tr.row-tr {
    cursor: pointer;
  }
`;

const InfoText = styled(Text)`
  text-align: center;
  border: 1px solid ${theme.color.main};
  border-radius: 18px;
  width: 66px;
  height: 36px;
  padding: 10px 0;
  color: ${theme.color.main};
`;
