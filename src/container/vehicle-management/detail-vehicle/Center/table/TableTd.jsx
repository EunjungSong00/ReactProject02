import styled from '@emotion/styled';
import theme from '@public/theme';

const TableCellTd = styled.td`
  /* padding:15px 20px; */
  padding: ${(props) => props.padding || '15px 20px'};
  font-size: 14px;
  color: #666;
  letter-spacing: -1px;
  border-bottom: 1px solid #ccc;
  line-height: 1.4;
  text-align: ${(props) => props.align || 'center'};
  background: ${(props) => props.bg || 'transparent'};
  word-break: break-all;
  span {
    display: inline-block;
    vertical-align: top;
  }
  ${(props) =>
    props.brt &&
    `
    border-top:1px solid #ccc;
  `}
  ${(props) =>
    props.brbn &&
    `
    border-bottom:0;
  `}
  ${(props) =>
    props.thSet &&
    `
    font-weight:700;
    color:#000;
    background:#ccc;
  `}
  ${(props) =>
    props.vt &&
    `
    vertical-align:top;
  `}
  ${(props) =>
    props.lh &&
    `
    line-height:1.6;
  `}
`;
const TableTd = ({children, ...rest}) => {
  return <TableCellTd {...rest}>{children}</TableCellTd>;
};

export default TableTd;
