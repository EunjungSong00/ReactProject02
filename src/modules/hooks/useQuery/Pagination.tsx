// 상위 컴포넌트에서 const [nowPage, setNowPage] = useState<number>(1); 과 함께 사용

import React, {Fragment, memo, Dispatch, SetStateAction, ReactElement, useCallback, useEffect, useState} from 'react';
import styled from '@emotion/styled';
import {Wrapper} from '@components/atoms';
import theme from '@public/theme';
import {useRouter} from 'next/router';
import {getQueryFromJSON, getQueryFromUrl} from '@modules/replaceStrings';

interface IPagination {
  pagesAmount: number;
  className: string;
  paginationName: string;
}
interface IButton {
  on: 'on' | ''; // boolean 일 시, If you want to write it to the DOM, pass a string instead: on="true" or on={value.toString()} 경고 발생.
}

const Pagination = ({pagesAmount, className, paginationName}: IPagination): ReactElement => {
  const router = useRouter();
  const [domReady, setDomReady] = useState<boolean>(false);
  const [page, setPage] = useState<number>(Number(getQueryFromUrl(router.asPath, 'pageNo') || 1));
  useEffect(() => {
    setDomReady(true);
  }, []);

  // page 변수가 변경됨에 따라 url query의 pageNo 변경해주기
  useEffect(() => {
    domReady && setPage(Number(router.query.pageNo));
  }, [router.query.pageNo]);

  const pagesArr: number[] = [];

  if (pagesAmount < 5) {
    for (let i = 1; i <= pagesAmount; i += 1) {
      pagesArr.push(i);
    }
  } else if (page < 3) {
    pagesArr.push(1);
    pagesArr.push(2);
    pagesArr.push(3);
    pagesArr.push(4);
    pagesArr.push(5);
  } else if (page + 3 > pagesAmount) {
    pagesArr.push(pagesAmount - 4);
    pagesArr.push(pagesAmount - 3);
    pagesArr.push(pagesAmount - 2);
    pagesArr.push(pagesAmount - 1);
    pagesArr.push(pagesAmount);
  } else {
    pagesArr.push(page - 2);
    pagesArr.push(page - 1);
    pagesArr.push(page);
    pagesArr.push(page + 1);
    pagesArr.push(page + 2);
  }

  const onClickMinus = useCallback(() => {
    const pushToQuery = getQueryFromJSON(router.asPath, {pageNo: Number(page) - 1});
    const pushToUrl = `${router.pathname}${pushToQuery ? `?${pushToQuery}` : ''}`;
    page !== 1 && router.replace(pushToUrl, undefined, {shallow: true});
    page !== 1 && setPage((nowPage) => nowPage - 1);
  }, [page, router]);

  const onClickNumber = useCallback(
    (pageNum) => {
      const pushToQuery = getQueryFromJSON(router.asPath, {pageNo: Number(pageNum)});
      const pushToUrl = `${router.pathname}${pushToQuery ? `?${pushToQuery}` : ''}`;
      router.replace(pushToUrl, undefined, {shallow: true});
      setPage(pageNum);
    },
    [page, router]
  );

  const onClickPlus = useCallback(() => {
    const pushToQuery = getQueryFromJSON(router.asPath, {pageNo: Number(page) + 1});
    const pushToUrl = `${router.pathname}${pushToQuery ? `?${pushToQuery}` : ''}`;
    page !== pagesAmount && router.replace(pushToUrl, undefined, {shallow: true});
    page !== pagesAmount && setPage((nowPage) => nowPage + 1);
  }, [page, router]);

  return (
    <_Pagination flex className={className} paginationName={paginationName}>
      <Wrapper mr="8px">
        <ArrowBtn className={page === 1 ? 'arrow-prev prev-off' : 'arrow-prev'} onClick={onClickMinus} />
      </Wrapper>
      {pagesArr.map((pageNum: number, key: number) => (
        <Fragment key={key}>
          <Wrapper mr="8px">
            <PageBtn on={pageNum === page ? 'on' : ''} onClick={() => onClickNumber(pageNum)}>
              {pageNum}
            </PageBtn>
          </Wrapper>
        </Fragment>
      ))}
      <ArrowBtn className={page === pagesAmount ? 'arrow-next next-off' : 'arrow-next'} onClick={onClickPlus} />
    </_Pagination>
  );
};
export default memo(Pagination);

const _Pagination = styled(Wrapper)<any>`
  .arrow-prev {
    background: url(/images/arrow-active.png) no-repeat 50% 50%;
    transform: rotate(180deg);
  }
  .arrow-next {
    background: url(/images/arrow-active.png) no-repeat 50% 50%;
  }
  .prev-off {
    background: url(/images/arrow-next.png) no-repeat 50% 50%;
    cursor: not-allowed;
  }
  .next-off {
    background: url(/images/arrow-next.png) no-repeat 50% 50%;
    cursor: not-allowed;
  }
`;

const PageBtn = styled('button')<IButton>`
  width: 35px;
  height: 35px;
  border-radius: 5px;
  cursor: pointer;
  ${({on}) =>
    on
      ? `background:${theme.color.main};border:1px solid ${theme.color.main}; color: ${theme.color.white};`
      : `background:${theme.color.white};border:1px solid ${theme.color.lineGray}; color:${theme.color.darkgray}44;`};
`;

const ArrowBtn = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid ${theme.color.lineGray};
  color: ${theme.color.primary};
`;
