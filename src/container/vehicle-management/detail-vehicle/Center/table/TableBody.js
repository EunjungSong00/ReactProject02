import styled from '@emotion/styled';

const TbBody = styled.tbody``;
const TableBody = ({children, ...rest}) => {
  return <TbBody {...rest}>{children}</TbBody>;
};

export default TableBody;
