import React, {memo, useCallback} from 'react';
import styled from '@emotion/styled';
import {Accordion} from '@components/molecules';
import useShortCut from '@modules/hooks/useShortCut';

const IconName: any = [
  {
    title: '홈',
    backgroundUrl: 'url(/images/icon-menu-0@2x.png) no-repeat;',
    contents: null
  },
  {
    title: '재고관리',
    backgroundUrl: 'url(/images/icon-menu-1@2x.png) no-repeat;',
    contents: [
      {text: '차량 등록/관리', link: '/vehicle-management/registration'},
      {text: '판매 완료 내역', link: '/vehicle-management/sales-completion'}
    ]
  },
  {
    title: '주문관리',
    backgroundUrl: 'url(/images/order.svg) no-repeat;',
    contents: null
  },
  // {
  //   title: '데이터집계',
  //   backgroundUrl: 'url(/images/icon-menu-2@2x.png) no-repeat;',
  //   contents: [
  //     {text: '손익 현황', link: '/data-aggregation/pnl'},
  //     {text: '비용 현황', link: '/data-aggregation/cost'}
  //   ]
  // },
  {
    title: '딜러 등록요청',
    backgroundUrl: 'url(/images/icon-menu-3@2x.png) no-repeat;',
    contents: [{text: '딜러 초대/내역', link: '/recommender'}]
  },
  {
    title: '마이페이지',
    backgroundUrl: 'url(/images/icon-menu-4@2x.png) no-repeat;',
    contents: [
      {text: '계정정보 관리', link: '/mypage/account'},
      {text: '일대일 문의사항', link: '/mypage/qna'},
      {text: '공지사항', link: '/mypage/notice'}
    ]
  }
];

const LeftSide = () => {
  useShortCut();
  const setLiDom = useCallback(
    (item, index) => (
      <li key={index}>
        <Accordion title={item.title} backgroundUrl={item.backgroundUrl} content={item.contents} />
      </li>
    ),
    []
  );
  return (
    <LeftSideContainer>
      <SideContainer>{IconName.map((item: any, index: number) => setLiDom(item, index))}</SideContainer>
    </LeftSideContainer>
  );
};
export default memo(LeftSide);

const LeftSideContainer = styled.div`
  background: #fff;
  min-width: 235px;
  width: 15%;
`;

const SideContainer = styled.ul`
  margin-top: 20px;

  li {
    padding: 17px 0;
    font-size: 23px;
  }

  span {
    display: inline-block;
  }

  ul {
    margin: 10px 0 0 0;
    padding: 10px 0 0 0;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
`;
