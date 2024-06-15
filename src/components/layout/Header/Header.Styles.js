import styled from "styled-components";

// Theme
import { palette } from "../../../styles/theme";

// Components
import { Header as AntdHeader } from "antd/es/layout/layout";
import { Avatar, Flex } from "antd";

export const HeaderContainer = styled(AntdHeader)`

    background-color: transparent;
    /* background-color: red; */


    /* border-bottom: 1px solid ${palette.neutral}; */
    padding: 5px 2rem;


    display: flex;
    justify-content: space-between;
    align-items: center;
`;


export const HeaderLeftContainer = styled(Flex)`
    /* width:20%; */
    /* background-color: aliceblue; */
    /* display: flex; */
    align-items: center;
    justify-content: space-between;

    /* Add margin to right between children */
     & > * {
        margin-right: 3rem;
    }  

`;

export const HeaderRightContainer = styled(Flex)`
    width:40%;
    /* justify-content: flex-end; */
    justify-content: flex-end;
    align-items: center;
    /* background-color: aliceblue; */


`;


export const LightDarkSwitchContainer = styled(Flex)`
    justify-content: space-between;
    align-items: center;


    width: 150px;


    /* Styles child with casll ane A */
    & > .ant-typography {
        margin-bottom: 0;
    }

    & .ant-switch-inner-checked {
            margin-top: 1px !important;

            & img {
               height: 20px;

            }
    }

    & .ant-switch-inner-unchecked {
            margin-top: -26px !important;

            & img {
               width: 16px;

            }
    } 
`;

export const StyledAvatar = styled(Avatar)`
    background-color: ${palette.secondary};
    color: ${palette.primary};
    font-size: 18px !important;

    cursor: pointer;
`;