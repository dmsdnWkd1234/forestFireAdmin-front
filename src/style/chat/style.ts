import styled, { keyframes } from 'styled-components'; // ★ keyframes 임포트

interface isUser {
    $isUser: boolean; // ★ string 말고 boolean이 맞다
}

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
`;

export const Card = styled.div`
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 25px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
`;

export const CardHeader = styled.h2`
    font-size: 1.5em;
    color: #333;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
`;

export const ChatWindow = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 15px;
    background-color: #fbfbfb;
    display: flex;
    flex-direction: column;
    gap: 15px; // ★ 메시지 간격 살짝 늘림
`;

// ★ 1. AI 아바타 (초상화) 스타일 추가
export const Avatar = styled.div`
    width: 80px;
    height: 80px;
    max-width: 80px;
    border-radius: 50%;
    /* ★ 기존 배경색, 글자색, 글자 정렬은 필요 없음 (이미지로 대체) */
    background-color: transparent; /* 배경색 투명하게 */
    background-image: url('/images/weather_fairy_bot.png'); /* ★ 이미지 경로 */
    background-size: cover; /* 이미지가 꽉 차게 */
    background-position: center; /* 이미지 중앙 정렬 */
    background-repeat: no-repeat; /* 이미지 반복 안 함 */
    flex-shrink: 0;
`;

// ★ 2. ChatMessage 스타일 수정 (아바타랑 말풍선 담는 컨테이너)
export const ChatMessage = styled.div<isUser>`
    display: flex;
    align-items: flex-start; /* ★ 상단 정렬 */
    gap: 10px; /* ★ 아바타와 말풍선 사이 간격 */
    justify-content: ${(props) => (props.$isUser ? 'flex-end' : 'flex-start')};
`;

// ★ 3. 말풍선 + 복사버튼 감싸는 래퍼 추가
export const MessageContent = styled.div<isUser>`
    display: flex;
    align-items: center; /* 말풍선과 복사 버튼 세로 정렬 */
    flex-direction: ${(props) => (props.$isUser ? 'row-reverse' : 'row')};
    max-width: calc(100% - 60px); /* 아바타+간격 뺀 나머지 */
`;

// ★ 4. MessageBubble 스타일 수정 (모서리 뾰족하게)
export const MessageBubble = styled.div<isUser>`
    max-width: 100%; /* 부모(MessageContent) 너비에 맞춤 */
    padding: 10px 15px;
    border-radius: 18px;
    background-color: ${(props) => (props.$isUser ? '#007bff' : '#e0e0e0')};
    color: ${(props) => (props.$isUser ? '#ffffff' : '#333333')};
    word-break: break-word;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

    /* ★ 유저 말풍선은 오른쪽 끝 모서리 뾰족하게 */
    border-bottom-right-radius: ${(props) => (props.$isUser ? '4px' : '18px')};
    /* ★ AI 말풍선은 왼쪽 끝 모서리 뾰족하게 */
    border-bottom-left-radius: ${(props) => (props.$isUser ? '18px' : '4px')};
`;

// ★ 5. 복사 버튼 스타일 추가
export const CopyButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 5px;
    margin-left: 5px; /* 말풍선과 간격 */
    font-size: 1em; /* 아이콘 크기 */
    color: #6c757d;
    opacity: 0.5;
    transition: opacity 0.2s ease, transform 0.2s ease;

    &:hover {
        opacity: 1;
        transform: scale(1.1);
    }
`;

export const ChatInputForm = styled.form`
    display: flex;
    gap: 10px;
`;

export const ChatInput = styled.input`
    flex-grow: 1;
    padding: 12px 15px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    font-size: 1em;

    &:focus {
        border-color: #007bff;
        outline: none;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
`;

export const SendButton = styled.button`
    padding: 12px 20px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    font-weight: bold;
    transition: background-color 0.2s ease;

    &:hover:not(:disabled) {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #a0cfff;
        cursor: not-allowed;
    }
`;

// ★ 6. 로딩 애니메이션 (점 3개)
const bounceAnimation = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1.0);
  }
`;

// ★ 7. LoadingIndicator 스타일 수정 (텍스트 -> 애니메이션)
export const LoadingIndicator = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px; /* 아바타랑 간격 */
    padding: 5px 0; /* 위아래 약간 여유 */

    & > div {
        /* 점들을 감싸는 컨테이너 */
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px; /* 말풍선 높이랑 비슷하게 */
        padding: 0 10px;
    }

    span {
        width: 8px;
        height: 8px;
        margin: 0 3px;
        background-color: #888;
        border-radius: 50%;
        display: inline-block;
        animation: ${bounceAnimation} 1.4s infinite ease-in-out both;
    }

    span:nth-child(1) {
        animation-delay: -0.32s;
    }
    span:nth-child(2) {
        animation-delay: -0.16s;
    }
`;
