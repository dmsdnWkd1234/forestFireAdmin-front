import styled from 'styled-components';

export const homeRoot = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const homeUnderRoot = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

interface SectionProps {
    margin?: string; // 선택적 prop, 안 넘기면 기본값 적용
}

export const Section = styled.div<SectionProps>`
    width: 45%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: ${({ margin }) => margin || '0'};
`;

export const Container = styled.div`
    margin-top: 1.8%;
    width: 100%;
    height: 50%;
    max-height: 400px;
    padding: 24px;
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

export const Title = styled.h3`
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #111;
`;

export const EmptyMessage = styled.p`
    color: #aaa;
    text-align: center;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    max-height: 300px;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 6px; /* 스크롤바 너비 */
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ccc; /* 스크롤바 색상 */
        border-radius: 3px; /* 스크롤바 둥글게 */
    }
    &::-webkit-scrollbar-track {
        background-color: #f1f1f1; /* 스크롤바 트랙 배경 */
        border-radius: 3px;
    }
`;

export const Card = styled.div`
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 16px;
    background-color: #fafafa;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
    transition: background 0.2s;

    &:hover {
        background-color: #f0f0f0;
    }
`;

export const Field = styled.div`
    margin-bottom: 8px;
    font-size: 0.95rem;
    color: #444;

    strong {
        font-weight: 600;
        color: #111;
    }
`;
