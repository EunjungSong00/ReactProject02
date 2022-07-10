import {useCallback, useState, useEffect, ReactElement, Dispatch, SetStateAction} from 'react';
import {getQueryFromJSON, getQueryFromUrl} from '@modules/replaceStrings';
import {useRouter} from 'next/router';
import Pagination from './Pagination';

type ReturnTypes = [any, () => void, (setState: Dispatch<SetStateAction<any>>[] | Dispatch<any>[]) => void, () => ReactElement];
export interface IQueries {
  response: any;
  value: any;
  api: any;
}
export interface IQueriesPagination {
  pageNo: number;
  setPageNo: Dispatch<SetStateAction<number>>;
  pagesAmount: number;
}

const useQueries = ({response, value, api}: IQueries, pagination?: IQueriesPagination): ReturnTypes => {
  const router = useRouter();
  const [res, setRes] = useState<any>(response);
  const [domReady, setDomReady] = useState(false);
  const [isResetPage, setIsResetPage] = useState(false);
  const pageNo = pagination?.pageNo;
  const setPageNo = pagination?.setPageNo;
  const pagesAmount = pagination?.pagesAmount;

  useEffect(() => {
    setDomReady(true);
  }, []);

  useEffect(() => {
    setPageNo && setPageNo(Number(getQueryFromUrl(router.asPath, 'pageNo')) || 1);
  }, [getQueryFromUrl(router.asPath, 'pageNo')]);

  useEffect(() => {
    domReady && runApi(true);
  }, [pageNo]);

  useEffect(() => {
    isResetPage && runApi();
    isResetPage && setIsResetPage(false);
  }, [isResetPage]);

  // 조회 버튼 동작 함수
  const runApi = useCallback(
    async (pagination?: boolean) => {
      if (domReady) {
        if (pagination) {
          const pushToQuery = getQueryFromJSON(router.asPath, Object.assign(value, {pageNo}));
          const pushToUrl = `${router.pathname}${pushToQuery ? `?${pushToQuery}` : ''}`;
          router.replace(pushToUrl, undefined, {shallow: true});
          setRes(await api());
        } else {
          const pushToQuery = getQueryFromJSON(router.asPath, value);
          const pushToUrl = `${router.pathname}${pushToQuery ? `?${pushToQuery}` : ''}`.replace(`pageNo=${getQueryFromUrl(router.asPath, 'pageNo')}`, 'pageNo=1');
          router.replace(pushToUrl, undefined, {shallow: true});
          (!pageNo || pageNo === 1) && setRes(await api());
        }
      }
    },
    [domReady, router, value, api]
  );

  // 초기화 버튼 동작 함수
  const resetPage = useCallback((setState: Dispatch<SetStateAction<any>>[] | Dispatch<any>[]) => {
    setState.map((el: any) => el(undefined));
    setIsResetPage(true);
  }, []);

  const PaginationEl = useCallback(
    (): ReactElement => (pageNo && setPageNo && pagesAmount ? <Pagination pagesAmount={pagesAmount || 0} paginationName="pageNo" page={pageNo} setPage={setPageNo} /> : <></>),
    [pagesAmount, pageNo, setPageNo]
  );

  return [res, runApi, resetPage, PaginationEl];
};

export default useQueries;
