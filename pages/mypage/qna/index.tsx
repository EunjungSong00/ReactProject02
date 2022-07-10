import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {GetServerSideProps} from 'next';
import {useRouter} from 'next/router';
import useInput from '@hooks/useInput';
import {YYYYMMDD} from '@modules/setDateFormat';
import {statusArr, columnArr} from '@public/selectArr';
import qnaListApi, {SearchType} from '@api/mypage/qna/qnaListApi';
import {EasyVehicleRegistration} from '@components/organisms';
import {Input, Txt} from '@components/atoms';
import Text from '@components/atoms/Text';
import Wrapper from '@components/atoms/Wrapper';
import Select from '@components/atoms/Select';
import Table from '@components/organisms/Table';
import styled from '@emotion/styled';
import theme from '@public/theme';
import useQuery, {IQuery} from '@modules/hooks/useQuery';
import useButtonEl from '@modules/hooks/useButtonEl';

const QnaList = ({pageProps}: {pageProps: any}): ReactElement => {
  const propsQuery = pageProps.query;
  const [category, setCategory] = useState(propsQuery.category || undefined);
  const [searchType, setSearchType] = useState(propsQuery.searchType || SearchType[0]);
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const [keyword, onChangeKeyword] = useInput(propsQuery.keyword || '');
  const [pagesAmount, setPagesAmount] = useState<number>(1);
  const [list, setList] = useState<any>([]);
  const [tableHeight, setTableHeight] = useState<undefined | number>(undefined);
  const router = useRouter();
  const categoryTypeVal = category === '분류' ? undefined : category;
  const searchTypeVal = keyword ? searchType : undefined;
  const qnaListQuery: IQuery = {
    response: pageProps.response,
    value: {keyword, searchType: searchTypeVal, category: categoryTypeVal},
    api: qnaListApi
  };

  const [res, runQnaListApi, Pagination, useQueryOptions] = useQuery(qnaListQuery, pagesAmount);
  const SearchButton = useButtonEl('검색');
  const QnAButton = useButtonEl('문의 하기');

  useEffect(() => {
    try {
      const result: any = res && res.getQnAList;
      setQnaList(result);
    } catch (e) {
      console.error('e ~>', e);
    }
  }, [res]);

  useEffect(() => {
    clickedIndex >= 0 && router.push(`${router.pathname}/view?id=${list[clickedIndex].id}`);
  }, [list, clickedIndex]);

  const setQnaList = useCallback((res: any) => {
    const results: any[] = res?.results;
    const totalPages: number = res?.totalPages;
    const data =
      results &&
      results.map((item: any) => ({
        ...item,
        key: item.id
      }));
    setList(data);
    setPagesAmount(totalPages);
    if (totalPages > 1) {
      setTableHeight(667);
    } else {
      setTableHeight(undefined);
    }
  }, []);

  const handleChangeCategoryType = useCallback((event: any) => {
    setCategory(event.target.value);
  }, []);

  const handleChangeSearchType = useCallback((event: any) => {
    setSearchType(event.target.value);
  }, []);

  const searchClick = useCallback(() => {
    runQnaListApi();
  }, [keyword, searchType, category]);

  const submitByEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        searchClick();
      }
    },
    [keyword, searchType, category]
  );

  const goCreateQna = useCallback(() => {
    router.push(`${router.pathname}/create`);
  }, []);

  return (
    <>
      <EasyVehicleRegistration />
      <Wrapper padding="30px 36px" background={theme.color.white} border="1px solid #cccccc">
        <Wrapper>
          <Txt type="medium" fontSize="24px" style={{letterSpacing: '-1px'}}>
            일대일 문의사항
          </Txt>
          <Wrapper flex mt={25} justifyContent={'space-between'}>
            <Wrapper flex>
              <Wrapper mr={10}>
                <Select value={category} onChange={handleChangeCategoryType} options={categoryTypeArr} width={'145px'} height={'42px'} />
              </Wrapper>
              <Wrapper mr={10}>
                <Select value={searchType} onChange={handleChangeSearchType} options={columnArr} width={'130px'} height={'42px'} />
              </Wrapper>
              <Wrapper width={'235px'}>
                <Input
                  value={keyword}
                  onChange={onChangeKeyword}
                  version="b"
                  whcbr={[235, 42, 'transparent', '1px solid #d8d8d8', 2]}
                  placeholder="검색어를 입력하세요."
                  mr={20}
                  maxLength={20}
                  onKeyPress={submitByEnter}
                />
              </Wrapper>
              <SearchButton whcbr={[120, 42, '#0073e8', 'none', 2]} ml={10} onClick={searchClick} loading={useQueryOptions.loading} />
            </Wrapper>
            <Wrapper>
              <QnAButton whcbr={[120, 42, 'white', '1px solid #0073e8', 2]} style={{color: '#0073e8'}} onClick={goCreateQna} />
            </Wrapper>
          </Wrapper>
        </Wrapper>
        <Wrapper mt={30}>
          <Table data={[list, dataOptions]} setClickedIndex={setClickedIndex} heightFix={tableHeight} />
        </Wrapper>
        <Wrapper w pt={25} pb={80}>
          <Pagination />
        </Wrapper>
      </Wrapper>
    </>
  );
};

export default QnaList;

const queryDefault = {
  pageNo: 0
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {query} = context;
  const queryResult = query.pageNo ? query : queryDefault;
  const response = await qnaListApi(queryResult, context);
  return response;
};

const dataOptions = [
  {
    dataKey: 'id',
    dataName: '번호',
    options: {
      width: '60px'
    }
  },
  {
    dataKey: 'category',
    dataName: '질문 유형',
    options: {
      width: '80px'
    }
  },
  {
    dataKey: 'title',
    dataName: '제목',
    options: {
      width: '180px'
    }
  },
  {
    dataKey: 'status',
    dataName: '답변여부',
    options: {
      formatter(val: string) {
        return (
          <StatusWrapper color={statusArr[val].color}>
            <Text>{statusArr[val].title}</Text>
          </StatusWrapper>
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
const categoryTypeArr = [
  {label: '분류', value: undefined},
  {label: '기타', value: '기타'},
  {label: '이미지 업로드 오류', value: '이미지 업로드'},
  {label: '주변 매물', value: '주변 매물 검색'},
  {label: '프로세스 개선', value: '프로세스 개선'},
  {label: '대표 차량 소유주명', value: '대표 차량 소유주명'},
  {label: '매물 등록 시 오류', value: '매물 등록'},
  {label: '차량 조회 결과 값', value: '차량 조회 결과'}
];

const StatusWrapper = styled.div`
  display: inline-block;
  padding: 8px 15px;
  opacity: 0.5;
  border-radius: 18px;
  border: ${({color}) => color && `1px solid ${color}`};

  p {
    color: ${({color}) => color};
  }
`;
