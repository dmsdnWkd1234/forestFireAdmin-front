import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import * as S from './style/main/style';
import Report from './reports/Report.tsx';
import GoogleMapComponent from './map/GoogleMap.tsx';
import Home from './home/Home.tsx';
import Notice from './notice/Notice.tsx';
import CreateNotice from './notice/CreateNotice.tsx';

function App() {
    return (
        <Router>
            <S.Root>
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
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Notice" element={<Notice />} />
                    <Route path="/CreateNotice" element={<CreateNotice />} />
                </Routes>
            </S.Root>
        </Router>
    );
}

export default App;
