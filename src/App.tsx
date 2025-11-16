import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import * as S from './style/main/style';
import Report from './reports/Report.tsx';
import GoogleMapComponent from './map/GoogleMap.tsx';
import Home from './home/Home.tsx';
import Notice from './notice/Notice.tsx';
import Chat from './chat/Chat.tsx';
import Login from './login/LoginPage.tsx';
import Sidebar from './sidebar/Sidebar.tsx';
import Dashboard from './dashboard/Dashboard';

function App() {
    const isAuthenticated = () => localStorage.getItem('chad_auth') === 'true';

    return (
        <Router>
            <S.Root>
                {isAuthenticated() ? (
                    <>
                        <Sidebar />
                        <S.ContentWrapper></S.ContentWrapper>
                        <main style={{ flex: 1, padding: '20px' }}>
                            <Routes>
                                <Route path="/report" element={<Report />} />
                                <Route path="/map" element={<GoogleMapComponent />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/notice" element={<Notice />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/ai" element={<Chat />} />
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
