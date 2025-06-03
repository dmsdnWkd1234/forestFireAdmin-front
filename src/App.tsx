import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import * as S from './style/main/style';
import Report from './reports/Report.tsx';
import GoogleMapComponent from './map/GoogleMap.tsx';
import Home from './home/Home.tsx';
import Notice from './notice/Notice.tsx';
import CreateNotice from './notice/CreateNotice.tsx';
import Login from './login/LoginPage.tsx';

function App() {
    // 인증 체크 함수 (localStorage 기반)
    const isAuthenticated = () => localStorage.getItem('chad_auth') === 'true';

    return (
        <Router>
            <S.Root>
                {isAuthenticated() ? (
                    <>
                        <nav style={{ marginRight: '5%' }}>
                            <h1>지능형 산불 감지 시스템</h1>
                            <br />
                            <h2>관리자 페이지</h2>

                            <S.menuRootContainer>
                                <Link to="/home">
                                    <S.menuBtnSection>
                                        <S.menuBtn>홈</S.menuBtn>
                                    </S.menuBtnSection>
                                </Link>
                                <Link to="/report">
                                    <S.menuBtnSection>
                                        <S.menuBtn>신고접수</S.menuBtn>
                                    </S.menuBtnSection>
                                </Link>
                                <Link to="/map">
                                    <S.menuBtnSection>
                                        <S.menuBtn>지도</S.menuBtn>
                                    </S.menuBtnSection>
                                </Link>
                                <Link to="/notice">
                                    <S.menuBtnSection>
                                        <S.menuBtn>공지글</S.menuBtn>
                                    </S.menuBtnSection>
                                </Link>
                            </S.menuRootContainer>
                        </nav>

                        <Routes>
                            <Route path="/report" element={<Report />} />
                            <Route path="/map" element={<GoogleMapComponent />} />
                            <Route path="/home" element={<Home />} />
                            <Route path="/notice" element={<Notice />} />
                            <Route path="/createNotice" element={<CreateNotice />} />
                            {/* 기본 경로로 리다이렉트 */}
                            <Route path="*" element={<Navigate to="/home" replace />} />
                        </Routes>
                    </>
                ) : (
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        {/* 로그인 안 했으면 무조건 로그인 페이지로 보내버림 */}
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                )}
            </S.Root>
        </Router>
    );
}

export default App;
