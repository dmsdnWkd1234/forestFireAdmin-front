import styled from 'styled-components';

export const Root = styled.div`
    width: 580px;
    height: 300px; /* 데스크탑 높이 고정 */
    background-color: #fff;
    margin-left: 3%;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    /* 모바일 대응 */
    @media (max-width: 768px) {
        width: 100%;
        /* height: auto;  <-- 이걸 지우고 아래처럼 고정 높이를 줍니다 */
        height: 250px; /* 모바일에서 보여줄 최대 높이 (이걸 넘으면 스크롤) */
        margin-left: 0;
        margin-top: 15px;
    }
`;

export const ContentBox = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px; /* 패딩을 조금 줄여서 공간 확보 */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        padding: 15px;
    }
`;

export const Title = styled.div`
    font-weight: 700;
    font-size: 1.4rem;
    display: flex;
    align-items: baseline;
    margin-bottom: 10px;

    & > span {
        font-size: 0.85rem;
        color: #888;
        font-weight: 400;
        margin-left: 8px;
    }

    @media (max-width: 768px) {
        font-size: 1.1rem;
        & > span {
            font-size: 0.75rem;
        }
    }
`;

export const ListBox = styled.div`
    flex: 1; /* 남은 공간을 다 차지함 */
    overflow-y: auto; /* 내용이 넘치면 세로 스크롤 생성 (핵심) */
    margin-top: 10px;

    /* 스크롤바 디자인 (선택사항) */
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #ccc; /* 스크롤바 색상 */
        border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
`;
export const EmptyState = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 0.95rem;
    gap: 8px;
`;

export const ListItem = styled.div`
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between; /* 좌우 끝 정렬 */
    border-bottom: 1px solid #f0f0f0;
    font-size: 0.95rem;

    &:last-child {
        border-bottom: none;
    }

    @media (max-width: 768px) {
        height: 44px; /* 높이 약간 줄임 */
        font-size: 0.85rem;
    }
`;

// 아이콘 + ID + 이름 그룹
export const InfoGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1; /* 공간 차지 */
    min-width: 0; /* flex 자식 말줄임 처리를 위해 필수 */

    @media (max-width: 768px) {
        gap: 6px;
    }
`;

export const Icon = styled.span`
    font-size: 1.1rem;
    flex-shrink: 0;
`;

export const DeviceId = styled.span`
    color: #999;
    font-size: 0.85rem;
    flex-shrink: 0;

    /* 모바일에서는 ID를 숨깁니다 (공간 확보) */
    @media (max-width: 480px) {
        display: none;
    }
`;

export const DeviceName = styled.span`
    font-weight: 600;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; /* 이름 길면 ... 처리 */
`;

// 이슈 내용 + 시간 그룹
export const StatusGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0; /* 줄어들지 않음 */
    margin-left: 10px;

    @media (max-width: 768px) {
        gap: 8px;
        max-width: 45%; /* 모바일에서 우측 영역 최대 너비 제한 */
        justify-content: flex-end;
    }
`;

export const IssueText = styled.span<{ color: string }>`
    color: ${(props) => props.color};
    font-weight: 500;
    white-space: nowrap;

    /* 모바일에서는 이슈 내용도 길면 ... 처리 */
    @media (max-width: 768px) {
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const TimeText = styled.span`
    color: #bbb;
    font-size: 0.8rem;

    @media (max-width: 768px) {
        font-size: 0.75rem;
        /* 아주 작은 화면에서는 시간도 숨기고 싶다면 아래 주석 해제 */
        /* display: none; */
    }
`;
