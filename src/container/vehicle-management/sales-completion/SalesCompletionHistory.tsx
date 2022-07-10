import {Button, Image, Input, Line, Text, Txt, Wrapper} from '@components/atoms';
import theme from '@public/theme';
import styled from '@emotion/styled';
import {Section} from '@components/molecules';
import useInput from '@modules/hooks/useInput';
import {useState, useEffect, ReactElement, Fragment, useCallback} from 'react';
import Table, {ITableDataOptions} from '@components/organisms/Table';
import {useRouter} from 'next/router';
import {formattedDate, getCommas} from '@modules/replaceStrings';
import getSaleCompletedListApi from '@api/vehicle/getSaleCompletedListApi';
import InputUnit from '@components/atoms/InputUnit';
import Popup, {PopupType} from '@components/organisms/Popup';
import Toast from '@components/organisms/Toast';
import saleCompletedApi from '@api/vehicle/saleCompletedApi';
import useQuery, {IQuery} from '@modules/hooks/useQuery';
import usePopup from '@modules/hooks/usePopup';
import useCalendarPairEl from '@modules/hooks/useCalendarEl/useCalendarPairEl';
import {Dash} from '@modules/hooks/useCalendarEl/useCalendarElStyle';
import useButtonEl from '@modules/hooks/useButtonEl';

const _SalesCompletionHistory = ({response, query}: {response: any; query: any}): ReactElement => {
  const [domReady, setDomReady] = useState(false);
  const [[start, end], [StartCalendar, EndCalendar], [setStart, setEnd]] = useCalendarPairEl(
    query?.start ? new Date(query?.start) : undefined,
    query?.end ? new Date(query?.end) : undefined
  );
  const [keyword, onChangeKeyword, setKeyword] = useInput(query?.keyword);
  const [sort, setSort] = useState(query?.sort || 'PURCHASE_DATE');
  const [direction, setDirection] = useState(query?.direction || 'ASC');
  const [data, setData] = useState<any>(response?.getSaleCompletedList?.data?.results);
  const router = useRouter();
  const [pagesAmount, setPagesAmount] = useState<number>(1);
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const [saleCompleteBtns, setSaleCompleteBtns] = useState<any>();
  const [salePopup, setSalePopup] = useState<PopupType>(undefined);
  const [requestSaledDate, setRequestSaledDate] = useState<string>('');
  const [saledId, setSaledId] = useState<number>();
  const [status, setStatus] = useState<any[]>([]);
  const [saledToastSuccess, setSaledToastSuccess] = useState<string>();
  const [saledToastError, setSaledToastError] = useState<string>();
  const [sale, setSale] = useState<number>(0);
  const [saleLoading, setSaleLoading] = useState(false);
  const saleCompletedListQuery: IQuery = {
    response,
    value: {keyword, start, end, sort, direction},
    api: getSaleCompletedListApi
  };
  const [res, runSaleCompletedListApi, Pagination, useQueryOptions] = useQuery(saleCompletedListQuery, pagesAmount);
  const [setErrPopup, ErrPopup] = usePopup();
  const SearchButton = useButtonEl('검색');
  const TotalSearchButton = useButtonEl('전체 조회');

  const submitByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') runSaleCompletedListApi();
  };

  useEffect(() => {
    setDomReady(true);
  }, []);

  useEffect(() => {
    runSaleCompletedListApi();
  }, [sort, direction]);

  useEffect(() => {
    domReady && setDirection('ASC');
  }, [sort]);

  useEffect(() => {
    res?.getSaleCompletedList && res?.getSaleCompletedList?.data && res?.getSaleCompletedList?.data?.results ? setData(res.getSaleCompletedList.data.results) : setData([]);
    res?.getSaleCompletedList && res?.getSaleCompletedList?.data && res?.getSaleCompletedList?.data?.totalPages
      ? setPagesAmount(res.getSaleCompletedList.data.totalPages)
      : setPagesAmount(1);
    res?.getSaleCompletedList && res?.getSaleCompletedList?.data && res?.getSaleCompletedList?.status && setStatus(res.getSaleCompletedList.status);
    res?.errors && setErrPopup(res?.errors[0].message);
  }, [res]);

  useEffect(() => {
    clickedIndex >= 0 && router.push(`/vehicle-management/sales-completion/detail-vehicle?id=${data[clickedIndex].id}&vehicleId=${data[clickedIndex].jatoVehicleId}`);
  }, [clickedIndex]);

  useEffect(() => {
    const arrTemp: any = [];

    data &&
      data.forEach((data: any) => {
        const isOutPlatform = data.status.includes('OUT');
        arrTemp.push({
          saleable: (
            <Button
              type="white"
              className={isOutPlatform ? 'writable-button' : 'unwritable-button'}
              width="91px"
              height="36px"
              onClick={() => {
                isOutPlatform ? setSalePopup(<SaledPopup data={data} />) : null;
              }}
            >
              {data.salePrice ? '판매가 수정' : '판매가 입력'}
            </Button>
          )
        });
      });
    setSaleCompleteBtns(arrTemp);
  }, [data]);

  const saleCompleted = async (id: number, saleDate: string, sale: number) => {
    setSaleLoading(true);
    const response = await saleCompletedApi({id, saleDate, sale});
    setSaleLoading(false);
    response && response.saleCompleted && runSaleCompletedListApi();
    setSalePopup(undefined);
    response && response.saleCompleted
      ? setSaledToastSuccess('판매가가 정상적으로 입력되었습니다')
      : response && response.response && response.response.errors[0] && setSaledToastError(response.response.errors[0].message);
  };

  const SaledPopup = useCallback(({data}: {data: any}) => {
    const [saledDate, setSaledDate] = useState<Date>(new Date(data.saleDate));
    const [salePrice, onChangeSalePrice] = useInput(data.salePrice, 'number');
    useEffect(() => {
      data && setSaledId(data.id);
      data && setRequestSaledDate(formattedDate(saledDate));
    }, [saledDate]);
    useEffect(() => {
      setSale(Number(salePrice));
    }, [salePrice]);
    return (
      <Wrapper>
        <Wrapper>
          <Wrapper ml="3px">
            <Text type="sectionSubTitle">{`${data?.modelYear || '-'} ${data?.manufacturer || '-'} ${data?.modelName || '-'} (${data?.number || '-'})`}</Text>
            <Wrapper flex>
              <Text type="sectionInfo" color={`${theme.color.main} !important`}>
                판매일을 선택해주세요.
              </Text>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        <Wrapper mt="10px" column width="100%" height="495px">
          <Input type="calendar" placeholder="판매일" date={saledDate} setDate={setSaledDate} className="saled-calendar" open />
        </Wrapper>
        <Wrapper mt="10px" column width="100%">
          <Text ml={'7px'} color={'#999999 !important'}>
            판매금액
          </Text>
          <Wrapper mt={'4px'}>
            <InputUnit unit="만원" height="50px" width="100%" right value={getCommas(salePrice)} onChange={onChangeSalePrice} />
          </Wrapper>
        </Wrapper>
      </Wrapper>
    );
  }, []);

  return (
    <_Section padding="30px 36px" border="1px solid #cccccc">
      <Wrapper>
        <Txt type="medium" fontSize="24px" style={{letterSpacing: '-1px'}}>
          판매 완료 내역
        </Txt>
        <Wrapper mt={30} flex>
          <Input
            value={keyword}
            onChange={onChangeKeyword}
            version="b"
            whcbr={[235, 42, 'transparent', '1px solid #d8d8d8', 2]}
            placeholder="차량번호 모델"
            mr={20}
            maxLength={20}
            onKeyPress={submitByEnter}
          />
          <Wrapper flex h>
            <StartCalendar placeholder="판매 완료 기간" />
            <Dash />
            <EndCalendar placeholder="판매 완료 기간" />
          </Wrapper>
          <Wrapper flex ml="20px">
            <SearchButton whcbr={[120, 42, '#0073e8', 'none', 2]} onClick={runSaleCompletedListApi} loading={useQueryOptions?.loading} />
            <TotalSearchButton
              whcbr={[120, 42, 'white', '1px solid #0073e8', 2]}
              style={{color: '#0073e8'}}
              loading={useQueryOptions?.loading}
              onClick={() =>
                useQueryOptions &&
                useQueryOptions.resetPage &&
                useQueryOptions.resetPage([
                  () => setKeyword(undefined),
                  () => setStart(undefined),
                  () => setEnd(undefined),
                  () => setSort('PURCHASE_DATE'),
                  () => setDirection('ASC')
                ])
              }
              ml={10}
            />
          </Wrapper>
        </Wrapper>
        <Wrapper mt={30} height={25} h flex>
          <Wrapper flex>
            <Image src="/images/ic-description-24-px.svg" mr="10px" />
            {[
              ['카머스판매', status[status.findIndex((el: any) => el.status === 'SALE_COMPLETED')]?.count.toString() ?? '0'],
              ['외부판매', status[status.findIndex((el: any) => el.status === 'SALE_COMPLETED_OUT_PLATFORM')]?.count.toString() ?? '0']
            ].map((elem: string[], index: number) => (
              <Fragment key={index}>
                <Wrapper flex>
                  {index !== 0 && <Line vertical mr="10px" />}
                  <Wrapper mr="10px" flex>
                    <Text color={theme.color.darkgray} mr="5px">
                      {elem[0]}
                    </Text>
                    <Text color={theme.color.main} weight="5">
                      {elem[1]}
                    </Text>
                  </Wrapper>
                </Wrapper>
              </Fragment>
            ))}
          </Wrapper>
          <Wrapper>
            <Text type="sectionInfo" color="#ff6f6f !important">
              안내) 외부판매 차량은 반드시 판매일과 금액을 입력해야 합니다.
            </Text>
          </Wrapper>
        </Wrapper>
      </Wrapper>
      <Wrapper mt="15px" height="668px">
        {data && data.length !== 0 ? (
          <Wrapper flex>
            <Table
              data={[data, dataOptions]}
              sort={sort}
              setSort={setSort}
              direction={direction}
              setDirection={setDirection}
              setClickedIndex={setClickedIndex}
              heightFix={643}
              className="main-table"
            />
            <Wrapper ml="2px" width="121px">
              <Table data={[saleCompleteBtns, saleCompleteBtnsOption]} heightFix={668} className="sub-table" />
            </Wrapper>
          </Wrapper>
        ) : (
          <Wrapper w h height="100%">
            <Text type="listZero">판매가 완료된 차량이 없습니다</Text>
          </Wrapper>
        )}
      </Wrapper>
      <Wrapper w pt={25} pb={80}>
        <Pagination />
      </Wrapper>
      <Popup
        content={salePopup}
        setContent={setSalePopup}
        width="410px"
        height="788px"
        cancelText="취소"
        okText="저장"
        onClickPopupEnter={() => saledId && saleCompleted(saledId, requestSaledDate, sale)}
        loading={saleLoading}
      />
      <Toast toast={saledToastSuccess} setToast={setSaledToastSuccess} />
      <Toast type="error" toast={saledToastError} setToast={setSaledToastError} />
      <ErrPopup title="오류" onClickPopupEnter={() => setErrPopup(undefined)} okText="확인" cancelText="닫기" />
    </_Section>
  );
};

export default _SalesCompletionHistory;

const dataOptions: ITableDataOptions[] = [
  {
    dataKey: 'number',
    dataName: '차량번호',
    options: {
      width: '120px'
    }
  },
  {
    dataKey: 'manufacturer',
    dataName: '브랜드',
    options: {
      width: '120px',
      sort: 'BRAND'
    }
  },
  {
    dataKey: 'modelYear',
    dataName: '연형',
    options: {
      sort: 'YEAR',
      width: '120px'
    }
  },
  {
    dataKey: 'modelName',
    dataName: '모델명',
    options: {
      sort: 'MODEL',
      width: '150px'
    }
  },
  {
    dataKey: 'modelTrim',
    dataName: '트림명',
    options: {
      width: '300px'
    }
  },
  {
    dataKey: 'status',
    dataName: '판매처',
    options: {
      width: '120px',
      formatter: (val: string) => (val && val.includes('OUT') ? '외부판매' : '카머스판매')
    }
  },
  {
    dataKey: 'purchaseDate',
    dataName: '매입일',
    options: {
      sort: 'PURCHASE_DATE',
      width: '120px',
      formatter(val: string) {
        return val ? val.substring(0, 10) : '-';
      }
    }
  },
  {
    dataKey: 'saleDate',
    dataName: '매도일',
    options: {
      sort: 'SALE_DATE',
      width: '120px',
      formatter(val: string) {
        return val ? val.substring(0, 10) : '-';
      }
    }
  },
  {
    dataKey: 'getProfitAndLoss',
    dataName: '손익',
    options: {
      width: '130px',
      formatter(val: string) {
        return val ? `${getCommas(val)}만원` : '-';
      }
    }
  },
  {
    dataKey: 'salePrice',
    dataName: '판매가',
    options: {
      sort: 'SALE',
      width: '120px',
      formatter(val: string) {
        return val ? `${getCommas(val)}만원` : '-';
      }
    }
  },
  {
    dataKey: 'totalLossCost',
    dataName: '총비용',
    options: {
      width: '130px',
      formatter(val: string) {
        return val ? `${getCommas(val)}만원` : '-';
      }
    }
  }
];
const saleCompleteBtnsOption = [
  {
    dataKey: 'saleable',
    dataName: '판매가 입력',
    options: {
      width: '120px'
    }
  }
];

const _Section = styled(Section)`
  .total-search-button,
  .writable-button {
    border-color: ${theme.color.main};
    color: ${theme.color.main};
    div {
      color: ${theme.color.main};
    }
  }
  .main-table {
    width: 100%;
  }
  .unwritable-button {
    color: ${theme.color.lineGray};
    border-color: ${theme.color.lineGray};
    cursor: not-allowed;
    &:hover {
      background: none;
    }
  }
  .saled-calendar {
    .react-datepicker-popper {
      transform: translate(36px, 82px) !important;
    }
    input {
      background-color: ${theme.color.white};
    }
  }
  .sub-table {
    td {
      padding: 0;
    }
  }
`;
