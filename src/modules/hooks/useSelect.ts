import {Dispatch, SetStateAction, useCallback, useState} from 'react';

type DefaultSelectionType = 0 | '';
type ReturnTypes<T> = [T | DefaultSelectionType, (val: T | DefaultSelectionType) => void, Dispatch<SetStateAction<T | DefaultSelectionType>>];

// default 값을 <Select /> 의 options property에 [{value: 0, label: 'default'},...]로 설정해주세요. 그래야 url의 query값이 없을 때('') 0(기본값)이 설정됩니다.
const useSelect = <T>(initialData?: T | DefaultSelectionType): ReturnTypes<T> => {
  const [value, setValue] = useState<T | DefaultSelectionType>(initialData || 0);
  const onChangeValue = useCallback((val) => {
    setValue(val || 0);
  }, []);
  const setSelect = useCallback((val) => {
    setValue(val || 0);
  }, []);
  return [value, onChangeValue, setSelect];
};

export default useSelect;
