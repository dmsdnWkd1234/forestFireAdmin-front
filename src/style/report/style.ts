import styled from 'styled-components';

export const Container = styled.div`
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const Title = styled.h2`
    text-align: center;
    margin-bottom: 30px;
    color: #333;
`;

export const EmptyMessage = styled.p`
    text-align: center;
    color: #888;
`;

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 0;
`;

export const ListItem = styled.li`
    list-style: none;
    border: 1px solid #ccc;
    border-radius: 12px;
    padding: 16px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`;

export const Field = styled.div`
    margin-bottom: 8px;
    color: #444;

    strong {
        color: #222;
    }
`;
