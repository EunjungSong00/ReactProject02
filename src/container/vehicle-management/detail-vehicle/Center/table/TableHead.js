import styled from '@emotion/styled';

const TbHead = styled.thead`
  background: ${(props) => props.bg || '#ccc'};
`;
const TableHead = ({children, ...rest}) => {
  return <TbHead {...rest}>{children}</TbHead>;
};

export default TableHead;
