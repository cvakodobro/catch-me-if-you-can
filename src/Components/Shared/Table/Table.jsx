import styled from "styled-components";

const TableContainer = styled.div`
  min-height: 35vh;
  background-color: #00000033;
  border-radius: 1rem;

  color: white;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px;
  max-height: 500px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    background-color: #07caea;
    border-radius: 0 1rem 1rem 0;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background-color: #0109f9;
    border: 2px solid #07caea;
  }
  ::-webkit-scrollbar-track-piece {
  }
`;

const TableHead = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 20px;
`;

const TableCell = styled.p`
  border-bottom: 1px solid #f4a261;
  color: #fff;
`;

const TableBody = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(min-content, max-content);
  padding: 0 20px 20px;
`;

const Table = ({ children }) => {
  return (
    <TableContainer>
      <TableHead>
        <TableCell>Server Name</TableCell>
        <TableCell>Players Joined</TableCell>
        <TableCell>Is Private</TableCell>
      </TableHead>
      <TableBody>{children}</TableBody>
    </TableContainer>
  );
};

export default Table;
