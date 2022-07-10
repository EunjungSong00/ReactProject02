import {Image, Input, Txt, Wrapper} from '@components/atoms';
import theme, {medium, primary} from '@public/theme';
import styled from '@emotion/styled';
import {Section} from '@components/molecules';
import useInput from '@modules/hooks/useInput';
import {useState, useEffect, ReactElement, useCallback} from 'react';
import Table, {ITableDataOptions} from '@components/organisms/Table';
import {useRouter} from 'next/router';
import {getCommas, replaceOrderStatus, replaceSettlementStatus} from '@modules/replaceStrings';
import useQuery, {IQuery} from '@modules/hooks/useQuery';
import getPartnerOrderListApi, {PartnerOrderListType} from '@api/order/getPartnerOrderListApi';
import {GetServerSideProps} from 'next';
import {EasyVehicleRegistration} from '@components/organisms';
import usePopup from '@modules/hooks/usePopup';
import useCalendarPairEl from '@modules/hooks/useCalendarEl/useCalendarPairEl';
import {Dash} from '@modules/hooks/useCalendarEl/useCalendarElStyle';
import useButtonEl from '@modules/hooks/useButtonEl';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context?.query;
  const queries: PartnerOrderListType = {
    pageNo: Number(query.pageNo) || 0,
    pageSize: Number(query.pageSize) || 0,
    keyword: query.keyword?.toString(),
    // sort: query.sort?.toString(),
    // direction: query.direction?.toString(),
    startDate: query.startDate?.toString(),
    endDate: query.endDate?.toString()
  };
  const response = await getPartnerOrderListApi(queries, context);
  // console.log('response', response);
  return response;
};

const OrderManagement = ({pageProps}: {pageProps: any}): ReactElement => {
  const query = pageProps?.query;
  const response = pageProps?.response;
  const [keyword, onChangeKeyword] = useInput(query?.keyword);
  const [[startDate, endDate], [StartDateCalendar, EndDateCalendar]] = useCalendarPairEl(
    query?.startDate ? new Date(query?.startDate) : undefined,
    query?.endDate ? new Date(query?.endDate) : undefined
  );
  // const [sort, setSort] = useState(query?.sort || 'PURCHASE_DATE');
  // const [direction, setDirection] = useState(query?.direction || 'ASC');
  const [data, setData] = useState<any>([]);
  const router = useRouter();
  const [total, setTotal] = useState<number>(0);
  const [pagesAmount, setPagesAmount] = useState<number>(1);
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const [status, setStatus] = useState<any[]>([]);
  const partnerOrderListQuery: IQuery = {
    response,
    // value: {keyword, start, end, sort, direction},
    value: {keyword, startDate, endDate},
    api: getPartnerOrderListApi
  };
  const [res, runPartnerOrderList, Pagination, useQueryOptions] = useQuery(partnerOrderListQuery, pagesAmount);
  const SearchButton = useButtonEl('검색');
  const [setErrPopup, ErrPopup] = usePopup();

  const submitByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') runPartnerOrderList();
  };

  // useEffect(() => {
  //   runPartnerOrderList();
  // }, [sort, direction]);

  // useEffect(() => {
  //   domReady && setDirection('ASC');
  // }, [sort]);

  useEffect(() => {
    // console.log('res', res);
    const parsedData: any[] =
      res?.getPartnerOrderList &&
      res?.getPartnerOrderList?.data &&
      res?.getPartnerOrderList?.data?.results &&
      res.getPartnerOrderList.data.results.map((el: any) => Object.assign(el, {index: {vehicleNumber: el.vehicleNumber, imageList: el.imageList}}));
    parsedData ? setData(parsedData) : setData([]);
    res?.getPartnerOrderList && res?.getPartnerOrderList?.data && res?.getPartnerOrderList?.data?.totalPages
      ? setPagesAmount(res.getPartnerOrderList.data.totalPages)
      : setPagesAmount(1);
    res?.getPartnerOrderList && res?.getPartnerOrderList?.status && setStatus(res.getPartnerOrderList.status);
    res?.getPartnerOrderList && res?.getPartnerOrderList?.data && res?.getPartnerOrderList?.data?.total && setTotal(res.getPartnerOrderList.data.total);
    res?.errors && setErrPopup(res?.errors[0].message);
  }, [res]);

  useEffect(() => {
    clickedIndex >= 0 && router.push(`/order-management/list/detail-order?id=${data[clickedIndex].id}`);
  }, [clickedIndex]);

  const StatusTable = useCallback(() => {
    const StatusElement = ({label, amount}: {label: string; amount: number}) => (
      <Wrapper flex width="20%">
        <Txt type="regular" pr="8px" fontSize="13px" color="#666666">
          {label || ''}
        </Txt>
        <Txt type="regular" fontSize="13px" color="#fd3636">
          {amount ? getCommas(amount) : 0}
        </Txt>
      </Wrapper>
    );
    const getStatusAmount = (statusLabel: string | number) => status[status.findIndex((el: any) => el.status === statusLabel)]?.count.toString() ?? '0';
    return (
      <Wrapper between w h column height="111px" mt={15} width="100%" background="#f9fafa" border="1px solid #d8d8d8" padding="20px">
        <Wrapper width="100%">
          <StatusElement label="전체" amount={total} />
        </Wrapper>
        <Wrapper width="100%" flex>
          <StatusElement label="주문접수" amount={getStatusAmount('ORDER_REGISTERED')} />
          <StatusElement label="탁송중" amount={getStatusAmount('IN_DELIVERY')} />
          <StatusElement label="탁송완료" amount={getStatusAmount('DELIVERY_COMPLETED')} />
          <StatusElement label="구매확정" amount={getStatusAmount('PURCHASE_CONFIRMED')} />
          <StatusElement label="주문완료" amount={getStatusAmount('ORDER_COMPLETED')} />
        </Wrapper>
        <Wrapper width="100%" flex>
          <StatusElement label="변심/취소 환불요청" amount={getStatusAmount('REFUND_REQUESTED')} />
          <StatusElement label="불량/취소 환불요청" amount={getStatusAmount('DEFECT_REFUND_REQUESTED')} />
          <StatusElement label="반납중" amount={getStatusAmount('IN_RETURN_DELIVERY')} />
          <StatusElement label="반납완료" amount={getStatusAmount('RETURN_DELIVERY_COMPLETED')} />
          <StatusElement label="환불/취소완료" amount={getStatusAmount('CHANGE_MIND_REFUND_COMPLETED')} />
        </Wrapper>
      </Wrapper>
    );
  }, [status, total]);

  return (
    <>
      <EasyVehicleRegistration />
      <_Section padding="30px 36px" border="1px solid #cccccc">
        <Txt type="medium" fontSize="24px" style={{letterSpacing: '-1px'}}>
          주문 관리
        </Txt>
        <Txt type="regular" mt="14px" color="#555555" size="13px">
          검색어 입력없이 기간설정만으로 검색이 가능합니다.
        </Txt>
        <Wrapper mt={15} flex>
          <Input
            version="b"
            whcbr={[300, 42, 'transparent', '1px solid #d8d8d8', 2]}
            mr="10px"
            value={keyword}
            onChange={onChangeKeyword}
            placeholder="차량번호, 모델명 또는 주문번호로 검색하세요."
            onKeyPress={submitByEnter}
          />
          <Wrapper flex h>
            <StartDateCalendar placeholder="주문 일자" width="170px" />
            <Dash />
            <EndDateCalendar placeholder="주문 일자" width="170px" />
          </Wrapper>
          <SearchButton whcbr={[medium, primary]} ml="10px" onClick={runPartnerOrderList} loading={useQueryOptions.loading} />
        </Wrapper>
        <StatusTable />
        <Wrapper height="668px" mt="25px">
          <Wrapper flex width="100%">
            <Table
              data={[data, dataOptions]}
              // sort={sort}
              // setSort={setSort}
              // direction={direction}
              // setDirection={setDirection}
              setClickedIndex={setClickedIndex}
              heightFix={643}
              className="main-table"
            />
          </Wrapper>
        </Wrapper>
        <Wrapper w pt={25} pb={80}>
          <Pagination />
        </Wrapper>
        <ErrPopup title="오류" onClickPopupEnter={() => setErrPopup(undefined)} okText="확인" cancelText="닫기" />
      </_Section>
    </>
  );
};

export default OrderManagement;

const dataOptions: ITableDataOptions[] = [
  {
    dataKey: 'orderNumber',
    dataName: '주문번호',
    options: {
      width: '100px'
    }
  },
  {
    dataKey: 'index',
    dataName: '차량',
    options: {
      width: '170px',
      formatter: (val: any) => (
        <Wrapper flex>
          <Wrapper width="50%" w h>
            <Image src={val?.imageList[0]?.name} width={50} height={40} style={{borderRadius: 5, border: '1px solid #f5f6f9'}} />
          </Wrapper>
          <Wrapper width="50%" w h>
            <Wrapper>{val?.vehicleNumber}</Wrapper>
          </Wrapper>
        </Wrapper>
      )
    }
  },
  {
    dataKey: 'orderDate',
    dataName: '주문일',
    options: {
      width: '100px',
      formatter: (val: string) => val && val.substring(0, 10)
    }
  },
  {
    dataKey: 'manufacturer',
    dataName: '브랜드',
    options: {
      width: '100px'
    }
  },
  {
    dataKey: 'modelYear',
    dataName: '연형',
    options: {
      width: '70px'
    }
  },
  {
    dataKey: 'modelName',
    dataName: '모델명',
    options: {
      width: '90px'
    }
  },
  {
    dataKey: 'modelTrim',
    dataName: '트림명',
    options: {
      width: '180px'
    }
  },
  {
    dataKey: 'salePrice',
    dataName: '판매가',
    options: {
      width: '100px',
      formatter: (val: number) => val && `${getCommas(val)}만원`
    }
  },
  {
    dataKey: 'orderStatus',
    dataName: '주문상태',
    options: {
      width: '100px',
      formatter: (val: string) => replaceOrderStatus(val)
    }
  },
  {
    dataKey: 'settlementStatus',
    dataName: '정산상태',
    options: {
      width: '100px',
      formatter: (val: string) => replaceSettlementStatus(val)
    }
  },
  {
    dataKey: 'consignmentStatus',
    dataName: '탁송상태',
    options: {
      width: '100px'
    }
  }
];

// const testData: any[] = [
//   {
//     orderDate: '2022-01-17T11:21:34.717100',
//     orderNumber: '1234567890',
//     vehicleNumber: '12차3456',
//     manufacturer: '쉐보레(대우)',
//     modelYear: 2022,
//     modelName: '볼트 EV',
//     modelTrim: '1.6 E-XDi 기어 에디션 A/T',
//     salePrice: 2000,
//     orderStatus: 'ORDER_REGISTERED',
//     settlementStatus: 'SETTLEMENT_WAITING',
//     consignmentStatus: ''
//   },
//   {
//     orderDate: '2022-01-17T11:21:34.717100',
//     orderNumber: '1234567890',
//     vehicleNumber: '12차3456',
//     manufacturer: '쉐보레(대우)',
//     modelYear: 2022,
//     modelName: '볼트 EV',
//     modelTrim: '1.6 E-XDi 기어 에디션 A/T',
//     salePrice: 2000,
//     orderStatus: 'ORDER_REGISTERED',
//     settlementStatus: 'SETTLEMENT_WAITING',
//     consignmentStatus: ''
//   },
//   {
//     orderDate: '2022-01-17T11:21:34.717100',
//     orderNumber: '1234567890',
//     vehicleNumber: '12차3456',
//     manufacturer: '쉐보레(대우)',
//     modelYear: 2022,
//     modelName: '볼트 EV',
//     modelTrim: '1.6 E-XDi 기어 에디션 A/T',
//     salePrice: 2000,
//     orderStatus: 'ORDER_REGISTERED',
//     settlementStatus: 'SETTLEMENT_WAITING',
//     consignmentStatus: ''
//   },
//   {
//     orderDate: '2022-01-17T11:21:34.717100',
//     orderNumber: '1234567890',
//     vehicleNumber: '12차3456',
//     manufacturer: '쉐보레(대우)',
//     modelYear: 2022,
//     modelName: '볼트 EV',
//     modelTrim: '1.6 E-XDi 기어 에디션 A/T',
//     salePrice: 2000,
//     orderStatus: 'ORDER_REGISTERED',
//     settlementStatus: 'SETTLEMENT_WAITING',
//     consignmentStatus: ''
//   }
// ];

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
