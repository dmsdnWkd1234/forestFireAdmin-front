// /LoginPage/styles.js

import styled from 'styled-components';

// 화면 전체를 차지하고, 컨텐츠를 중앙 정렬시키는 역할
export const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #f0f2f5; // 배경색을 살짝 주어 박스가 돋보이게 함
`;

// 실제 로그인 폼이 들어갈 둥근 박스
export const LoginBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px; // 내부 요소(input, button) 사이의 간격

    background-color: white;
    padding: 32px 24px; // 상하, 좌우 패딩
    border-radius: 12px; // 둥근 모서리
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); // 입체감을 위한 그림자 효과

    /* --- 모바일 퍼스트 --- */
    /* 기본 스타일 (모바일) */
    width: 90%;
    max-width: 400px; // 모바일 화면이 너무 넓어도 박스가 과하게 커지지 않도록

    /* PC 화면 (768px 이상) */
    @media (min-width: 768px) {
        width: 400px; // PC에서는 고정 너비
        padding: 40px;
    }
`;

// Passkey 입력창
export const Input = styled.input`
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-sizing: border-box; // padding, border가 너비에 포함되도록

    &:focus {
        outline: none; // 기본 파란색 아웃라인 제거
        border-color: #000; // 포커스 시 검은색 테두리
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1); // 은은한 포커스 효과
    }
`;

// 로그인 버튼
export const Button = styled.button`
    width: 100%;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: black;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s; // 부드러운 색상 전환 효과

    &:hover {
        background-color: #333; // 마우스 올렸을 때 색상 변경
    }

    &:active {
        transform: scale(0.98); // 클릭 시 살짝 작아지는 효과
    }
`;

export const WelcomeMessage = styled.div`
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    line-height: 1.5; // 줄 간격
    color: #333;
`;
