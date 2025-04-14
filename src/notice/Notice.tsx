import { useEffect, useState } from 'react';
import * as S from '../style/notice/notice';

interface Notice {
    id: number;
    title: string;
    content: string;
    type: string;
    created_at: string;
    updated_at: string;
}

export default function NoticeBoard() {
    const [notices, setNotices] = useState<Notice[]>([]);

    useEffect(() => {
        fetch('https://forestfireadmin-back.onrender.com/notice')
            .then((res) => res.json())
            .then((data) => setNotices(data.reverse()))
            .catch((err) => console.error('공지 불러오기 실패:', err));
    }, []);

    return (
        <div>
            <S.root>
                <S.addNoticeButton>
                    <S.createNoticeLink href="/createNotice">공지 작성</S.createNoticeLink>
                </S.addNoticeButton>
                {notices.length === 0 ? (
                    <p>등록된 공지가 없습니다.</p>
                ) : (
                    <S.showNoticeListRootBox>
                        <h1>공지 목록</h1>
                        <S.listHeaderBox>
                            <S.listId weight={true}>번호</S.listId>
                            <S.listType weight={true}>카테고리</S.listType>
                            <S.listTitle weight={true}>제목</S.listTitle>
                            <S.listDate weight={true}>시간</S.listDate>
                        </S.listHeaderBox>
                        {notices.map((notice) => (
                            <S.listRootBox key={notice.id}>
                                <S.listId>{notice.id}</S.listId>
                                <S.listType>{notice.type}</S.listType>
                                <S.listTitle>{notice.title}</S.listTitle>
                                <S.listDate>
                                    {notice.created_at
                                        ? new Date(notice.created_at).toISOString().slice(0, 19).replace('T', ' ')
                                        : '날짜 없음'}
                                </S.listDate>
                            </S.listRootBox>
                        ))}
                    </S.showNoticeListRootBox>
                )}
            </S.root>
        </div>
    );
}
