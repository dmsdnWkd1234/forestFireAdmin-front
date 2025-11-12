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
`;

export const flex = styled.div`
    display: flex;
    flex-direction: row;
`;
