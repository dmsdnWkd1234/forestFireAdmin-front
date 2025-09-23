import styled from 'styled-components';

// styles.js 에 추가
export const CardTitle = styled.h2`
    font-size: 20px;
    font-weight: 600;
    color: #ffffff; // 카드 제목은 더 밝은 흰색
    margin: 0 0 16px 0;
`;

export const Label = styled.span`
    color: #a0aec0; // 라벨 색상
    font-size: 14px;
    margin-right: 8px;
`;

export const Content = styled.p`
    color: #e2e8f0; // 내용 텍스트
    font-size: 16px;
    margin: 4px 0;
`;
