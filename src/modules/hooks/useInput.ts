import {getOnlyNumber, getOnlyTextNumber} from '@modules/replaceStrings';
import {Dispatch, SetStateAction, useCallback, useState, ChangeEvent} from 'react';

type ReturnTypes<T> = [T | '', (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<T>>];

const useInput = <T>(initialData: T, type?: 'number' | 'textNumber'): ReturnTypes<T> => {
  const [value, setValue] = useState(initialData);
  const handler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      /* 숫자만 입력가능 */
      /* 앞자리가 0으로 시작할 수 없는 타입  '010(x)' */
      setValue(getOnlyNumber(e) as unknown as T);
    } else if (type === 'textNumber') {
      /* 앞자리가 0으로 시작할 수 있는 타입  '010(o)' */
      setValue(getOnlyTextNumber(e) as unknown as T);
    } else {
      setValue(e.target.value as unknown as T);
    }
  }, []);
  return [value ?? '', handler, setValue]; // input의 value에 undefined가 들어가면 error가 발생함.
};

export default useInput;
