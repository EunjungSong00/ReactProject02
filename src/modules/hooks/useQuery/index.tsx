import {useCallback, useState, useEffect, ReactElement, Dispatch, SetStateAction} from 'react';
import {getQueryFromJSON} from '@modules/replaceStrings';
import {useRouter} from 'next/router';
import Pagination from './Pagination';

type ReturnTypes = [any, () => void, () => ReactElement, UseQueryOptionsType];
export interface IQuery {
  response: any;
  value: any;
  api: any;
}

type UseQueryOptionsType = {
  loading?: boolean;
  resetPage?: (setState: (() => void)[]) => void;
  setRes?: Dispatch<SetStateAction<any>>;
  apiTrigger?: () => void;
  updateAsPath?: () => void;
};

const useQuery = ({response, value, api}: IQuery, pagesAmount?: number): ReturnTypes => {
  const router = useRouter();
  const asPath = router?.asPath;
  const query = asPath.includes('?') ? asPath.split('?')[1] : '';
  const [res, setRes] = useState<any>();
  const [domReady, setDomReady] = useState(false);
  const [isResetPage, setIsResetPage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setDomReady(true);
  }, []);

  useEffect(() => {
    if (isResetPage) {
      updateAsPath();
      setIsResetPage(false);
    }
  }, [isResetPage]);

  useEffect(() => {
    const queryJSON = Object.fromEntries(new URLSearchParams(query));
    const runApi = async () => {
      setLoading(true);
      const result = domReady ? await api(queryJSON) : response;
      setLoading(false);
      setRes(result);
    };
    runApi();
  }, [asPath]);

  const apiTrigger = useCallback(() => {
    const queryJSON = Object.fromEntries(new URLSearchParams(query));
    const runApi = async () => {
      setLoading(true);
      const result = domReady ? await api(queryJSON) : response;
      setLoading(false);
      setRes(result);
    };
    runApi();
  }, [domReady, query, response]);

  // api 실행 함수
  const updateAsPath = useCallback(() => {
    if (domReady) {
      let pushToQuery = '';
      pushToQuery = getQueryFromJSON(router.asPath, Object.assign(value, {pageNo: 1}));
      const pushToUrl = `${router.pathname}${pushToQuery ? `?${pushToQuery}` : ''}`;
      router.replace(pushToUrl, undefined, {shallow: true});
    }
  }, [domReady, router, value, api, query]);

  // 초기화 버튼 동작 함수
  const resetPage = useCallback((setState: (() => void)[]) => {
    setState.map((setEachState: any) => setEachState());
    setIsResetPage(true);
  }, []);

  const PaginationEl = useCallback(
    (): ReactElement => (pagesAmount ? <Pagination pagesAmount={pagesAmount || 1} paginationName="pageNo" className="pagination-wrapper" /> : <></>),
    [pagesAmount]
  );

  return [res, updateAsPath, PaginationEl, {resetPage, setRes, apiTrigger, updateAsPath, loading}];
};

export default useQuery;
