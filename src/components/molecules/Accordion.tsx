import React, {useState, useCallback, memo, useEffect} from 'react';
import styled from '@emotion/styled';
import TitleItem from '@components/molecules/TitleItem';
import Line from '@components/atoms/Line';
import ContentItem from '@components/molecules/ContentItem';
import {useRouter} from 'next/router';

interface IAccordion {
  title: string;
  backgroundUrl?: string;
  content: string[] | React.ReactElement;
  className?: string;
  openTrigger?: boolean;
}

const _Accordion = ({title, backgroundUrl, content, className = 'accordion-wrapper', openTrigger}: IAccordion) => {
  const [contentHeight, setContentHeight] = useState('0');
  const [load, setLoad] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const path = router.pathname;
    const pathArr = path.split('/');
    if (content && Array.isArray(content)) {
      const result = content.filter((value: any) => {
        if (pathArr[3]) {
          return value.link.includes(pathArr[2]);
        }
        return value.link === path;
      });
      if (result.length > 0) {
        setContentHeight('500px');
      }
    }
    setLoad(true);
  }, [router.pathname]);

  useEffect(() => {
    openTrigger && setContentHeight('500px');
  }, [openTrigger]);

  const handleButtonClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (contentHeight === '0') {
        setContentHeight('500px');
      } else {
        setContentHeight('0');
      }
    },
    [contentHeight]
  );

  return (
    <div className={className}>
      {load ? (
        <>
          <HeadTitle className="accordion-head" onClick={handleButtonClick} openTrigger={openTrigger}>
            <TitleItem text={title} backgroundUrl={backgroundUrl} />
            {content ? <Btn className={contentHeight === '0' ? ' ' : 'active'}></Btn> : null}
          </HeadTitle>
          {content ? (
            <ContentsWrapper className="accordion-body" style={{maxHeight: contentHeight}}>
              <Contents>
                {Array.isArray(content) && <Line mb={16} />}
                {Array.isArray(content) ? content.map((item: any, index: number) => <ContentItem text={item.text} linkUrl={item.link} key={index} />) : content}
                {Array.isArray(content) && <Line mt={10} />}
              </Contents>
            </ContentsWrapper>
          ) : null}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default memo(_Accordion);

const HeadTitle = styled('div')<any>`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  cursor: pointer;
  padding-left: 20px;
  justify-content: space-between;
`;

const Btn = styled.div`
  position: relative;
  width: 24px;
  height: 7px;
  transition: 0.3s ease-in-out;
  background: url(/images/ico-arrow-drop-down@3x.png) no-repeat;
  background-size: contain;

  &.active {
    transform: rotate(360deg);
    transform-origin: 8px 6px;
    transition: 0.3s ease-in-out;
    background: url(/images/ico-arrow-drop-up@3x.png) no-repeat;
    background-size: contain;
  }
`;

const ContentsWrapper = styled.div`
  height: auto;
  max-height: 0;
  width: 100%;
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const Contents = styled.div`
  margin-top: 10px;
  line-height: 1.6;
`;
