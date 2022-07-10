import styled from '@emotion/styled';
import ICommonStyle from '@interface/ICommonStyle';
import {Line, Text, Wrapper} from '@components/atoms';
import {ReactElement} from 'react';
import {border} from 'styled-system';

interface ISection extends ICommonStyle {
  children?: any;
  w?: boolean;
  h?: boolean;
  column?: boolean;
  center?: boolean;
  left?: boolean;
  right?: boolean;
  flex?: boolean;
  between?: boolean;
  flexNum?: number;
  className?: string;
  padding?: string;
  title?: string;
  setting?: JSX.Element;
  border?: string;
}

const Section = ({title, setting, children, ...props}: ISection): ReactElement => (
  <_Section {...props} mb="10px">
    {title && (
      <Wrapper h>
        <Text width="20%" type="sectionHeading4">
          {title}
        </Text>
        <Wrapper h width="80%" justifyContent="right" flex>
          {setting}
        </Wrapper>
      </Wrapper>
    )}
    {title && <Line sectionTitleLine />}
    {children}
  </_Section>
);

export default Section;

// eslint-disable-next-line no-underscore-dangle
const _Section = styled(Wrapper)<any>`
  ${border}
  padding: ${({padding}) => padding || '35px 35px'};
  background: #fff;
  position: relative;
  ${({flex}) => flex && 'display: flex;'}
  ${({w, h, column, display, between, flex}) => (w || h || column || between) && !display && !flex && 'display: flex;'}
  ${({w}) => w && 'justify-content: center;'}
  ${({between}) => between && 'justify-content: space-between;'}
  ${({h}) => h && 'align-items: center;'}
  ${({column}) => column && 'flex-direction: column;'}
  ${({center}) => center && 'text-align: center;'}
  ${({left}) => left && 'text-align: left;'}
  ${({right}) => right && 'text-align: right;'}
  ${({flexNum}) => flexNum && `flex: ${flexNum}`};
`;
