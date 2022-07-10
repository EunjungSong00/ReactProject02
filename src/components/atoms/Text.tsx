import styled from '@emotion/styled';
import {height, margin, width, padding, color, TextAlignProps, textAlign, FlexProps, flex, lineHeight, display, LetterSpacingProps, letterSpacing, variant} from 'styled-system';
import ICommonStyle from '@interface/ICommonStyle';
import {ReactElement} from 'react';
import theme from '../../../public/theme';

type TextType =
  | 'sectionHeading1'
  | 'sectionHeading2'
  | 'sectionHeading3'
  | 'sectionHeading4'
  | 'sectionHeading5'
  | 'sectionHeading6'
  | 'sectionDetailTitle'
  | 'sectionSubTitle'
  | 'sectionTableHeader'
  | 'sectionBodyText'
  | 'sectionInfo'
  | 'listZero';

interface IText extends ICommonStyle, TextAlignProps, FlexProps, LetterSpacingProps {
  style?: any;
  children?: any;
  onClick?: () => void;
  weight?: '1' | '2' | '3' | '4' | '5' | '6' | 'light' | 'regular' | 'medium' | 'bold';
  size?: string;
  lineHeight?: string;
  en?: boolean;
  hover?: boolean;
  type?: TextType;
  arrow?: boolean;
}

const _Text = ({hover = false, children, onClick, arrow = false, color, ...props}: IText): ReactElement => (
  <>
    <Text onClick={onClick} hover={hover} {...props} color={color}>
      {children}
      {arrow && <Arrow />}
    </Text>
  </>
);

export default _Text;

const StyledText = styled('p')<any>`
  ${flex}
  ${margin}
  ${padding}
  ${color}
  ${width}
  ${height}
  ${textAlign}
  ${lineHeight}
  ${letterSpacing}
  ${display}
  font-family: ${({weight}: {weight: '1' | '2' | '3' | '4' | '5' | '6' | 'light' | 'regular' | 'medium' | 'bold'}) => (weight ? theme.font[weight] : theme.font['3'])};
  font-size: ${({size}: {size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'}) => (size && size.includes('px') ? size : '16px' && theme.fontSize[size])};
  letter-spacing: ${({en}) => (en ? 0 : en && '-0.45px')};
  &:hover {
    color: ${({hover}) => hover && theme.color.main};
    font-weight: ${({hover}) => hover && '700'};
    cursor: ${({hover}) => hover && 'pointer'};
  }
`;

const Text = styled(StyledText)(
  variant({
    prop: 'type',
    variants: {
      sectionHeading1: {
        fontFamily: `${theme.font['5']}`,
        fontSize: '42px',
        letterSpacing: '-1.05px'
      },
      sectionHeading2: {
        fontFamily: `${theme.font['5']}`,
        fontSize: '30px',
        letterSpacing: '-0.75px'
      },
      sectionHeading3: {
        fontSize: '26px',
        letterSpacing: '-0.65px'
      },
      sectionHeading4: {
        fontFamily: `${theme.font['4']}`,
        fontSize: '20px'
      },
      sectionHeading5: {
        fontFamily: `${theme.font['4']}`,
        fontSize: '18px'
      },
      sectionHeading6: {
        fontFamily: `${theme.font['5']}`,
        fontSize: '16px'
      },
      sectionDetailTitle: {
        fontFamily: `${theme.font['4']}`,
        fontSize: '30px',
        span: {
          color: `${theme.color.main}`,
          width: '589px',
          padding: '12px 0',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          display: 'inline-block'
        }
      },
      sectionSubTitle: {
        fontSize: '18px'
      },
      sectionTableHeader: {
        fontSize: '13px'
      },
      sectionBodyText: {
        fontSize: '14px',
        lineHeight: '1.6'
      },
      sectionInfo: {
        fontSize: '12px',
        color: `${theme.color.darkgray}`,
        lineHeight: '1.6'
      },
      listZero: {
        fontSize: '14px',
        textAlign: 'center',
        padding: '75px 0',
        color: `${theme.color.lightgray}`
      }
    }
  })
);

const Arrow = styled.span`
  display: inline-block;
  margin-left: 10px;
  width: 7px;
  height: 12px;
  background: url(/images/icon-more@2x.png) no-repeat;
  background-size: contain;
  cursor: pointer;
`;
