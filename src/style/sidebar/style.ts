import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const menuRootContainer = styled.nav`
    /* ... 이전 코드와 동일 ... */
    width: 350px;
    height: 100%;
    padding: 16px;
    margin: 20px 0 0 20px;
    background: #ffffff;
    border-right: 1px solid #eaeaea;
    border-radius: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 8px;

    @media (max-width: 768px) {
        width: 100%; // [핵심] 너비를 100%로
        height: auto; // 높이 자동
        margin: 0; // [핵심] 여백 제거
        border-radius: 0; // 둥근 모서리 제거
        border-right: none; // 오른쪽 테두리 제거
        border-bottom: 1px solid #eaeaea; // 대신 하단 테두리 추가
    }
`;

export const SidebarTitle = styled.h1`
    /* ... 이전 코드와 동일 ... */
    font-size: 1.2rem;
    font-weight: 600;
    padding: 10px 12px;
    margin-bottom: 10px;
    border-bottom: 1px solid black;
`;

// 2. 메뉴 아이템 스타일 (이 방식으로 통일)
export const StyledNavLink = styled(NavLink)`
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 10px;
    text-decoration: none;
    color: #555;
    font-weight: 500;
    transition: background-color 0.2s ease, color 0.2s ease;

    &:hover {
        background-color: #f2f2f7;
    }

    &.active {
        background-color: #e5e5ea;
        color: #000;
        font-weight: 600;
    }
`;

export const MenuIcon = styled.span`
    font-size: 1.2rem;
    display: flex;
    align-items: center;
`;

export const MenuText = styled.span`
    margin-left: 12px;
    font-size: 0.95rem;
    display: flex;
`;

export const BetaIconContainer = styled.div`
    width: 25px;
    height: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #a0a0a0;
    font-size: 0.7rem;
    margin-left: 4px;
`;
