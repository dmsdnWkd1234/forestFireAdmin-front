import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 50%;
    max-width: 500px;
    padding: 24px;
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    margin-left: 5%;
    margin-top: 2%;
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
