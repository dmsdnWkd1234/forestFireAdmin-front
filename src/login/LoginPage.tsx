import { useState, useEffect } from 'react';

const PASSKEY = import.meta.env.VITE_PASSKEY; // 이거 원하는 키로 바꿔

export default function LoginPage() {
    const [input, setInput] = useState('');
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('chad_auth');
        if (saved === 'true') setIsAuth(true);
    }, []);

    const handleLogin = () => {
        if (input === PASSKEY) {
            localStorage.setItem('chad_auth', 'true');
            setIsAuth(true);
        } else {
            alert('Wrong Key, PUSSY');
        }
    };

    if (isAuth) {
        return <div className="p-4 text-2xl">🚀 Welcome, GIGA CHAD</div>;
    }

    return (
        <div className="p-8 flex flex-col items-center justify-center h-screen gap-4">
            <input
                type="password"
                placeholder="Enter Access Key"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border border-gray-500 p-2 rounded"
            />
            <button onClick={handleLogin} className="bg-black text-white p-2 rounded">
                UNLOCK
            </button>
        </div>
    );
}
