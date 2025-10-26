import { useEffect, useState } from 'react';
// import { dev_mode } from '../types/dev';
import * as S from '../style/home/HomeContainer';
import type { Notice } from '../types/notice';
import { Link } from 'react-router-dom';

export default function HomeNoticeSection() {
    const [notices, setNotices] = useState<Notice[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}api/notice`)
            // fetch(`${dev_mode}api/notice`)
            .then((res) => res.json())
            .then((data) => setNotices(data.reverse().slice(0, 3))) // 최신 3개만
            .catch((err) => console.error('공지 불러오기 실패:', err));
    }, []);

    return (
        <S.Container>
            <S.Title>최근 공지사항</S.Title>
            {notices.length === 0 ? (
                <S.EmptyMessage>공지사항이 없습니다.</S.EmptyMessage>
            ) : (
                <S.Grid>
                    {notices.map((notice) => (
                        <Link to={'/notice'} style={{ textDecoration: 'none' }}>
                            <S.Card key={notice.id}>
                                <S.Field>
                                    <strong>제목:</strong> {notice.title}
                                </S.Field>

                                <S.Field>
                                    <strong>작성일:</strong> {new Date(notice.created_at).toLocaleString()}
                                </S.Field>
                            </S.Card>
                        </Link>
                    ))}
                </S.Grid>
            )}
        </S.Container>
    );
}
