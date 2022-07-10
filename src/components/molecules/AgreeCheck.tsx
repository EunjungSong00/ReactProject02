import {ReactElement} from 'react';
import {Wrapper, Checkbox, Text} from '@components/atoms';
import ICommonStyle from '@interface/ICommonStyle';
import theme from 'public/theme';

interface IAgreeCheck extends ICommonStyle {
  name: string;
  top?: string | number;
  check: boolean;
  onClickCheckbox?: () => void;
  onClickRight?: () => void;
  labelText: string;
  weight?: '2' | '3' | '1' | 'medium' | 'bold' | '4' | '5' | '6' | 'light' | 'regular';
  detail?: boolean;
}

const _AgreeCheck = ({name, check, onClickCheckbox, onClickRight, labelText, weight = '2', detail = true, ...props}: IAgreeCheck): ReactElement => (
  <Wrapper position="relative" width="100%" {...props} h left>
    <Wrapper h>
      <Checkbox isChk={check} name={name} onChange={onClickCheckbox} size="sm" weight={weight} labelText={labelText} />
    </Wrapper>
    {detail && (
      <Text hover weight={'3'} color={theme.color.lightgray} size="13px" onClick={onClickRight} style={{position: 'absolute', cursor: 'pointer', right: '0px', float: 'right'}}>
        보기
      </Text>
    )}
  </Wrapper>
);

export default _AgreeCheck;
