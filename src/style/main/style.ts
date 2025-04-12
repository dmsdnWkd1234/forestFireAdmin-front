import styled from 'styled-components';

export const menuRootContainer = styled.header`
    width: 100vw;
    height: 5vh;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
`;
export const menuBtnSection = styled.section`
    width: 100%;
    height: 100%;
    display: flex;
    border-top: 3px solid black;
    border-bottom: 3px solid black;
    justify-content: center;
    align-items: center;
`;

export const menuBtn = styled.button`
    width: 100%;
    height: 80%;
    background: none;
    border: none;
    border-radius: 3px;
    outline: none;
    padding: 0;
    cursor: pointer;

    &:hover {
        background: rgba(0, 0, 0, 0.1);
        color: #333;
    }
`;

export const section = styled.section``;
