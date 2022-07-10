import {useRouter} from 'next/router';
import {parseCookies} from 'nookies';
import {useCallback, useEffect, useState} from 'react';
import useClientEnv from './useClientEnv';

const useShortCut = (): void => {
  const router = useRouter();
  const clientEnv = useClientEnv();
  const [shortCut, setShortCut] = useState<any>({
    shortCut: false,
    key1: false,
    key2: false,
    key3: false,
    key4: false,
    key5: false,
    key6: false,
    key7: false,
    key8: false,
    keyT: false
  });
  const cookies = parseCookies();
  const isLocalHost = process.env.NEXT_PUBLIC_DOMAIN === 'http://localhost:8010';
  const copyTokenOnClipBoard = useCallback(async () => {
    try {
      const accessToken = cookies.carPartnerAccessToken;
      await navigator.clipboard.writeText(`{"authorization": "Bearer ${accessToken}"}`);
      console.group('token copy');
      console.info('토큰헤더를 클립보드에 복사했습니다');
      console.info(`{"authorization": "Bearer ${accessToken}"}`);
      console.groupEnd();
    } catch (error) {
      console.group('token copy');
      console.error('토큰헤더 복사가 실패되었습니다');
      console.error(error);
      console.groupEnd();
    }
  }, []);

  useEffect(() => {
    const shortCut = clientEnv?.platform === 'macOS' ? 'Control' : 'Alt';
    document.onkeydown = (e: KeyboardEvent) => {
      // console.info('clientEnv?.platform', clientEnv?.platform);
      // console.info('shortCut', shortCut);
      // console.info('e.key === shortCut', e.key === shortCut);
      clientEnv?.platform && e.key === shortCut && setShortCut((prev: any) => ({...prev, shortCut: true}));
      clientEnv?.platform && e.key === '1' && setShortCut((prev: any) => ({...prev, key1: true}));
      clientEnv?.platform && e.key === '2' && setShortCut((prev: any) => ({...prev, key2: true}));
      clientEnv?.platform && e.key === '3' && setShortCut((prev: any) => ({...prev, key3: true}));
      clientEnv?.platform && e.key === '4' && setShortCut((prev: any) => ({...prev, key4: true}));
      clientEnv?.platform && e.key === '5' && setShortCut((prev: any) => ({...prev, key5: true}));
      clientEnv?.platform && e.key === '6' && setShortCut((prev: any) => ({...prev, key6: true}));
      clientEnv?.platform && e.key === '7' && setShortCut((prev: any) => ({...prev, key7: true}));
      clientEnv?.platform && e.key === '8' && setShortCut((prev: any) => ({...prev, key8: true}));
      clientEnv?.platform && e.key === 't' && setShortCut((prev: any) => ({...prev, keyT: true}));
    };
    document.onkeyup = (e: KeyboardEvent) => {
      clientEnv?.platform && e.key === shortCut && setShortCut((prev: any) => ({...prev, shortCut: false}));
      clientEnv?.platform && e.key === '1' && setShortCut((prev: any) => ({...prev, key1: false}));
      clientEnv?.platform && e.key === '2' && setShortCut((prev: any) => ({...prev, key2: false}));
      clientEnv?.platform && e.key === '3' && setShortCut((prev: any) => ({...prev, key3: false}));
      clientEnv?.platform && e.key === '4' && setShortCut((prev: any) => ({...prev, key4: false}));
      clientEnv?.platform && e.key === '5' && setShortCut((prev: any) => ({...prev, key5: false}));
      clientEnv?.platform && e.key === '6' && setShortCut((prev: any) => ({...prev, key6: false}));
      clientEnv?.platform && e.key === '7' && setShortCut((prev: any) => ({...prev, key7: false}));
      clientEnv?.platform && e.key === '8' && setShortCut((prev: any) => ({...prev, key8: false}));
      clientEnv?.platform && e.key === 't' && setShortCut((prev: any) => ({...prev, keyT: false}));
    };
  }, [clientEnv]);

  useEffect(() => {
    shortCut.shortCut && shortCut.key1 && router.push('/home');
    shortCut.shortCut && shortCut.key2 && router.push('/vehicle-management/registration');
    shortCut.shortCut && shortCut.key3 && router.push('/vehicle-management/sales-completion');
    shortCut.shortCut && shortCut.key4 && router.push('/order-management/list');
    shortCut.shortCut && shortCut.key5 && router.push('/recommender');
    shortCut.shortCut && shortCut.key6 && router.push('/mypage/account');
    shortCut.shortCut && shortCut.key7 && router.push('/mypage/qna');
    shortCut.shortCut && shortCut.key8 && router.push('/mypage/notice');
    isLocalHost && shortCut.shortCut && shortCut.keyT && copyTokenOnClipBoard();
  }, [shortCut]);
};

export default useShortCut;
