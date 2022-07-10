import React, {memo, useCallback, useEffect, useState} from 'react';
import styled from '@emotion/styled';
import {Wrapper, Text, Image} from '@components/atoms';
import {useRouter} from 'next/router';
import theme from '@public/theme';
import {parseCookies} from 'nookies';
import {PopupType} from '@components/organisms/Popup';
import {Popup} from '@components/organisms';

const TitleItem = ({text, backgroundUrl}: {text: string | React.ReactElement; backgroundUrl?: string}) => {
  const [activeHome, setActiveHome] = useState(false);
  const [activeOrder, setActiveOrder] = useState(false);
  const router = useRouter();
  const path = router.pathname;
  const cookies = parseCookies();
  const user = JSON.parse(cookies?.carPartnerUserInfo || 'false');
  const isRegularMember = user?.level === 'REGULAR';
  const [popupContent, setPopupContent] = useState<PopupType>(undefined);

  useEffect(() => {
    if (path.includes('/home')) {
      setActiveHome(true);
      setActiveOrder(false);
    } else if (path.includes('/order-management/list')) {
      setActiveOrder(true);
      setActiveHome(false);
    } else {
      setActiveHome(false);
      setActiveOrder(false);
    }
  }, [path]);

  const setTitleDom = useCallback(
    (active) => (
      <>
        <Icon backgroundUrl={backgroundUrl}></Icon>
        <Text size="sm" ml={10} color={active ? theme.color.primary : theme.color.black}>
          {text}
        </Text>
      </>
    ),
    []
  );
  return (
    <>
      {text === '홈' ? (
        <TitleButton onClick={() => router.push('/home')}>{setTitleDom(activeHome)}</TitleButton>
      ) : text === '주문관리' ? (
        <>
          <TitleButton
            onClick={() =>
              isRegularMember ? router.push('/order-management/list') : setPopupContent('카머스의 기능을 사용하시려면 추가 인증이 필요합니다. 추가 인증을 진행하시겠습니까?')
            }
          >
            {setTitleDom(activeOrder)}
          </TitleButton>
          <Image
            src={activeOrder ? '/images/ico-arrow-drop-up@3x.png' : '/images/ico-arrow-drop-down@3x.png'}
            style={{transform: activeOrder ? 'rotate(90deg)' : 'rotate(270deg)', height: 7, marginRight: '12px'}}
          ></Image>
        </>
      ) : (
        <Wrapper h justifyContent={'space-between'}>
          {setTitleDom(false)}
        </Wrapper>
      )}
      <Popup title="추가인증이 필요합니다" content={popupContent} setContent={setPopupContent} okText="인증" cancelText="닫기" onClickPopupEnter={() => router.push('/auth')} />
    </>
  );
};
export default memo(TitleItem);

// background: url(/images/ico-arrow-drop-down@3x.png) no-repeat;

const Icon = styled.span<any>`
  display: inline-block;
  background: ${(props) => props.backgroundUrl};
  background-size: contain;
  width: 20px;
  height: 20px;
`;

const TitleButton = styled.div<any>`
  width: 100%;
  display: flex;
  align-items: center;
`;
