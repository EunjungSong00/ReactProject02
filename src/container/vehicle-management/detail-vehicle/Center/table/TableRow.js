import styled from '@emotion/styled';

const TbRow = styled.tr`
  ${(props) =>
    props.brbn &&
    `
    td{border-bottom:0}
  `}
`;
const TableRow = ({children, ...rest}) => {
  return <TbRow {...rest}>{children}</TbRow>;
};

export default TableRow;
