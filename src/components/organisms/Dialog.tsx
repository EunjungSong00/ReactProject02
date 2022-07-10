// 상위 컴포넌트에서 const [dialogNum, setDialogNum] = useState<number | undefined>(undefined);와 함께 사용해야 함. dialogNum 1~n: open, 0: close.

import React, {useEffect, useRef, ReactElement} from 'react';
import {Wrapper, Text, Line} from '@components/atoms';
import styled from '@emotion/styled';
import theme from 'public/theme';

interface IDialog extends IStyleDialog {
  dialogOpen: boolean | number;
  title?: string;
  children: React.ReactElement | string | any;
  setDialogClose?: any;
  onClickDialogEnter?: any;
  disableClose?: boolean;
  nonButton?: boolean;
}

interface IStyleDialog {
  enterColor?: string;
  borderColor?: string;
  type?: 'text' | 'component';
  width?: number | false | undefined;
  height?: number | false | undefined;
  cancelText?: string;
  okText?: string;
}

export default function Dialog({
  title,
  dialogOpen,
  width = undefined, // 370px
  height = undefined, // 200px
  children,
  setDialogClose,
  type = 'text',
  onClickDialogEnter,
  enterColor = theme.color.main,
  cancelText,
  okText,
  disableClose,
  nonButton
}: IDialog): ReactElement {
  const okRef: any = useRef();
  useEffect(() => {
    okRef.current && okRef.current.focus();
  }, []);

  const okByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && onClickDialogEnter();
  };

  function CloseButton() {
    return <_CloseButton src="/images/close-icon.png" onClick={() => setDialogClose(false)} />;
  }

  return dialogOpen !== undefined ? (
    <Wrapper w h position="fixed" style={{zIndex: 500, top: 0, left: 0, bottom: 0, right: 0}}>
      <Dim onClick={() => disableClose || setDialogClose(false)} />
      <_Dialog _width={width} _height={height} borderColor={theme.color.borderGray}>
        <Wrapper padding="30px 0 0" height={nonButton ? '100%' : 'calc(100% - 54px)'} column>
          {disableClose || <CloseButton />}
          {title && (
            <Text weight="5" padding="0 35px" size="sm" color={theme.color.black}>
              {title}
            </Text>
          )}
          <DialogContent width={width} height={height} nonButton={nonButton} type={type} className="dialog-content">
            {typeof children === 'string' ? (
              <Text weight="3" size="13px" color={theme.color.darkgray}>
                {children}
              </Text>
            ) : (
              children
            )}
          </DialogContent>
        </Wrapper>
        {nonButton || (
          <>
            <Line width="100%" background={theme.color.lineGray} />
            <Wrapper right>
              {(cancelText || (!cancelText && !okText && !onClickDialogEnter)) && (
                <BottomBtn
                  ref={onClickDialogEnter ? undefined : okRef}
                  onClick={() => disableClose || setDialogClose(false)}
                  style={{width: okText || onClickDialogEnter ? '50%' : '100%', borderRight: okText || onClickDialogEnter ? `1px solid ${theme.color.lineGray}` : 'none'}}
                >
                  {cancelText}
                  {!cancelText && !okText && '닫기'}
                </BottomBtn>
              )}
              {(okText || onClickDialogEnter) && (
                <BottomBtn ref={okRef} color={enterColor} onClick={onClickDialogEnter || setDialogClose(false)} onKeyPress={okByEnter} style={{width: cancelText ? '50%' : '100%'}}>
                  {okText}
                  {!okText && '확인'}
                </BottomBtn>
              )}
            </Wrapper>
          </>
        )}
      </_Dialog>
    </Wrapper>
  ) : (
    <></>
  );
}

const _Dialog = styled.div<IStyleDialog | any>`
  width: 70%;
  height: 90%;
  ${({_width}) => `max-width:${_width || 370}px;`}
  ${({_height}) => `max-height:${_height || 200}px;`}
  flex-direction: column;
  ${({borderColor}) => `border: solid 1px ${borderColor};`}
  border-radius: 4px;
  background: #fff;
  z-index: 600;
  box-shadow: -10px 9px 21px 0 rgba(128, 152, 213, 0.07);
  position: fixed;
  overflow: hidden;
  text-align: left;

  & ::-webkit-scrollbar {
    width: 0px;
    background: none;
  }
  & ::-webkit-scrollbar-thumb {
    background: none;
    /* opacity: 0.4; */
  }
  & ::-webkit-scrollbar-track {
    background: none;
  }
`;

const DialogContent = styled.div<any>`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 35px 25px;
  ${({type}) => type === 'text' && 'line-height: 150%;'}
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar-thumb {
    background: ${theme.color.scrollColor};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  margin-top: 18px;
`;

const BottomBtn = styled.button<any>`
  color: ${({color}) => color || theme.color.lightgray};
  height: 53px;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    background: #f7f7f7;
    border-radius: 0 0 4px 4px;
  }
  &:focus {
    outline: none;
  }
  font-size: ${theme.fontSize.xs};
`;

const _CloseButton = styled.img`
  position: absolute;
  right: 20px;
  top: 20px;
  width: 14px;
  height: 14px;
  cursor: pointer;
`;

const Dim = styled.div`
  position: fixed;
  background: #00000020;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
`;
