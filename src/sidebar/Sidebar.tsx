import * as S from '../style/main/style'; // 기존 스타일 파일 재사용
import { GoHome, GoGraph } from 'react-icons/go';
import { LuSiren } from 'react-icons/lu';
import { BsChatLeftText } from 'react-icons/bs';
import { BiBroadcast } from 'react-icons/bi';
import { RiRobot3Line } from 'react-icons/ri';
import { FaFlask } from 'react-icons/fa';

// const menuItems = [
//     { path: '/home', icon: <GoHome />, name: '홈' },
//     { path: '/map', icon: <BiBroadcast />, name: '메쉬' },
//     { path: '/report', icon: <LuSiren />, name: '신고' },
//     { path: '/notice', icon: <BsChatLeftText />, name: '공지' },
// ];

function Sidebar() {
    return (
        <S.menuRootContainer>
            <S.SidebarTitle>관리자 패널</S.SidebarTitle>

            <S.StyledNavLink to="/home">
                <S.MenuIcon>
                    <GoHome />
                </S.MenuIcon>
                <S.MenuText>홈</S.MenuText>
            </S.StyledNavLink>

            <S.StyledNavLink to="/map">
                <S.MenuIcon>
                    <BiBroadcast />
                </S.MenuIcon>
                <S.MenuText>메쉬</S.MenuText>
            </S.StyledNavLink>

            <S.StyledNavLink to="/report">
                <S.MenuIcon>
                    <LuSiren />
                </S.MenuIcon>
                <S.MenuText>신고</S.MenuText>
            </S.StyledNavLink>

            <S.StyledNavLink to="/notice">
                <S.MenuIcon>
                    <BsChatLeftText />
                </S.MenuIcon>
                <S.MenuText>공지</S.MenuText>
            </S.StyledNavLink>

            <S.StyledNavLink to="/dashboard">
                <S.MenuIcon>
                    <GoGraph />
                    <S.MenuText>대시보드</S.MenuText>
                </S.MenuIcon>
            </S.StyledNavLink>

            <S.StyledNavLink to="/asktoai">
                <S.MenuIcon>
                    <RiRobot3Line />
                    <S.MenuText>
                        AI 분석
                        <S.BetaIconContainer>beta</S.BetaIconContainer>
                    </S.MenuText>
                </S.MenuIcon>
            </S.StyledNavLink>
        </S.menuRootContainer>
    );
}

export default Sidebar;
