import { useState, useEffect } from 'react';
import * as S from '../style/notice/readUpdateNotice'; // 새로 만든 스타일 파일 import

export default function DeleteNotice({ no }: { no: number }) {
    const [id, setId] = useState(0);

    useEffect(() => {
        settingId();
    }, [no]);

    const settingId = () => {
        setId(no);
    };

    const deleteNotice = () => {
        if (!window.confirm('정말로 이 공지를 삭제하시겠습니까?')) {
            return;
        }

        fetch(`${import.meta.env.VITE_BACK_URL}api/deleteNotice`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result) {
                    alert('성공적으로 삭제되었습니다');
                    window.location.reload(); // 간단하게 페이지 새로고침
                } else {
                    alert('삭제 실패');
                }
            })
            .catch((err) => console.error('글 삭제:', err));
    };

    return (
        <>
            {/* DangerButton 스타일 적용 */}
            <S.DangerButton onClick={deleteNotice}>삭제</S.DangerButton>
        </>
    );
}
