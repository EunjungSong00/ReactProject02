// client의 환경 변수를 알기 위해 생성한 파일입니다. ex) Window or Mac
import {useEffect, useState} from 'react';
import useDomReady from './useDomReady';

type ClientEnvType = {platform: string; permissions: any};
type UserAgentDataType = Navigator & {userAgentData: any};

const useClientEnv = (): ClientEnvType => {
  const [platform, setPlatform] = useState<string>('');
  const [permissions, setPermissions] = useState<any>('');
  const [clientEnv, setClientEnv] = useState<ClientEnvType>({platform, permissions});
  const domReady = useDomReady();

  useEffect(() => {
    domReady && console.info('clientEnv', navigator);
    domReady && setPlatform((navigator as UserAgentDataType)?.userAgentData?.platform); // ex) macOS
    domReady && setPermissions(navigator?.permissions);
  }, [domReady]);

  useEffect(() => {
    setClientEnv({platform, permissions});
  }, [platform, permissions]);

  return clientEnv;
};

export default useClientEnv;
