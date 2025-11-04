import styled, { keyframes } from 'styled-components';

interface isUser {
    $isUser: boolean;
}

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;

    @media (max-width: 768px) {
        margin: 0;
        padding: 0; /* 모바일에선 여백 없음 */
        gap: 0;
    }
`;

export const Card = styled.div`
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 25px;
    min-height: 200px;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        border-radius: 0; /* 화면 꽉 채우게 */
        box-shadow: none;
        padding: 15px; /* 모바일 패딩 줄임 */
        min-height: 100vh; /* 모바일에선 화면 꽉 채움 */
    }
`;

export const CardHeader = styled.h2`
    font-size: 1.5em;
    color: #333;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;

    @media (max-width: 768px) {
        font-size: 1.25em; /* 모바일 폰트 크기 줄임 */
        margin-bottom: 15px;
    }
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
    gap: 15px;

    @media (max-width: 768px) {
        padding: 10px; /* 모바일 채팅창 패딩 줄임 */
    }
`;

export const Avatar = styled.div`
    width: 80px;
    height: 80px;
    min-width: 80px; /* ★ 네가 80으로 키웠길래 찌그러짐 방지용 */
    border-radius: 50%;
    background-color: transparent;
    background-image: url('/images/weather_fairy_bot.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    flex-shrink: 0;

    @media (max-width: 768px) {
        /* ★ 모바일에선 좆나 크니까 다시 40px로 줄임 */
        width: 40px;
        height: 40px;
        min-width: 40px;
    }
`;

export const ChatMessage = styled.div<isUser>`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    justify-content: ${(props) => (props.$isUser ? 'flex-end' : 'flex-start')};
`;

export const MessageContent = styled.div<isUser>`
    display: flex;
    align-items: center;
    flex-direction: ${(props) => (props.$isUser ? 'row-reverse' : 'row')};

    /* ★★★ 네 코드 찐빠난 거 수정: 80px 아바타 + 10px 갭 = 90px 빼야지 60px이 아님 */
    max-width: calc(100% - 90px);

    @media (max-width: 768px) {
        /* ★ 모바일에선 40px 아바타 + 10px 갭 = 50px */
        max-width: calc(100% - 50px);
    }
`;

export const MessageBubble = styled.div<isUser>`
    max-width: 100%;
    padding: 10px 15px;
    border-radius: 18px;
    background-color: ${(props) => (props.$isUser ? '#007bff' : '#e0e0e0')};
    color: ${(props) => (props.$isUser ? '#ffffff' : '#333333')};
    word-break: break-word;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    border-bottom-right-radius: ${(props) => (props.$isUser ? '4px' : '18px')};
    border-bottom-left-radius: ${(props) => (props.$isUser ? '18px' : '4px')};

    /* 마크다운 태그 스타일 (이건 그대로) */
    & p {
        margin: 0 0 5px 0;
        &:last-child {
            margin-bottom: 0;
        }
    }
    & ul,
    & ol {
        margin: 5px 0;
        padding-left: 20px;
    }
    & li {
        margin-bottom: 3px;
    }
    & pre {
        background-color: #f0f0f0;
        color: #333;
        padding: 10px;
        border-radius: 5px;
        overflow-x: auto;
    }
    & code {
        font-family: 'Courier New', Courier, monospace;
        background-color: #eee;
        padding: 2px 4px;
        border-radius: 3px;
    }

    @media (max-width: 768px) {
        padding: 8px 12px; /* 모바일 말풍선 패딩 줄임 */

        /* 모바일에선 폰트도 살짝 */
        & p,
        & li {
            font-size: 0.95em;
        }
    }
`;

export const CopyButton = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 5px;
    margin-left: 5px;
    font-size: 1em;
    color: #6c757d;
    opacity: 0.5;
    transition: opacity 0.2s ease, transform 0.2s ease;

    &:hover {
        opacity: 1;
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        font-size: 0.9em; /* 아이콘/텍스트 크기 살짝 줄임 */
        padding: 3px;
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

    @media (max-width: 768px) {
        padding: 10px 12px; /* 모바일 입력창 패딩 줄임 */
        font-size: 0.95em;
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

    @media (max-width: 768px) {
        padding: 5px 5px; /* 모바일 버튼 패딩 줄임 */
        font-size: 0.95em;
    }
`;

// ... (bounceAnimation은 그대로) ...
const bounceAnimation = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1.0);
  }
`;

export const LoadingIndicator = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 5px 0;

    & > div {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        padding: 0 10px;

        @media (max-width: 768px) {
            /* ★ 모바일 아바타가 40px로 줄어도, 말풍선 높이는 똑같이 40px로 유지되니까 여긴 안 고쳐도 됨 */
        }
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
