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
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    z-index: 1000;
`;

export const ModalWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 2rem;
    border-radius: 8px;
    min-width: 600px;
    min-height: 400px;
`;

export const CloseButton = styled.button`
    margin-top: 1rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
`;
