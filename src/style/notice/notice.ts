import styled from 'styled-components';

interface ListIdProps {
    weight?: boolean;
}

export const root = styled.div`
    width: 50vw;
`;

export const showNoticeListRootBox = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const listHeaderBox = styled.header`
    width: 80%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1%;
`;

export const headerTitle = styled.section`
    width: 10%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5%;
`;

export const listRootBox = styled.div`
    width: 80%;
    height: 100px;
    border-top: 0.8px solid #bfbfbf;
    display: flex;
    flex-direction: row;
    &:hover {
        background-color: #f2f2f2;
    }
`;

export const listId = styled.section<ListIdProps>`
    width: 10%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5%;
    font-weight: ${(props) => (props.weight ? 1000 : 400)};
`;

export const listType = styled.section<ListIdProps>`
    width: 10%;
    width: 10%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: ${(props) => (props.weight ? 1000 : 400)};
`;

export const listTitle = styled.section<ListIdProps>`
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: ${(props) => (props.weight ? 1000 : 400)};
`;

export const listDate = styled.section<ListIdProps>`
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: ${(props) => (props.weight ? 1000 : 400)};
`;

export const addNoticeButton = styled.div`
    width: 70px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border: 1px solid black;
    top: 150px;
    right: 100px;
`;

export const createNoticeLink = styled.a`
    text-decoration: none;
    color: inherit;
`;
