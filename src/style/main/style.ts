import styled from 'styled-components';

export const Root = styled.div`
    width: 100vw;
    display: flex;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: #f2f2f7;
`;

export const menuRootContainer = styled.nav`
    position: sticky;
    top: 0;
    height: 100vh;
    width: 20vw;
    padding: 24px 12px;
    background: #fff;
    border-right: 1px solid #ddd;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.04);
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const menuDisplay = styled.div`
    width: 100%;
`;

export const menuBtnSection = styled.div<{ active?: boolean }>`
    width: 100%;
    padding: 5px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ active }) => (active ? '#e5e5ea' : 'transparent')};
    color: ${({ active }) => (active ? '#000' : '#666')};
    font-weight: ${({ active }) => (active ? '600' : '400')};
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
        background-color: #f0f0f5;
    }
`;

export const menuBtn = styled.button`
    all: unset;
    width: 100%;
    height: 100%;
    font-size: 1rem;
    text-align: center;
    cursor: pointer;
`;

export const section = styled.section``;
