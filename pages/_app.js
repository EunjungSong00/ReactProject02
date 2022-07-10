import '../styles/globals.css';
import {ThemeProvider} from '@emotion/react';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Provider} from 'mobx-react';
import Layout from '@components/template/Layout';
import Head from 'next/head';
import {Toast} from '@components/organisms';
import {parseCookies, destroyCookie} from 'nookies';
import stores from '../src/modules/stores';
import theme from '../public/theme';
import Popup from '../src/components/organisms/Popup';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({Component, ...pageProps}) {
  useEffect(() => {
    if (navigator.userAgent.indexOf('Trident') > 0) {
      alert(
        '카머스 파트너스는 Microsoft Edge, Chrome 브라우저에 최적화 되어있습니다. ' +
          '원활한 사용을 원하시면 Microsoft Edge, Chrome 브라우저를 권장합니다. 확인버튼을 누르면 Edge브라우저로 자동으로 이동됩니다.'
      );
      window.location = 'microsoft-edge:' + process.env.NEXT_PUBLIC_DOMAIN;
    } else if (/MSIE \d |Trident.*rv:/.test(navigator.userAgent)) {
      alert(
        '카머스 파트너스는 Microsoft Edge, Chrome 브라우저에 최적화 되어있습니다. ' +
          '원활한 사용을 원하시면 Microsoft Edge, Chrome 브라우저를 권장합니다. 확인버튼을 누르면 Edge브라우저로 자동으로 이동됩니다.'
      );
      window.location = 'microsoft-edge:' + process.env.NEXT_PUBLIC_DOMAIN;
    }
  }, []);
  useEffect(() => {
    checkIE();
  }, []);
  const checkIE = () => {
    // eslint-disable-next-line no-undef
    const agent = navigator.userAgent.toLowerCase();
    if (
      // eslint-disable-next-line no-undef
      (navigator.appName === 'Netscape' && navigator.userAgent.search('Trident') !== -1) ||
      agent.indexOf('msie') !== -1
    ) {
      setPopupContent(
        '카머스 파트너스 사이트는 크롬 브라우저에 최적화 되어 있습니다. 원활한 서비스 사용을 위해 크롬 브라우저로 접속해주세요. 크롬 다운로드 페이지로 이동하시겠습니까?'
      );
    }
  };
  const {pathname} = pageProps.router;
  const [toast, setToast] = useState();
  const [toast2, setToast2] = useState();
  const [popupContent, setPopupContent] = useState(undefined);
  const router = useRouter();
  useEffect(() => {
    const welcomeCarmerceConsole = 'font-size: 20px; color:#3ba0ff;';
    const carmerceLogoConsole = 'font-size: 100px; background: url(http://dev.partner.carmerce.co.kr/images/carmerce_logo.png) center/100% no-repeat;';
    console.info('%c 카머스에 오신것을 환영합니다%c\n\n             \n\n', welcomeCarmerceConsole, carmerceLogoConsole);
  }, []);

  useEffect(() => {
    // 기능 관련 페이지 아닐 시 localStorage 삭제
    const cookies = parseCookies();
    const isLogin = cookies?.carPartnerAccessToken && cookies?.carPartnerUserInfo;
    const isLoginPath = router.pathname.includes('login');
    const isAuthPath = router.pathname.includes('login') || router.pathname.includes('auth');
    if (isLoginPath && isLogin) {
      // localStorage.clear();
      destroyCookie(null, 'carPartnerUserInfo', {path: '/'});
      destroyCookie(null, 'carPartnerAccessToken', {path: '/'});
      destroyCookie(null, 'carPartnerRefreshToken', {path: '/'});
      setToast('로그아웃 되었습니다');
    } else if (!isAuthPath && !isLogin) {
      // 기능 페이지에서 로그인이 안되어있는 경우
      setToast2('로그아웃 되었습니다. 로그인페이지로 이동합니다.');
    }
  }, [router]);
  return (
    <Provider {...stores}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Carmerce에 오신 것을 환영합니다.</title>
      </Head>
      <Toast type="error" toast={toast} setToast={setToast} />
      <Toast type="error" toast={toast2} setToast={setToast2} onClose={() => router.push('/login')} />
      <ThemeProvider theme={theme}>
        {pathname.includes('login') || pathname.includes('auth') || pathname === '/account' ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ThemeProvider>
      <Popup
        title={'알림'}
        content={popupContent}
        height={'225px'}
        width={'430px'}
        setContent={setPopupContent}
        cancelText={'취소'}
        // onClickPopupEnter={() => setPopupContent(false)}
        onClickPopupEnter={() => router.push('https://www.google.co.kr/intl/ko/chrome')}
      />
    </Provider>
  );
}

export default MyApp;
