import {ChangeEvent, Dispatch, ReactElement, ReactText, SetStateAction} from 'react';
import useInput from '../useInput';

type UseInputElType = [ReactText, () => ReactElement, (e: ChangeEvent<HTMLInputElement>) => void, Dispatch<SetStateAction<ReactText>>];
type UseInputElOptionType = {number?: boolean; comma?: boolean};

const useInputEl = (initialValue: ReactText, option?: UseInputElOptionType): UseInputElType => {
  const [value, onChangeValue, setValue] = useInput<ReactText>(initialValue, option?.number ? 'number' : undefined);
  const InputEl = () => <input type="text" id="input-id" className="input-class" onChange={onChangeValue} value={value} />;

  return [value, InputEl, onChangeValue, setValue];
};

export default useInputEl;
