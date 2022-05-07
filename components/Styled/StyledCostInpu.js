import styled from 'styled-components'


export const StyledCostInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .inputGroup{
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid gray;
      margin: 5px;
      border-radius: 8px;
  }
.text-input-wrapper{
    display: flex;
    flex-direction: column;
}
  .text-input {
    border-radius: 10px;
    border: 1px solid gray;
    font-size: 20px;
    margin: 10px;
    text-align: center;
    padding: 10px;
  }

  .checkbox-items {
 	-webkit-appearance: none;
	background-color: #fafafa;
	border: 1px solid #cacece;
	box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
	padding: 9px;
	border-radius: 3px;
	display: inline-block;
	position: relative;
    margin: 0;
  }

  .checkbox-items:active, .checkbox-items:checked:active {
	box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px 1px 3px rgba(0,0,0,0.1);
}

  .checkbox-items:checked{
	background-color: black;
	border: 1px solid #adb8c0;
	box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05), inset 15px 10px -12px rgba(255,255,255,0.1);
	color: #99a1a7;
  }

  .label-checkboxes {
      font-size: 25px;
      margin: 10px;

  }



`
