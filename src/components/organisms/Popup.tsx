import {useEffect, Dispatch, SetStateAction, useRef, ReactElement} from 'react';
import {Wrapper, Text, Line} from '@components/atoms';
import styled from '@emotion/styled';
import theme from 'public/theme';

export type PopupType = ReactElement | string | undefined;

interface IPopup extends IStylePopup {
  title?: string | 'disable';
  content: PopupType;
  setContent: Dispatch<SetStateAction<PopupType>>;
  onClickPopupEnter?: any;
  disableClose?: boolean;
  nonButton?: boolean;
  loading?: boolean;
}

interface IStylePopup {
  enterColor?: string;
  borderColor?: string;
  type?: 'text' | 'component';
  width?: string | boolean | undefined;
  height?: string | boolean | undefined;
  cancelText?: string;
  okText?: string;
}

export default function Popup({
  title = '알림',
  width = undefined, // 370px
  height = undefined, // 200px
  content,
  setContent,
  type = 'text',
  onClickPopupEnter,
  enterColor = theme.color.main,
  cancelText,
  okText,
  disableClose,
  nonButton,
  loading
}: IPopup): ReactElement {
  const okRef: any = useRef(null);

  useEffect(() => {
    okRef.current && okRef.current.focus();
  }, [content]);

  const okByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && onClickPopupEnter();
  };

  function CloseButton() {
    return <_CloseButton src="/images/close-icon.png" onClick={() => setContent(undefined)} />;
  }

  return content ? (
    <Wrapper w h position="fixed" style={{zIndex: 500, top: 0, left: 0, bottom: 0, right: 0}}>
      <Dim onClick={() => disableClose || setContent(undefined)}></Dim>
      <_Popup _width={width} _height={height} borderColor={theme.color.borderGray}>
        <Wrapper padding="30px 0 0" height={nonButton ? '100%' : 'calc(100% - 54px)'} column>
          {disableClose || <CloseButton />}
          {title !== 'disable' && (
            <Text weight="5" padding="0 35px" size="sm" color={theme.color.black}>
              {title}
            </Text>
          )}
          <PopupContent _width={width} _height={height} nonButton={nonButton} type={type} className="popup-content">
            {typeof content === 'string' ? (
              <Text weight="3" size="13px" color={theme.color.darkgray}>
                {content}
              </Text>
            ) : (
              content
            )}
          </PopupContent>
        </Wrapper>
        {nonButton || (
          <>
            <Line width="100%" background={theme.color.lineGray} />
            <Wrapper right>
              {(cancelText || (!cancelText && !okText && !onClickPopupEnter)) && (
                <BottomBtn
                  ref={onClickPopupEnter ? undefined : okRef}
                  onClick={() => disableClose || setContent(undefined)}
                  style={{width: okText || onClickPopupEnter ? '50%' : '100%', borderRight: okText || onClickPopupEnter ? `1px solid ${theme.color.lineGray}` : 'none'}}
                >
                  {cancelText}
                  {!cancelText && !okText && '닫기'}
                </BottomBtn>
              )}
              {(okText || onClickPopupEnter) && (
                <BottomBtn
                  loading={loading}
                  ref={okRef}
                  color={enterColor}
                  onClick={onClickPopupEnter || setContent(undefined)}
                  onKeyPress={okByEnter}
                  style={{width: cancelText ? '50%' : '100%'}}
                >
                  {okText}
                  {!okText && '확인'}
                </BottomBtn>
              )}
            </Wrapper>
          </>
        )}
      </_Popup>
    </Wrapper>
  ) : (
    <></>
  );
}

const _Popup = styled.div<IStylePopup | any>`
  width: 70%;
  height: 90%;
  ${({_width}) => `max-width:${_width || '370px'};`}
  ${({_height}) => `max-height:${_height || '200px'};`}
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

const PopupContent = styled.div<any>`
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
  ${({loading}) => loading && 'cursor: progress'};
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
