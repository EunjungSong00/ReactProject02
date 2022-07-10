import styled from '@emotion/styled';

const Colgroup = styled.colgroup``;
const TableColgroup = ({children, ...rest}) => {
  return <Colgroup {...rest}>{children}</Colgroup>;
};

export default TableColgroup;
