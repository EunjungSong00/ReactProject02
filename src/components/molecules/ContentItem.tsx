import {memo, useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import theme from 'public/theme';
import {Text} from '@components/atoms';
import {parseCookies} from 'nookies';
import Popup, {PopupType} from '@components/organisms/Popup';

const ContentItem = ({text, linkUrl}: {text: string; linkUrl: string}) => {
  const cookies = parseCookies();
  const user = JSON.parse(cookies?.carPartnerUserInfo || 'false');
  const isRegularMember = user?.level === 'REGULAR';
  const [active, setActive] = useState(false);
  const [popupContent, setPopupContent] = useState<PopupType>(undefined);
  const router = useRouter();
  const path = router.pathname;

  useEffect(() => {
    const pathArr = path.split('/');
    if (pathArr[3]) {
      if (linkUrl.includes(pathArr[2])) {
        setActive(true);
      } else {
        setActive(false);
      }
    } else if (path === linkUrl) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [path]);

  return (
    <>
      <Text
        weight="3"
        size="xs"
        pb={10}
        pl={20}
        color={active ? theme.color.primary : theme.color.black}
        hover
        onClick={() => {
          if (isRegularMember || linkUrl.includes('mypage')) {
            router.push(linkUrl);
          } else {
            setPopupContent('카머스의 기능을 사용하시려면 추가 인증이 필요합니다. 추가 인증을 진행하시겠습니까?');
          }
        }}
      >
        <a>ㆍ {text}</a>
      </Text>
      <Popup title="추가인증이 필요합니다" content={popupContent} setContent={setPopupContent} okText="인증" cancelText="닫기" onClickPopupEnter={() => router.push('/auth')} />
    </>
  );
};

export default memo(ContentItem);
