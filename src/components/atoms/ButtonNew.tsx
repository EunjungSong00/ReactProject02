import React, {memo} from 'react';
import styled, {CreateStyled} from '@emotion/styled';
import ICommonStyle from '@interface/ICommonStyle';
import {margin, width, padding} from 'styled-system';
import Text from '@components/atoms/Text';
import {Image} from '@components/atoms/index';
import theme from '../../../public/theme';

interface IButton extends ICommonStyle {
  onClick?: (e: any) => void;
  style?: any;
  children?: any | string;
  loading?: boolean; // loading이 true면 버튼 클릭이 동작을 안함(중복 submit방지. onClick={() => {}}).
  line?: boolean;
  small?: boolean;
  large?: boolean;
  round?: boolean;
  white?: boolean;
  gray?: boolean;
  flex?: boolean;
  arrowLeft?: boolean;
  arrowRight?: boolean;
  img?: boolean;
  nice?: boolean;
  text?: boolean;
}

const _ButtonNew = ({onClick, children, loading, arrowLeft, arrowRight, nice, ...props}: IButton) => {
  const OnClick = (e: any) => {
    onClick ? (loading ? () => null : loading === false ? onClick(e) : loading === undefined ? onClick(e) : () => null) : () => null;
  };

  const themeColor = props.line
    ? {color: theme.color.primary, hover: theme.color.hoverWhite}
    : props.white
    ? {color: theme.color.borderGray, hover: theme.color.hoverWhite}
    : props.gray
    ? {color: theme.color.borderGray, hover: theme.color.borderGray}
    : {color: theme.color.primary, hover: theme.color.hoverBlue};

  return (
    <>
      <Button themeColor={themeColor} nice={nice} {...props} onClick={OnClick}>
        {nice ? <Image src="/images/auth/phone.png" mr="10px" /> : null}
        {arrowLeft ? <Image src="/images/ico-arrow-before.svg" mr="8px" /> : null}
        <Text display={'inline-block'}>{children}</Text>
        {arrowRight ? <Image src="/images/ico-arrow-next.svg" ml="8px" /> : null}
      </Button>
    </>
  );
};
export default memo(_ButtonNew);

const Button = styled.button<any>`
  ${margin}
  ${width}
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  height: 50px;
  padding: 0 27px;
  font-size: 14px;
  background-color: ${({themeColor}) => themeColor.color};
  color: #fff;
  box-sizing: border-box;
  border: none;

  ${({small}) => small && 'height: 36px;font-size: 13px;padding: 0 20px;'}
  ${({large}) => large && 'height: 56px;font-size: 16px;padding: 0 72px;'}
  ${({round}) => round && 'border-radius: 100px;'}
  ${({line, white, themeColor}) => (line || white) && `background-color: #fff;border: 1px solid ${themeColor.color};color: ${themeColor.color};`}
  ${({white}) => white && `color: ${theme.color.black};`}
  ${({flex}) => flex && 'padding: 0; width: 100%;'}
  ${({img}) => img && 'display:flex;'}
  ${({nice}) => nice && 'display:flex;'}
  ${({text, color}) => text && `height: auto;line-height: 14px;padding: 0; background-color: #fff; border: 0;color:${color};`}
  cursor: ${({disable}) => (disable ? 'not-allowed' : 'pointer')};
  ${padding}

  &:hover {
    ${({text, themeColor}) => !text && `background-color: ${themeColor.hover}`};
  }
`;
