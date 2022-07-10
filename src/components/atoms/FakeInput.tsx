import {ReactElement} from 'react';

// 크롬 자동완성기능때문에 의도치 않은 input에 정보가 입력되는 버그
export default function FakeInput({password}: {password?:boolean}): ReactElement {
  return <input type={password ? 'password' : 'text'} style={{position: 'absolute', width: 0, height: 0, padding: 0, margin: 0, border: 'none'}} />;
}
