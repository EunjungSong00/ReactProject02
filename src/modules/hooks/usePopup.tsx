import React, {Dispatch, ReactElement, SetStateAction, useState, useEffect, useRef} from 'react';
import Wrapper from '@components/atoms/Wrapper';
import theme from '@public/theme';
import Txt from '@components/atoms/Txt';
import styled from '@emotion/styled';

type ReturnTypes = [any, ({content, setContent, ...props}: IUsePopup) => ReactElement];

export type UsePopupType = ReactElement | string | undefined;

interface IUsePopup extends IStyleUsePopup {
  title?: string | 'disable';
  content?: UsePopupType;
  setContent?: Dispatch<SetStateAction<UsePopupType>>;
  onClickPopupEnter?: any;
  disableClose?: boolean;
  nonButton?: boolean;
  loading?: boolean;
}
interface IStyleUsePopup {
  enterColor?: string;
  borderColor?: string;
  type?: 'text' | 'component';
  titleSize?: string | boolean | undefined;
  titleAlign?: string | boolean | undefined;
  contentAlign?: string | boolean | undefined;
  width?: string | boolean | undefined;
  height?: string | boolean | undefined;
  cancelText?: string;
  okText?: string;
}

const usePopup = (): ReturnTypes => {
  const [popup, setPopup] = useState<UsePopupType>(undefined);

  function PopupContent({
    title = '알림',
    titleSize = undefined,
    titleAlign = undefined,
    contentAlign = undefined,
    width = undefined, // 370px1
    height = undefined, // 200px
    content,
    setContent,
    type = 'text',
    onClickPopupEnter,
    enterColor = '#',
    cancelText,
    okText,
    disableClose,
    nonButton,
    loading
  }: IUsePopup): ReactElement {
    useEffect(() => {
      okRef.current && okRef.current.focus();
    }, [content]);

    const okRef: any = useRef(null);

    const okByEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.key === 'Enter' && onClickPopupEnter();
    };

    return content ? (
      <Wrapper w h position="fixed" style={{zIndex: 500, top: 0, left: 0, bottom: 0, right: 0}}>
        <Dim onClick={() => disableClose || (setContent && setContent(undefined))}></Dim>
        <_Popup _width={width} _height={height}>
          <Wrapper padding="50px 0 0 0" column>
            {title !== 'disable' && (
              <TitleTxt type="black" _titleSize={titleSize} color="#222" padding="0 50px" _titleAlign={titleAlign}>
                {title}
              </TitleTxt>
            )}
            <PopupContainerWrap _width={width} _height={height} nonButton={nonButton} type={type} className="popup-content">
              {typeof content === 'string' ? (
                content && content.includes('\n') ? (
                  <>
                    {content.split('\n').map((item, key) => (
                      <PopupTxt key={key} type="medium" size="18px" color="#222" _contentAlign={contentAlign}>
                        {item}
                      </PopupTxt>
                    ))}
                  </>
                ) : (
                  <PopupTxt type="medium" size="18px" color="#222" _contentAlign={contentAlign}>
                    {content}
                  </PopupTxt>
                )
              ) : (
                content
              )}
            </PopupContainerWrap>
          </Wrapper>
          {nonButton || (
            <Wrapper
              center
              style={{
                position: !okText || !cancelText ? 'initial' : 'absolute',
                bottom: !okText || !cancelText ? '' : '0',
                width: '100%',
                margin: !okText || !cancelText ? '30px 0 40px 0' : '0'
              }}
            >
              {(cancelText || (!cancelText && !okText && !onClickPopupEnter)) && (
                <BottomBtn
                  ref={onClickPopupEnter ? undefined : okRef}
                  onClick={() => disableClose || (setContent && setContent(undefined))}
                  style={{width: okText || onClickPopupEnter ? '50%' : '250px'}}
                >
                  {cancelText}
                  {!cancelText && !okText && '닫기'}
                </BottomBtn>
              )}
              {(okText || onClickPopupEnter) && (
                <BottomOkBtn
                  loading={loading}
                  ref={okRef}
                  color={enterColor}
                  onClick={onClickPopupEnter || (setContent && setContent(undefined))}
                  onKeyPress={okByEnter}
                  style={{width: cancelText ? '50%' : '250px'}}
                >
                  {okText}
                  {!okText && '확인'}
                </BottomOkBtn>
              )}
            </Wrapper>
            // </Wrapper>
          )}
        </_Popup>
      </Wrapper>
    ) : (
      <></>
    );
  }

  const PopupElement = ({content, setContent, ...props}: IUsePopup) => <PopupContent content={popup} setContent={setPopup} {...props} />;
  // console.log('popup', PopupContent);
  return [setPopup, PopupElement];
};

export default usePopup;

const _Popup = styled.div<IStyleUsePopup | any>`
  width: 70%;
  height: min-content;
  border: 1px solid #222;
  border-radius: 2px;
  ${({_width}) => `max-width:${_width || '500px'};`};
  ${({_height}) => `height:${_height || '320px'};`};
  background: #fff;
  z-index: 600;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  position: fixed;
  overflow: scroll;
  text-align: left;
  & ::-webkit-scrollbar {
    width: 0px;
    background: none;
  }
  & ::-webkit-scrollbar-thumb {
    background: none;
    /* opacity: 0.4; */
  }
  &::-webkit-scrollbar-track {
    background: none;
  }
`;

const PopupContainerWrap = styled.div<any>`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 50px 10px;
  ${({type}) => type === 'text' && 'line-height: 150%;'};
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
  color: ${({color}) => color || '#fff'};
  width: 50%;
  height: 60px;
  background: #ccc;
  border: none;
  cursor: pointer;
  &:hover {
    background: #9b9b9b;
  }
  &:focus {
    outline: none;
  }
  font-size: ${theme.fontSize.xs};
  ${({loading}) => loading && 'cursor: progress'};
`;

const BottomOkBtn = styled.button<any>`
  background: #0073e8;
  color: #fff;
  font-family: 'SpoqaHanSansNeo-Bold';
  width: 50%;
  height: 60px;
  border: none;
  cursor: pointer;
  &:hover {
    background: #0355a8;
  }
  &:focus {
    outline: none;
  }
`;

const Dim = styled.div`
  position: fixed;
  background: #000;
  opacity: 0.5;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
`;

const TitleTxt = styled.p<any>`
  font-family: 'SpoqaHanSansNeo-Bold';
  padding: 0 50px;
  color: #333;
  ${({_titleSize}) => `font-size: ${_titleSize || '24px'};`};
  ${({_titleAlign}) => `text-align: ${_titleAlign || 'center'};`};
`;

const PopupTxt = styled(Txt)<any>`
  ${({_contentAlign}) => `text-align: ${_contentAlign || 'left'};`};
`;
