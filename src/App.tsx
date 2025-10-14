import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import * as S from './style/main/style';
import Report from './reports/Report.tsx';
import GoogleMapComponent from './map/GoogleMap.tsx';
import Home from './home/Home.tsx';
import Notice from './notice/Notice.tsx';
// import CreateNotice from './notice/CreateNotice.tsx';
import Login from './login/LoginPage.tsx';
import Sidebar from './sidebar/Sidebar.tsx'; // Sidebar 컴포넌트 import
import Dashboard from './dashboard/dashboard.tsx';

function App() {
    const isAuthenticated = () => localStorage.getItem('chad_auth') === 'true';

    return (
        <Router>
            <S.Root>
                {isAuthenticated() ? (
                    <>
                        <Sidebar /> {/* 기존 nav 코드를 컴포넌트로 교체 */}
                        <main style={{ flex: 1, padding: '20px' }}>
                            <Routes>
                                <Route path="/report" element={<Report />} />
                                <Route path="/map" element={<GoogleMapComponent />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/notice" element={<Notice />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/asktoai" element={<div>AI 분석 페이지 (개발 중)</div>} />
                                <Route path="*" element={<Navigate to="/home" replace />} />
                            </Routes>
                        </main>
                    </>
                ) : (
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                )}
            </S.Root>
        </Router>
    );
}

export default App;
