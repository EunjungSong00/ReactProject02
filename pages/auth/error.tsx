import {useEffect, memo} from 'react';
import {useRouter} from 'next/router';
import {getQueryFromUrl} from '@modules/replaceStrings';

const AuthError = () => {
  const router = useRouter();

  useEffect(() => {
    const data = getQueryFromUrl(router.asPath, 'EncodeData');

    if (data && window.opener) {
      window.opener.postMessage({niceError: data}, '*');
      window.close();
    }
  }, [router.asPath]);

  return <></>;
};

export default memo(AuthError);
