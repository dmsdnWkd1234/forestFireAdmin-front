import styled from 'styled-components';

export const Root = styled.div<{ active: string }>`
    width: 50vw;
    height: 10vh;
    display: flex;
    gap: 12px;
    padding: 10px 20px;
    background-color: #f8f9fa;
    border-radius: 12px;
    box-shadow: ${({ active }) =>
        active == '전체'
            ? '0 4px 12px rgba(0, 0, 0, 0.15)' // 클릭된 것처럼 좀 더 강한 그림자
            : '0 2px 8px rgba(0, 0, 0, 0.05)'};
    width: fit-content;
`;

export const MeshDataTile = styled.button`
    background-color: #ffffff;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 10px 16px;
    font-size: 15px;
    color: #343a40;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #e9ecef;
        border-color: #ced4da;
    }

    &:active {
        background-color: #dee2e6;
        transform: scale(0.97);
    }
`;
