import React, {memo, useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import ICommonStyle from '@interface/ICommonStyle';
import {margin, variant} from 'styled-system';
import Text from '@components/atoms/Text';
import theme from '../../../public/theme';
import {Wrapper} from '.';

type ButtonType = 'primary' | 'gray' | 'white' | 'roundButton' | 'squareButtonBlue' | 'squareButtonWhite' | 'disable';

interface IButton extends ICommonStyle {
  type?: ButtonType;
  onClick?: (e: any) => void;
  style?: any;
  children?: any | string;
  loading?: boolean; // loading이 true면 페이지 내의 모든 행동이 제어됨 (중복 submit방지 등 zIndex:1000인 Wrapper가 fixed됨).
  loadingDialog?: boolean; // loadingDialog가 true면 로딩 팝업이 활성화 되면서 페이지 내의 모든 행동이 제어됨 (중복 submit방지 등 zIndex:1000인 Wrapper가 fixed됨).
  className?: string;
  loadingDialogMessage?: string;
  disabled?: boolean;
  tabIndex?: number;
}

const _Button = ({type = 'primary', onClick, width, children, loading, loadingDialog, className, loadingDialogMessage, tabIndex, disabled, ...props}: IButton) => {
  const OnClick = (e: any) => {
    onClick ? (loading ? () => null : loading === false ? onClick(e) : loading === undefined ? onClick(e) : () => null) : () => null;
  };

  const focusRef: any = useRef(null);
  useEffect(() => {
    loadingDialog && focusRef.current && focusRef.current.focus();
  }, [loadingDialog]);

  return (
    <>
      <Button width={width} {...props} typeName={type} onClick={OnClick} className={className} tabIndex={tabIndex} disabled={disabled}>
        <Text style={{cursor: 'revert'}}>{children}</Text>
      </Button>
      {loading && <Wrapper width="100vw" height="100vh" position="fixed" background="none" style={{top: 0, left: 0, zIndex: 1000, cursor: 'progress'}}></Wrapper>}
      {loadingDialog && (
        <Wrapper w h width="100vw" height="100vh" position="fixed" background="#ffffffc7" style={{top: 0, left: 0, zIndex: 1000, cursor: 'progress'}}>
          <LoadingWrapper>
            <img src="/images/carmerce_symbol.png" className="rotating-loading-logo" />
            {/* 로딩시 중복 클릭을 방지한 focus제어 버튼 (엔터광클방지) */}
          </LoadingWrapper>
          <Text size="20px">{loadingDialogMessage}</Text>
          <FakeBtn className="fake-button" ref={focusRef} style={{width: '0px', height: '0px', background: 'none', border: 'none'}}></FakeBtn>
        </Wrapper>
      )}
    </>
  );
};
export default memo(_Button);

export const StyledButton = styled.button<any>`
  ${margin}
  width: ${({width}) => width || '100%'};
  height: ${({height}) => height || '56px'};
  background-color: ${({typeName, theme}) =>
    typeName === 'primary' ? theme?.color?.primary : typeName === 'white' ? theme?.color?.white : typeName === 'disable' ? '#f9f9f9' : theme?.color?.background};
  color: ${({typeName, theme}) =>
    typeName === 'primary' ? theme?.color?.white : typeName === 'white' ? theme?.color?.black : typeName === 'disable' ? '#d1d3d4' : theme?.color?.black};
  border: ${({typeName, theme}) =>
    typeName === 'primary' ? `1px solid ${theme?.color?.main}` : typeName === 'white' ? '1px solid #d1d3d4' : typeName === 'disable' ? '1px solid #e2e6ee' : '#d1d3d4'};
  border-radius: 4px;
  cursor: ${({typeName}) => (typeName === 'disable' ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${({typeName}) => (typeName === 'primary' ? theme?.color?.hoverBlue : typeName === 'disable' ? 'none' : theme?.color?.hoverWhite)};
  }

  &:disabled {
    border: none;
    background-color: #dddddd;
    color: #676767;
  }
`;

const Button = styled(StyledButton)(
  variant({
    prop: 'typeName',
    variants: {
      white: {
        backgroundColor: '#fff',
        border: '1px solid #d1d3d4',
        '&:hover': {
          backgroundColor: `${theme?.color?.hoverWhite}`
        },
        '&:disabled': {
          '&:hover': {
            backgroundColor: '#dddddd',
            color: '#676767'
          }
        }
      },
      squareButtonBlue: {
        backgroundColor: `${theme?.color?.primary}`,
        height: '50px',
        color: `${theme?.color?.white}`,
        '&:hover': {
          backgroundColor: `${theme?.color?.hoverBlue}`
        },
        '&:disabled': {
          '&:hover': {
            backgroundColor: '#dddddd',
            color: '#676767'
          }
        }
      },
      squareButtonWhite: {
        backgroundColor: `${theme?.color?.white}`,
        height: '50px',
        border: `1px solid ${theme?.color?.primary}`,
        color: `${theme?.color?.primary}`,
        '&:hover': {
          backgroundColor: `${theme?.color?.hoverWhite}`
        },
        '&:disabled': {
          '&:hover': {
            backgroundColor: '#dddddd',
            color: '#676767'
          }
        }
      },
      roundButton: {
        backgroundColor: `${theme?.color?.primary}`,
        borderRadius: '18px',
        height: '36px',
        color: `${theme?.color?.white}`,
        '&:hover': {
          backgroundColor: `${theme?.color?.hoverBlue}`
        },
        '&:disabled': {
          '&:hover': {
            backgroundColor: '#dddddd',
            color: '#676767'
          }
        }
      }
    }
  })
);

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
  margin-right: 15px;
  img.rotating-loading-logo {
    animation: rotate_image 1s linear infinite;
    transform-origin: 50% 50%;
    width: 110px;
    opacity: 1;
  }

  /* img {
    margin-right: 100px;
  } */

  @keyframes rotate_image {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const FakeBtn = styled.button`
  &:focus {
    outline: none;
    box-shadow: none;
    -webkit-box-shadow: none;
  }
`;
