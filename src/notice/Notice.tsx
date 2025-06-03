import { useEffect, useState } from 'react';
import * as S from '../style/notice/notice';
import Modal from './Modal';
import CreateNotice from './CreateNotice';
import ReadNotice from './ReadNotice';
import { Notice } from '../types/notice';

export default function NoticeBoard() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [noticeId, setNoticeId] = useState(0);
    const [isContentModalOpen, setIsContentModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch(`/notice`)
            .then((res) => res.json())
            .then((data) => setNotices(data.reverse()))
            .catch((err) => console.error('공지 불러오기 실패:', err));
    }, []);

    return (
        <div>
            <S.root>
                <S.addNoticeButton>
                    <S.createNoticeLink onClick={() => setIsModalOpen(true)}>공지 작성</S.createNoticeLink>
                </S.addNoticeButton>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <CreateNotice />
                </Modal>
                <Modal isOpen={isContentModalOpen} onClose={() => setIsContentModalOpen(false)}>
                    <ReadNotice id={noticeId} />
                </Modal>
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
                            <>
                                <S.listRootBox
                                    key={notice.id}
                                    onClick={() => {
                                        setIsContentModalOpen(true);
                                        setNoticeId(notice.id);
                                    }}
                                >
                                    <S.listId>{notice.id}</S.listId>
                                    <S.listType>{notice.type}</S.listType>
                                    <S.listTitle>{notice.title}</S.listTitle>
                                    <S.listDate>
                                        {notice.created_at
                                            ? new Date(notice.created_at).toISOString().slice(0, 19).replace('T', ' ')
                                            : '날짜 없음'}
                                    </S.listDate>
                                </S.listRootBox>
                            </>
                        ))}
                    </S.showNoticeListRootBox>
                )}
            </S.root>
        </div>
    );
}
