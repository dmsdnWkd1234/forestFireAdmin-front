// /LoginPage/index.jsx

import { useState, useEffect } from 'react';
// 위에서 만든 스타일들을 가져옵니다.
import { LoginContainer, LoginBox, Input, Button, WelcomeMessage } from '../style/login/style';

const PASSKEY = import.meta.env.VITE_PASSKEY;

export default function LoginPage() {
    const [input, setInput] = useState('');
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('chad_auth');
        if (saved === 'true') setIsAuth(true);
    }, []);

    const handleLogin = (e: any) => {
        e.preventDefault(); // form 태그로 감쌀 경우를 대비해 새로고침 방지
        if (input === PASSKEY) {
            localStorage.setItem('chad_auth', 'true');
            setIsAuth(true);
        } else {
            alert('잘못된 키입니다. 다시 시도해주세요.');
            setInput(''); // 틀렸을 경우 입력값 초기화
        }
    };

    if (isAuth) {
        return (
            <LoginContainer>
                <WelcomeMessage>
                    🚀 환영합니다 관리자님.
                    <br />
                    새로고침 해주세요.
                </WelcomeMessage>
            </LoginContainer>
        );
    }

    return (
        // 기본 태그 대신 우리가 만든 스타일 컴포넌트를 사용합니다.
        <LoginContainer>
            {/* form 태그로 감싸주면 Enter 키로도 로그인이 가능해집니다. */}
            <LoginBox as="form" onSubmit={handleLogin}>
                <Input
                    type="password"
                    placeholder="Enter Access Key"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button type="submit">Login</Button>
            </LoginBox>
        </LoginContainer>
    );
}
