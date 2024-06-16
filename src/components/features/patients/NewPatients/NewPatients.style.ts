import { palette } from "../../../../styles/theme";
import styled from "styled-components";
import { Row, Col, Flex } from "antd";
import Button from "antd-button-color";

const LineHeader = styled.hr`
    border-top: 1px solid  ${palette.grey50};
    margin-right:2%;

`;
const InputRow = styled(Row)`
    width: 90%;
    display: flex;
    justify-content:space-between;
    // border-radius: 5px;
`;
const ButtonRow = styled(Row)`
    width: 40%;
margin-left: 55%;
margin-top: 15%;
`;

const ButtonCol = styled(Col)`
    width: 100%;
    display: flex;
    justify-content:end;
    margin-top: 40%;
`;
const FlexButton = styled(Flex)`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;
const AddButton = styled(Button)`
width: 17%;
`;
export { LineHeader, InputRow, ButtonCol, AddButton, FlexButton, ButtonRow };


