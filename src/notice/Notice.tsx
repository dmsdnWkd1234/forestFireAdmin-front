import { useEffect, useState } from 'react'; // useState가 import 되어 있는지 확인
import * as S from '../style/notice/notice';
import Modal from './Modal';
import CreateNotice from './CreateNotice';
import ReadNotice from './ReadNotice';
import { Notice } from '../types/notice';
// import { dev_mode } from '../types/dev';

export default function NoticeBoard() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [noticeId, setNoticeId] = useState(0);
    const [isContentModalOpen, setIsContentModalOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- 페이지네이션 상태 추가 ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7; // 페이지당 10개 항목
    // ---
    const data = 0;
    useEffect(() => {
        // fetch(`${dev_mode}api/notice`)
        fetch(`${import.meta.env.VITE_BACK_URL}api/notice`)
            .then((res) => res.json())
            .then((data) => setNotices(data.reverse()))
            .catch((err) => console.error('공지 불러오기 실패:', err));

        console.log(notices);
    }, []);

    // 날짜 포맷 함수
    const formatDateTime = (dateString: string) => {
        if (!dateString) return '날짜 없음';
        try {
            const date = new Date(dateString);
            return date.toISOString().slice(0, 19).replace('T', ' ');
        } catch (error) {
            return '날짜 형식 오류';
        }
    };

    // --- 페이지네이션 로직 ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentNotices = notices.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(notices.length / itemsPerPage);

    // 페이지 번호 렌더링 함수
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <S.PageButton
                    key={i}
                    $isActive={i === currentPage} // $isActive prop 사용
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </S.PageButton>
            );
        }
        return pageNumbers;
    };
    // ---

    return (
        <S.root>
            {/* 모달 */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <CreateNotice />
            </Modal>
            <Modal isOpen={isContentModalOpen} onClose={() => setIsContentModalOpen(false)}>
                <ReadNotice id={noticeId} />
            </Modal>

            {/* 공지 목록 카드 */}
            <S.showNoticeListRootBox>
                <S.ListPageHeader>
                    <h1>공지 목록</h1>
                    <S.addNoticeButton onClick={() => setIsModalOpen(true)}>공지 작성</S.addNoticeButton>
                </S.ListPageHeader>

                {notices.length === 0 ? (
                    <p>등록된 공지가 없습니다.</p>
                ) : (
                    <div>
                        {/* 목록 헤더 */}
                        <S.listHeaderBox>
                            <S.listId weight={true}>번호</S.listId>
                            <S.listType weight={true}>카테고리</S.listType>
                            <S.listTitle weight={true}>제목</S.listTitle>
                            <S.listDate weight={true}>작성일시</S.listDate>
                        </S.listHeaderBox>

                        {/* 목록 본문 - currentNotices로 변경 */}
                        {currentNotices.map((notice) => (
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
                                <S.listDate>{formatDateTime(notice.created_at)}</S.listDate>
                            </S.listRootBox>
                        ))}
                    </div>
                )}

                {/* --- 페이지네이션 컨트롤 --- */}
                {notices.length > 0 && totalPages > 1 && (
                    <S.PaginationContainer>
                        <S.PageButton onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                            이전
                        </S.PageButton>
                        {renderPageNumbers()}
                        <S.PageButton
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            다음
                        </S.PageButton>
                    </S.PaginationContainer>
                )}
                {/* --- */}
            </S.showNoticeListRootBox>
        </S.root>
    );
}
