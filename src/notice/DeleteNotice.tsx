import { useEffect, useState } from 'react';

export default function DeleteNotice({ no }: { no: number }) {
    const [id, setId] = useState(0);

    useEffect(() => {
        settingId();
    }, [no]);

    const settingId = () => {
        setId(no);
    };

    const deleteNotice = () => {
        fetch(`/api/deleteNotice`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
            }),
        })
            .then((res) => res.json())
            .then((result) => (result ? alert('성공적으로 삭제되었습니다') : alert('삭제 실패')))
            .catch((err) => console.error('글 작성:', err));
    };

    return (
        <>
            <button onClick={deleteNotice}>삭제</button>
        </>
    );
}
