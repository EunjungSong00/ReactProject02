import styled from '@emotion/styled';
import theme from '@public/theme';

const TableCellTh = styled.th`
  padding: 15px 20px;
  font-weight: 700;
  font-size: 14px;
  color: #000;
  letter-spacing: -1px;
  line-height: 1.4;
  border-bottom: 1px solid #ccc;
  text-align: ${(props) => props.align || 'center'};
  background: ${(props) => props.bg || 'transparent'};
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
    props.vt &&
    `
    vertical-align:top;
  `}
`;
const TableTh = ({children, ...rest}) => {
  return <TableCellTh {...rest}>{children}</TableCellTh>;
};

export default TableTh;
