import { useEffect, useState } from 'react';
import type { UpdateNotice } from '../types/notice';

export default function UpdateNotice({ no, onUpdated }: { no: number; onUpdated: () => void }) {
    const [updateState, setUpdateState] = useState(false);
    const [notice, setNotice] = useState<UpdateNotice>({
        id: 0,
        title: '',
        content: '',
        type: '공지',
    });

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}notice/${no}`)
            .then((res) => res.json())
            .then((data) => setNotice(data))
            .catch((err) => console.error('공지 불러오기 실패:', err));
    }, [no, updateState]);

    const updateNotice = () => {
        fetch('forestfireadmin-back-production.up.railway.app/updateNotice', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: no,
                title: notice.title,
                type: notice.type,
                content: notice.content,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result) {
                    alert('수정 성공');
                    onUpdated();
                } else {
                    alert('수정 실패');
                }
            })
            .catch((err) => console.error('글 작성:', err));
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNotice((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            <button
                onClick={() => {
                    if (updateState) updateNotice();
                    setUpdateState(!updateState);
                }}
            >
                {!updateState ? '수정' : '완료'}
            </button>
            <textarea name="title" value={notice.title} onChange={handleChange} readOnly={!updateState} />
            <textarea name="content" value={notice.content} onChange={handleChange} readOnly={!updateState} />
            <select name="type" value={notice.type} onChange={handleChange} disabled={!updateState}>
                <option value="공지" selected>
                    공지
                </option>
                <option value="긴급">긴급</option>
                <option value="대피">대피</option>
            </select>
        </>
    );
}
