import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import * as S from './style/main/style';
import Report from './reports/Report.tsx';
import GoogleMapComponent from './map/GoogleMap.tsx';
import Home from './Home.tsx';
import Notice from './notice/Notice.tsx';
import CreateNotice from './notice/CreateNotice.tsx';

function App() {
    return (
        <Router>
            <nav>
                <h1>관리자용 페이지입니다</h1>
                <S.menuRootContainer>
                    <S.menuBtnSection>
                        <Link to="/home">
                            <S.menuBtn>홈</S.menuBtn>
                        </Link>
                    </S.menuBtnSection>
                    <S.menuBtnSection>
                        <Link to="/report">
                            <S.menuBtn>신고접수</S.menuBtn>
                        </Link>
                    </S.menuBtnSection>
                    <S.menuBtnSection>
                        <Link to="/map">
                            <S.menuBtn>지도</S.menuBtn>
                        </Link>
                    </S.menuBtnSection>
                    <S.menuBtnSection>
                        <Link to="/notice">
                            <S.menuBtn>공지글</S.menuBtn>
                        </Link>
                    </S.menuBtnSection>
                </S.menuRootContainer>
            </nav>

            <Routes>
                <Route path="/report" element={<Report />} />
                <Route path="/map" element={<GoogleMapComponent />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Notice" element={<Notice />} />
                <Route path="/CreateNotice" element={<CreateNotice />} />
            </Routes>
        </Router>
    );
}

export default App;
