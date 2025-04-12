import { useEffect, useState } from 'react';

interface Notice {
    id: number;
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
}

export default function NoticeBoard() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch('https://forestfireadmin-back.onrender.com/notice')
            .then((res) => res.json())
            .then((data) => setNotices(data))
            .catch((err) => console.error('공지 불러오기 실패:', err));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        const newNotice: Notice = {
            id: notices.length + 1,
            title,
            content,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        setNotices([newNotice, ...notices]);
        setTitle('');
        setContent('');
    };

    return (
        <div>
            <h2>공지 작성</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="제목 입력" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="내용 입력" value={content} onChange={(e) => setContent(e.target.value)} />
                <button type="submit">등록</button>
            </form>

            <h2>공지 목록</h2>
            {notices.length === 0 ? (
                <p>등록된 공지가 없습니다.</p>
            ) : (
                <ul>
                    {notices.map((notice) => (
                        <li key={notice.id}>
                            <strong>{notice.title}</strong> ({new Date(notice.created_at).toLocaleDateString()})
                            <p>{notice.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
