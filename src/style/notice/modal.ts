import styled from 'styled-components';

interface Modal {
    isOpen: string;
}

export const ModalBackground = styled.div<Modal>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ModalWrapper = styled.div`
    position: relative;
    background: white;
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);

    width: 90%; // 모바일 기준 너비
    max-width: 700px; // 데스크탑 최대 너비
    min-width: 300px; // 모바일 최소 너비
    box-sizing: border-box; // 패딩 포함 너비 계산
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
    color: #888;
    padding: 5px;
    line-height: 1;
    transition: color 0.2s ease;

    &:hover {
        color: #000;
    }
`;
