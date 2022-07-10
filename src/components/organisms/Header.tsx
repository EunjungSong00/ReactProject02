import theme from 'public/theme';
import styled from '@emotion/styled';
import {useRouter} from 'next/router';
import {Wrapper, Text, Txt} from '@components/atoms';
import {Popup} from '@components/organisms';
import {PopupType} from '@components/organisms/Popup';
import {useEffect, useState} from 'react';
import {destroyCookie, parseCookies} from 'nookies';
import DevTool from './DevTool';

function Header({title = ''}: {title?: string}): React.ReactElement {
  const router = useRouter();
  const [popupContent, setPopupContent] = useState<PopupType>(undefined);
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [login, setLogin] = useState<boolean>(false);

  const cookies = parseCookies();
  const userInfo = JSON.parse(cookies?.carPartnerUserInfo || 'false');
  const isRegularMember = userInfo?.level === 'REGULAR';

  useEffect(() => {
    const _isLogin = !!(cookies?.carPartnerAccessToken && cookies?.carPartnerUserInfo);
    setLogin(_isLogin);

    if (_isLogin) {
      const _user: any = cookies?.carPartnerUserInfo;
      const userInfo = JSON.parse(_user);
      setUser(userInfo);
      setName(userInfo ? userInfo.identityAuthentication?.name : '');
      setCompany(userInfo ? userInfo.dealer && userInfo.dealer.companyName : '');
    }
  }, []);

  const onLogout = () => {
    console.info('Carmerce logout');
    destroyCookie(null, 'carPartnerUserInfo', {path: '/'});
    destroyCookie(null, 'carPartnerAccessToken', {path: '/'});
    destroyCookie(null, 'carPartnerRefreshToken', {path: '/'});

    router.push('/login');
  };

  return (
    <Wrapper minWidth="1200px" h justifyContent="space-between" width="100%" padding={'13px'} backgroundColor={theme.color.primary}>
      <Wrapper h width="600px">
        <Logo onClick={() => (user ? router.push('/home') : router.push('/login'))}>
          <span>카머스</span>
        </Logo>
        {title && (
          <HeaderTitle type="light" size={theme.fontSize.sm} weight={theme.font['4']} color={theme.color.white} ml={20} pt={'3px'}>
            {title}
          </HeaderTitle>
        )}
      </Wrapper>
      <DevTool />
      <Wrapper>
        <Wrapper flex>
          <Wrapper w between width="280px" mr="30px">
            <Wrapper flex>
              {isRegularMember && (
                // {cookies?.carPartnerAccessToken && cookies?.carPartnerUserInfo && user.identityAuthentication && (
                <UserName size="14px" color="white" style={{cursor: 'pointer'}} onClick={() => router.push('/mypage/account')}>
                  <span title={company}>{company}</span> {name}
                </UserName>
              )}
            </Wrapper>
            <Wrapper mr="0px" ml="auto">
              {login && (
                <Text size="14px" color="white" style={{cursor: 'pointer'}} onClick={() => setPopupContent('로그아웃 하시겠습니까?')}>
                  로그아웃
                </Text>
              )}
            </Wrapper>
          </Wrapper>
        </Wrapper>
      </Wrapper>
      <Popup content={popupContent} setContent={setPopupContent} cancelText="취소" onClickPopupEnter={() => onLogout()} />
    </Wrapper>
  );
}

export default Header;

const Logo = styled.h1`
  background: url(/images/logo.svg) no-repeat;
  background-size: contain;
  width: 137px;
  height: 22px;
  cursor: pointer;
  span {
    display: inline-block;
    text-indent: -9999em;
  }
`;

const HeaderTitle = styled(Txt)<any>`
  position: relative;

  &::before {
    content: '';
    display: inline-block;
    width: 1px;
    height: 19px;
    background-color: #fff;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: -10px;
  }
`;

const UserName = styled(Text)`
  position: relative;
  span {
    position: relative;
    display: inline-block;
    margin-right: 10px;
    white-space: nowrap;
    /* width: 85px; */
    text-overflow: ellipsis;
    overflow: hidden;
    vertical-align: bottom;
  }
  /* &::before {
    content: '';
    display: inline-block;
    position: absolute;
    top: -3px;
    left: -26px;
    width: 20px;
    height: 20px;
    background: url(/images/icon-member@2x.png) no-repeat;
    background-size: contain;
  } */
`;
