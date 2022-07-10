import styled from '@emotion/styled';
import theme from '@public/theme';

const TableSet = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  text-align: center;
  font-size: 14px;
  color: #000;
  table-layout: fixed;
  margin-top: ${(props) => props.mt || '0px'};
  ${(props) =>
    props.type1 &&
    `
    td{
      font-size:12px;
      color:#000;
    }
  `}
  ${(props) =>
    props.type2 &&
    `
    td{
      text-align:left;
      padding:15px 10px;
    }
  `}
  ${(props) =>
    props.lh &&
    `
    td{
      line-height:1.6;
    }
  `}
  ${(props) =>
    props.vt &&
    `
    td{
      vertical-align:top;
    }
  `}
`;
const Table = ({children, ...rest}) => {
  return <TableSet {...rest}>{children}</TableSet>;
};

export default Table;
