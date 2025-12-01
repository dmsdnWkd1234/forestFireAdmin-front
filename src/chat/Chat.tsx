import React, { useState, useRef, useEffect } from 'react';
import * as S from '../style/chat/style'; // 네 스타일 파일 경로
import ReactMarkdown from 'react-markdown';

function Chat() {
    // ★ 백엔드 API 호출 로직
    const callChatbotApi = async (message: string, history: []) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACK_URL}api/postToAi`, {
                // const response = await fetch(`http://localhost:3002/api/postToAi`, {
                // 네 백엔드 주소
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message, history: history }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'AI 서버가 맛이 갔다.');
            }

            const data = await response.json();
            return { success: true, reply: data.reply };
        } catch (error) {
            console.error('챗봇 API 에러:', error);
            return { success: false, error: '알 수 없는 에러' };
        }
    };

    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    // ★ 1. '복사됨' 상태를 관리할 state (index 번호로 관리)
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const chatWindowRef = useRef<HTMLDivElement>(null);

    const addMessageToHistory = (sender: string, text: string) => {
        setChatHistory((prevHistory) => [...prevHistory, { sender, text }]);
    };

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [chatHistory]);

    // ★ 2. 복사 버튼 로직 수정 (alert 대신 state 변경)
    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text).then(
            () => {
                setCopiedIndex(index); // 복사 성공 시, 현재 메시지 index를 state에 저장
                setTimeout(() => {
                    setCopiedIndex(null); // 2초 뒤에 null로 초기화
                }, 2000);
            },
            (err) => {
                alert('복사 실패했다; 콘솔 봐라.'); // 실패 시엔 걍 alert 띄우자
                console.error('복사 실패:', err);
            }
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const currentMessage = message.trim();
        if (isLoading || !currentMessage) return;

        setIsLoading(true);

        const currentHistory: any = chatHistory;

        addMessageToHistory('user', currentMessage);
        setMessage('');

        const result = await callChatbotApi(currentMessage, currentHistory);

        if (result.success) {
            addMessageToHistory('ai', result.reply);
        } else {
            addMessageToHistory('ai', `에러: ${result.error}`);
        }
        setIsLoading(false);
    };

    return (
        <S.PageContainer>
            <S.Card>
                <S.CardHeader>AI 분석</S.CardHeader>
                <S.ChatWindow ref={chatWindowRef}>
                    {chatHistory.length === 0 && !isLoading && (
                        <div style={{ textAlign: 'center', color: '#6c757d', padding: '10px' }}>
                            AI에게 질문해보세요
                        </div>
                    )}

                    {chatHistory.map((chat, index) => (
                        <S.ChatMessage key={index} $isUser={chat.sender === 'user'}>
                            {chat.sender === 'ai' && <S.Avatar />}

                            <S.MessageContent $isUser={chat.sender === 'user'}>
                                <S.MessageBubble $isUser={chat.sender === 'user'}>
                                    {/* ★ 2. 여기가 핵심: 텍스트 대신 ReactMarkdown 컴포넌트 사용 */}
                                    {chat.sender === 'user' ? (
                                        chat.text // 유저 메시지는 마크다운 필요 없음
                                    ) : (
                                        <ReactMarkdown>{chat.text}</ReactMarkdown> // AI 메시지만 변환
                                    )}
                                </S.MessageBubble>

                                {/* ★ 3. 복사 버튼 UI 수정 (조건부 렌더링) */}
                                {chat.sender === 'ai' && (
                                    <S.CopyButton onClick={() => handleCopy(chat.text, index)}>
                                        {copiedIndex === index ? '복사됨!' : '📋'}
                                    </S.CopyButton>
                                )}
                            </S.MessageContent>
                        </S.ChatMessage>
                    ))}

                    {isLoading && (
                        <S.LoadingIndicator>
                            <S.Avatar />
                            <div>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </S.LoadingIndicator>
                    )}
                </S.ChatWindow>

                <S.ChatInputForm onSubmit={handleSubmit}>
                    <S.ChatInput
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={isLoading ? 'AI가 생각 중...' : '질문을 입력하세요'}
                        disabled={isLoading}
                    />
                    <S.SendButton type="submit" disabled={isLoading}>
                        전송
                    </S.SendButton>
                </S.ChatInputForm>
            </S.Card>
        </S.PageContainer>
    );
}

export default Chat;
