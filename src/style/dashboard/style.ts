import styled from 'styled-components';

export const RootContainerStyle = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

interface SectionRoot {
    height?: string;
}

export const SectionRoot = styled.div<SectionRoot>`
    width: 100%;
    height: ${(props) => props.height || '33%'};

    /* 모바일 대응 */
    @media (max-width: 768px) {
        /* 모바일에선 섹션 높이를 자동으로 조절하게 함 */
        height: auto;
    }
`;

export const flex = styled.div`
    display: flex;
    flex-direction: row;

    /* 모바일 대응 */
    @media (max-width: 768px) {
        flex-direction: column; /* 세로로 쌓기 */
    }
`;
