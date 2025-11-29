// /LoginPage/index.jsx

import { useState, useEffect } from 'react';
import { LoginContainer, LoginBox, Input, Button, WelcomeMessage } from '../style/login/style';

const PASSKEY = import.meta.env.VITE_PASSKEY;

export default function LoginPage() {
    const [input, setInput] = useState('');
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('chad_auth');
        // 이미 로그인 된 상태라면 바로 true 처리 (보통 상위 컴포넌트에서 막겠지만 안전장치)
        if (saved === 'true') setIsAuth(true);
    }, []);

    const handleLogin = (e: any) => {
        e.preventDefault();

        if (input === PASSKEY) {
            // 1. 로컬 스토리지에 인증 정보 저장
            localStorage.setItem('chad_auth', 'true');

            // 2. UI를 '환영합니다' 화면으로 변경
            setIsAuth(true);

            // 3. 1초(1000ms) 뒤에 자동으로 페이지 새로고침
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            alert('잘못된 키입니다. 다시 시도해주세요.');
            setInput('');
        }
    };

    if (isAuth) {
        return (
            <LoginContainer>
                <WelcomeMessage>
                    🚀 환영합니다 관리자님.
                    <br />
                    잠시만 기다려주세요...
                </WelcomeMessage>
            </LoginContainer>
        );
    }

    return (
        <LoginContainer>
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
