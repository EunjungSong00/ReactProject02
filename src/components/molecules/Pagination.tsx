// 상위 컴포넌트에서 const [nowPage, setNowPage] = useState<number>(1); 과 함께 사용

import React, {memo, useEffect, useState} from 'react';
import styled from '@emotion/styled';
import {Wrapper} from '@components/atoms';
import theme from '@public/theme';
import {useRouter} from 'next/router';

interface IPagination {
  pagesAmount: number;
  className?: string;
  paginationName?: string;
}
interface IButton {
  on: 'on' | ''; // boolean 일 시, If you want to write it to the DOM, pass a string instead: on="true" or on={value.toString()} 경고 발생.
}
// const router = useRouter();
// export const getPagination = () => (router.query.pagination ? Number(router.query.pagination) - 1 : 0);

const Pagination = ({pagesAmount, className = 'pagination-wrapper', paginationName = 'pagination'}: IPagination) => {
  const pagesArr: number[] = [];
  const router = useRouter();
  const [nowPage, setNowPage] = useState<number>(0);

  useEffect(() => {
    router.query[paginationName] ? setNowPage(Number(router.query[paginationName])) : setNowPage(1);
  }, [router.query[paginationName]]);

  if (pagesAmount < 5) {
    for (let i = 1; i <= pagesAmount; i += 1) {
      pagesArr.push(i);
    }
  } else if (nowPage < 3) {
    pagesArr.push(1);
    pagesArr.push(2);
    pagesArr.push(3);
    pagesArr.push(4);
    pagesArr.push(5);
  } else if (nowPage + 3 > pagesAmount) {
    pagesArr.push(pagesAmount - 4);
    pagesArr.push(pagesAmount - 3);
    pagesArr.push(pagesAmount - 2);
    pagesArr.push(pagesAmount - 1);
    pagesArr.push(pagesAmount);
  } else {
    pagesArr.push(nowPage - 2);
    pagesArr.push(nowPage - 1);
    pagesArr.push(nowPage);
    pagesArr.push(nowPage + 1);
    pagesArr.push(nowPage + 2);
  }

  return (
    <_Pagenation flex className={className} paginationName={paginationName}>
      <Wrapper mr="8px">
        <ArrowBtn
          className={nowPage === 1 ? 'arrow-prev prev-off' : 'arrow-prev'}
          onClick={() => nowPage !== 1 && router.push(`${router.route}?${paginationName}=${nowPage - 1}`)}
        />
      </Wrapper>
      {pagesArr.map((pageNum: number, index: number) => (
        <Wrapper mr="8px">
          <PageBtn
            key={index}
            on={pageNum === nowPage ? 'on' : ''}
            onClick={() => {
              router.push(`${router.route}?${paginationName}=${pageNum}`);
            }}
          >
            {pageNum}
          </PageBtn>
        </Wrapper>
      ))}
      <ArrowBtn
        className={nowPage === pagesAmount ? 'arrow-next next-off' : 'arrow-next'}
        onClick={() => nowPage !== pagesAmount && router.push(`${router.route}?${paginationName}=${nowPage + 1}`)}
      />
    </_Pagenation>
  );
};
export default memo(Pagination);

const _Pagenation = styled(Wrapper)<any>`
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
