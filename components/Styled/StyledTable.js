import styled from 'styled-components'



export const StyledTable = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .table-wrapper {

  }

  .table-columns {
  width: 200px;
  height: 50px;
    border-bottom: 0.5px solid gray;
    text-align: center;
    
  }

  .table-rows {
      width: 200px;
      height: 50px;
    border-bottom: 0.5px solid gray;
    text-align: center;
  }
`;