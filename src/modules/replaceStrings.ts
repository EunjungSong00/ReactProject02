import nookies from 'nookies';
import moment from 'moment';
import {GetServerSidePropsContext} from 'next';
import {ParsedUrlQuery} from 'querystring';
import graphQLClientRequest from '@api/graphQLClientRequest';
import {dealersAssociationTypeArr} from '@public/selectArr';
import {ReactText} from 'react';

export const onReplaceAppearanceType = (appearanceType: 'COUPE' | 'HATCH_BAG' | 'PICK_UP' | 'RV' | 'SEDAN' | 'SUV') => {
  switch (appearanceType) {
    case 'COUPE':
      return '쿠페';
    case 'HATCH_BAG':
      return '해치백';
    case 'PICK_UP':
      return '픽업트럭';
    case 'RV':
      return 'RV';
    case 'SEDAN':
      return '세단';
    case 'SUV':
      return 'SUV';
    default:
      return '-';
  }
};
export const onReplaceFuelTypeA = (
  fuel: 'D' | 'E' | 'F' | 'G' | 'H' | 'N' | 'P' | 'U'
): '디젤' | '일렉트릭' | 'E85' | 'LPG' | '수소' | '천연 가스' | '고급 가솔린' | '가솔린' | '' => {
  switch (fuel) {
    case 'D':
      return '디젤';
    case 'E':
      return '일렉트릭';
    case 'F':
      return 'E85';
    case 'G':
      return 'LPG';
    case 'H':
      return '수소';
    case 'N':
      return '천연 가스';
    case 'P':
      return '고급 가솔린';
    case 'U':
      return '가솔린';
    default:
      return '';
  }
};
export const onReplaceTransmissionType = (transmission: 'A' | 'M'): '자동' | '수동' | '' => {
  switch (transmission) {
    case 'A':
      return '자동';
    case 'M':
      return '수동';
    default:
      return '';
  }
};
export const onReplaceDrivenWheels = (drivenWheels: 'F' | 'R' | '4'): '전륜' | '후륜' | '4륜' | '' => {
  switch (drivenWheels) {
    case 'F':
      return '전륜';
    case 'R':
      return '후륜';
    case '4':
      return '4륜';
    default:
      return '';
  }
};
export const getVehicleStatus = (status: 'REGISTER' | 'SALE' | 'PAYMENT_PROGRESS' | 'SALE_HOLD'): '등록중' | '판매중' | '결제진행중' | '판매보류' | '-' => {
  switch (status) {
    case 'REGISTER':
      return '등록중';
    case 'SALE':
      return '판매중';
    case 'PAYMENT_PROGRESS':
      return '결제진행중';
    case 'SALE_HOLD':
      return '판매보류';
    default:
      return '-';
  }
};

export const getCommas = (val: string | number): string => (val ? val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '');
// getKrCommas(1003030)
export const getKrCommas = (val: string | number): string =>
  Number(val) < 0
    ? `-${getCommas(
        -Number(val) > 0 && -Number(val) < 10000
          ? '0만원'
          : -Number(val) >= 10000 && -Number(val) < 100000000
          ? `${Math.ceil(-Number(val) / 10000).toString()}만원`
          : -Number(val) >= 100000000
          ? `${Math.floor(-Number(val) / 100000000).toString()}억 ${Math.floor((-Number(val) - 100000000 * Math.floor(-Number(val) / 100000000)) / 10000).toString()}만원`
          : `${-Number(val).toString()}만원`
      )}`
    : getCommas(
        Number(val) > 0 && Number(val) < 10000
          ? '0만원'
          : Number(val) >= 10000 && Number(val) < 100000000
          ? `${Math.ceil(Number(val) / 10000).toString()}만원`
          : Number(val) >= 100000000
          ? `${Math.floor(Number(val) / 100000000).toString()}억 ${Math.floor((Number(val) - 100000000 * Math.floor(Number(val) / 100000000)) / 10000).toString()}만원`
          : `${Number(val).toString()}만원`
      );

export const formattedDate = (date: Date | undefined): string => (date ? new Date(date.setHours(9)).toISOString().substring(0, 10) : '');

export const formatYYYYMMDD = (date: string): string => (date && date.length === 8 ? date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3') : '');

export const convertColumnsToOption = (visibledColumns: string[]): any => {
  const dataOptions: any[] = [
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
      dataKey: 'createdDate',
      dataName: '등록일',
      options: {
        sort: 'CREATE_DATE',
        width: '120px',
        formatter(val?: string) {
          return val ? val.slice(0, 10) : '-';
        }
      }
    },
    {
      dataKey: 'partner',
      dataName: '담당딜러',
      options: {
        width: '100px',
        formatter(val?: string) {
          return val ? val.slice(0, 10) : '-';
        }
      }
    }
  ];

  visibledColumns &&
    Array.isArray(visibledColumns) &&
    visibledColumns.map((visibledColumn: string) => {
      visibledColumn === 'modelTrim' &&
        dataOptions.push({
          dataKey: visibledColumn,
          dataName: '트림명',
          options: {
            width: '300px'
          }
        });
      visibledColumn === 'mileage' &&
        dataOptions.push({
          dataKey: visibledColumn,
          dataName: '주행거리',
          options: {
            width: '100px',
            formatter(val: string) {
              return val ? `${getCommas(val)}km` : '-';
            }
          }
        });
      visibledColumn === 'salePrice' &&
        dataOptions.push({
          dataKey: visibledColumn,
          dataName: '판매가',
          options: {
            sort: 'SALE',
            width: '120px',
            formatter(val: string) {
              return val ? `${getCommas(val)}만원` : '-';
            }
          }
        });
      visibledColumn === 'parkingLocation' &&
        dataOptions.push({
          dataKey: `${visibledColumn}`,
          dataName: '주차위치',
          options: {
            width: '100px',
            formatter(val?: string) {
              return val ? (val.length > 20 ? `${val.slice(0, 20)}...` : val) : '-';
            }
          }
        });
      visibledColumn === 'appearanceType' &&
        dataOptions.push({
          dataKey: visibledColumn,
          dataName: '외형',
          options: {
            width: '100px'
          }
        });
    });
  return dataOptions;
};

export const replaceVehicleColumns = (keyName: string): string => {
  switch (keyName) {
    case 'modelTrim':
      return '트림명';
    case 'mileage':
      return '주행거리';
    case 'salePrice':
      return '판매가';
    case 'parkingLocation':
      return '주차위치';
    case 'appearanceType':
      return '외형';
    default:
      return '-';
  }
};

export const replaceOrderStatus = (status: string): string => {
  switch (status) {
    case 'ORDER_REGISTERED':
      return '주문접수';
    case 'IN_DELIVERY':
      return '탁송중';
    case 'DELIVERY_COMPLETED':
      return '탁송완료';
    case 'PURCHASE_CONFIRMED':
      return '구매확정';
    case 'ORDER_COMPLETED':
      return '주문완료';
    case 'REFUND_REQUESTED':
      return '변심/취소 환불요청';
    case 'DEFECT_REFUND_REQUESTED':
      return '불량/취소 환불요청';
    case 'IN_RETURN_DELIVERY':
      return '반납중';
    case 'RETURN_DELIVERY_COMPLETED':
      return '반납완료';
    case 'CHANGE_MIND_REFUND_COMPLETED':
      return '환불/취소완료';
    default:
      return '-';
  }
};

export const replaceSettlementStatus = (status: string): string => {
  switch (status) {
    case 'SETTLEMENT_WAITING':
      return '정산대기';
    case 'SETTLEMENT_IN_PROGRESS':
      return '정산중';
    case 'SETTLEMENT_COMPLETED':
      return '정산완료';
    case 'FEE_SETTLEMENT_WAITING':
      return '이용료 정산대기';
    case 'FEE_SETTLEMENT_COMPLETED':
      return '이용료 정산완료';
    case 'SETTLEMENT_CANCELED':
      return '정산취소';
    default:
      return '-';
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getOnlyNumber = (e: React.ChangeEvent<HTMLInputElement> | string, commas?: boolean) => {
  if (typeof e === 'string' || typeof e === 'number') {
    const value = String(e);
    const onlyNumber = value.replace(/[^0-9]/g, '').replace(/(^0+)/, '');
    return commas ? getCommas(onlyNumber) : onlyNumber;
  }

  const {value} = e.target;
  const onlyNumber = value.replace(/[^0-9]/g, '').replace(/(^0+)/, '');
  return commas ? getCommas(onlyNumber) : onlyNumber;
};

export const getOnlyTextNumber = (e: React.ChangeEvent<HTMLInputElement> | string, commas?: boolean) => {
  if (typeof e === 'string' || typeof e === 'number') {
    const value = String(e);
    const onlyNumber = value.replace(/[^0-9]/g, '');
    return commas ? getCommas(onlyNumber) : onlyNumber;
  }

  const {value} = e.target;
  const onlyNumber = value.replace(/[^0-9]/g, '');
  return commas ? getCommas(onlyNumber) : onlyNumber;
};

export const getOnlyNumberDot = (e: React.ChangeEvent<HTMLInputElement>): string => {
  const {value} = e.target;
  // const o = onlyNumber.replace(/^\d*[.]\d*$/, '');
  // const onlyNumber = value.replace(/[^0-9.]/g, '').replace(/(^0+)/, '');
  const onlyNumber = value
    .replace(/^([^.]*\.)|\.+/g, '$1')
    .replace(/[^\d.]+/g, '')
    .replace(/(^0+)/, '');
  return onlyNumber;
};

export const getDate = (_date: Date): string => {
  const date = moment(_date).format('YYYY-MM-DD');
  return date;
};

/* 법인번호 자동 하이픈 */
export const autoCorporationHypen = (num: string): string => {
  let companyNum = num.replace(/[^0-9]/g, '');
  companyNum = companyNum.substring(0, 13);
  let tempNum = '';
  if (companyNum.length < 7) {
    return companyNum;
  }
  tempNum += companyNum.substr(0, 6);
  tempNum += '-';
  tempNum += companyNum.substr(6, 7);
  return tempNum;
};

/* 사업자등록번호 자동 하이픈 */
export const autoCompanyHypen = (num: string): string => {
  let companyNum = num.replace(/[^0-9]/g, '');
  companyNum = companyNum.substring(0, 10);
  let tempNum = '';
  if (companyNum.length < 4) {
    return companyNum;
  }
  if (companyNum.length < 6) {
    tempNum += companyNum.substr(0, 3);
    tempNum += '-';
    tempNum += companyNum.substr(3, 2);
    return tempNum;
  }
  tempNum += companyNum.substr(0, 3);
  tempNum += '-';
  tempNum += companyNum.substr(3, 2);
  tempNum += '-';
  tempNum += companyNum.substr(5);
  return tempNum;
};

/* 딜러번호 자동 하이픈 */
export const autoDealerHypen = (num: string, type: any): string => {
  let dealerNum = num.replaceAll('-', '');
  const typeBool = type === dealersAssociationTypeArr[0].value; // 한국이면 true
  dealerNum = dealerNum.toUpperCase();
  let tempNum = '';
  if (typeBool) {
    // 한국일때
    dealerNum = dealerNum.substring(0, 10);
    if (dealerNum.length < 5) {
      return dealerNum;
    }
    if (dealerNum.length < 10) {
      tempNum += dealerNum.substr(0, 4);
      tempNum += '-';
      tempNum += dealerNum.substr(4);
    } else {
      tempNum += dealerNum.substr(0, 5);
      tempNum += '-';
      tempNum += dealerNum.substr(5);
    }
    return tempNum;
  }
  // 전국일때
  dealerNum = dealerNum.substring(0, 11);
  if (dealerNum.length < 3) {
    return dealerNum;
  }
  if (dealerNum.length < 6) {
    tempNum += dealerNum.substr(0, 2);
    tempNum += '-';
    tempNum += dealerNum.substr(2, 3);
    return tempNum;
  }
  tempNum += dealerNum.substr(0, 2);
  tempNum += '-';
  tempNum += dealerNum.substr(2, 3);
  tempNum += '-';
  tempNum += dealerNum.substr(5);
  return tempNum;
};

export const autoPhoneHypen = (num: string): string => {
  let val = num.replace(/[^0-9]/g, '');
  val = val.substring(0, 11);
  let tmp = '';
  if (val.length < 4) {
    return val;
  }
  if (val.length < 7) {
    tmp += val.substr(0, 3);
    tmp += '-';
    tmp += val.substr(3);
    return tmp;
  }
  if (val.length < 11) {
    tmp += val.substr(0, 3);
    tmp += '-';
    tmp += val.substr(3, 3);
    tmp += '-';
    tmp += val.substr(6);
    return tmp;
  }
  tmp += val.substr(0, 3);
  tmp += '-';
  tmp += val.substr(3, 4);
  tmp += '-';
  tmp += val.substr(7);
  return tmp;
};

// 궁금한 query값을 url에서 알아보자.
// export const getQueryFromUrl = (fullUrl: string, query: string): string => console.info('fullUrl', fullUrl);//new URL(fullUrl).searchParams.get(query) || '';
export const getQueryFromUrl = (asPath: string, query: string): string =>
  asPath.includes('?')
    ? asPath
        ?.split('?')[1]
        ?.split('&')
        ?.filter((el: string) => el.includes(query))[0]
        ?.split('=')[1]
    : '';

export const getCurrentPage = (router: any): number => (getQueryFromUrl(router.asPath, 'pageNo') ? Number(getQueryFromUrl(router.asPath, 'pageNo')) : 1);

export const getUpdatedQueryValue = (asPath: string, queryKey: string, queryValue: string): string =>
  asPath.includes('?') ? `${asPath.split('?')[1].replace(`${queryKey}=${getQueryFromUrl(asPath, queryKey)}`, `${queryKey}=${queryValue}`)}` : '';

// JSON으로부터 url query를 받아내는 함수
export const getQueryFromJSON = (asPath: string, obj: any): string => {
  let formattedQuery = '';
  if (obj) {
    const query = asPath.includes('?') ? asPath.split('?')[1] : '';

    // 'a=1&b=2'와 같은 쿼리를 {a:'1', b='2'}와 같은 JSON으로 변환해주는 line
    const originalQueryJSON = Object.fromEntries(new URLSearchParams(query));
    const pushToQueryJSON = Object.assign(originalQueryJSON, obj);
    const nullCheckedQuery: string = JSON.stringify(pushToQueryJSON, (key, value) => {
      if (value === '') {
        return undefined;
      }
      if (value && `${value}`.includes('00.000Z')) {
        // JSON.stringify()로 인해 타임존이 변경되기때문 https://handle.atlassian.net/browse/CARMERCE-431
        value = formattedDate(new Date(new Date(value).setHours(9)));
      }
      return value;
    });
    formattedQuery = nullCheckedQuery.replaceAll('"', '').replaceAll(':', '=').replaceAll('{', '').replaceAll('}', '').replaceAll(',', '&');
  }
  return formattedQuery;
};

export const getMomentFromString = (date: string): any => moment(new Date(date));

export const getParsedResponse = async (context: any, apiFunctions: Promise<any>[] | any): Promise<any> => {
  const results: any[] = await Promise.all(
    apiFunctions.map((apiFunction: any) =>
      apiFunction?.props?.response?.redirect?.destination === '/login' || apiFunction?.redirect?.destination === '/login' ? 'nonToken' : apiFunction?.props?.response
    )
  );
  return results.includes('nonToken')
    ? {redirect: {permanent: false, destination: '/login'}, props: {}}
    : {props: {response: results, query: context.query, cookies: nookies.get(context)}};
};

export const getRequestGqls = (gqls: string[]): string => {
  let parsedGql = '{';
  gqls.map((gql: string) => {
    parsedGql += gql
      .replace(/query\s*/, '')
      .replace(/{\s*/, '')
      .replace(/}\s*$/, '');
  });
  parsedGql = `${parsedGql}}`;
  // console.log('parsedGql', parsedGql);
  return parsedGql;
};

export const graphQLClientMultipleRequest = async (gqls: string[], context?: GetServerSidePropsContext<ParsedUrlQuery>): Promise<any> => {
  const response = await graphQLClientRequest(getRequestGqls(gqls), context);
  return response;
};

export const isDateForm = (dateString: string): boolean => RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/).test(dateString);

export const assumePixelOrNot = (val: ReactText): string => (typeof val === 'number' ? `${val}px` : `${val}`);

export const getAutoBorderRadiusSize = (height: number): number => {
  if (height < 43) return 2;
  if (height < 70) return 4;
  return 4;
};

export const exportThemeIntoWhcbr = (whcbr?: any[]): any => {
  const parsedWhcbr: any = [];
  whcbr && whcbr.forEach((el) => (Array.isArray(el) ? el.forEach((theme) => parsedWhcbr.push(theme)) : parsedWhcbr.push(el)));
  return parsedWhcbr;
};

export const filterVehicleSort = (num: string): string => {
  try {
    if (Number.isNaN(Number(num.slice(0, -5)))) return '차량 번호를 확인해주세요.';
    const numHead = Number(num.slice(0, -5));
    const isUnregisterable: boolean =
      (numHead >= 700 && numHead <= 799) || // 승합 - 비사업용, 대여사업용
      (numHead >= 70 && numHead <= 79) || // 승합 - 일반사업용
      (numHead >= 800 && numHead <= 979) || // 화물 - 비사업용
      (numHead >= 80 && numHead <= 97) || // 화물 - 일반사업용
      (numHead >= 980 && numHead <= 997) || // 특수 - 비사업용, 대여사업용
      numHead === 98 ||
      numHead === 99 || // 특수 - 일반사업용
      numHead === 998 ||
      numHead === 999; // 긴급 - 경찰차, 소방차

    return isUnregisterable ? '승합, 화물, 특수, 긴급차량 등록서비스 준비중입니다.' : '';
  } catch {
    return '차량 번호를 확인해주세요.';
  }
};
