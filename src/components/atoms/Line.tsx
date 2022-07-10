import styled from '@emotion/styled';
import ICommonStyle from '@interface/ICommonStyle';
import React from 'react';
import {display, margin, width, height} from 'styled-system';
import theme from 'public/theme';

interface ILine extends ICommonStyle {
  background?: string;
  style?: object;
  vertical?: boolean;
  sectionTitleLine?: boolean;
}

const _Line: React.FC<ILine> = ({vertical, sectionTitleLine, ...props}) => {
  return <StyleLine vertical={vertical} sectionTitleLine={sectionTitleLine} {...props} />;
};

const StyleLine = styled.div<ILine>`
  ${({vertical}) => (vertical ? 'width: 1px;' : 'height: 1px;')}
  ${({sectionTitleLine}) => sectionTitleLine && 'width: calc(100% + 60px); margin: 20px 0 0 -30px;'}
  background: ${({background}) => (background ? background : theme.color.bg)};
  ${height}
  ${width}
  ${margin}
  ${display}
`;

export default _Line;
