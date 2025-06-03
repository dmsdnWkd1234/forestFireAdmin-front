import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    max-width: 500px;
    height: 60%;
    padding: 24px;
    background-color: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

export const Title = styled.h3`
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #222;
`;

export const EmptyMessage = styled.p`
    color: #999;
    text-align: center;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
`;

export const Card = styled.div`
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 16px;
    background-color: #f7f7f7;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const Field = styled.div`
    margin-bottom: 8px;
    color: #444;

    strong {
        font-weight: 600;
        color: #111;
    }
`;
