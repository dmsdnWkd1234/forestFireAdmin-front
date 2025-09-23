'use client';
import { useEffect, useState } from 'react';
import * as S from '../style/report/style';
import type { Report } from '../types/report';
// import { dev_mode } from '../types/dev';

const ITEMS_PER_PAGE = 9;

export default function Report() {
    const [reports, setReports] = useState<Report[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // fetch(dev_mode + 'api/report')
        fetch(`${import.meta.env.VITE_BACK_URL}api/report`)
            .then((res) => res.json())
            .then((data) => setReports(data))
            .catch((err) => console.error('공지 불러오기 실패:', err));
    }, []);

    const totalPages = Math.ceil(reports.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = reports.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <S.Container>
            <S.Title>신고 내역</S.Title>
            {reports.length === 0 ? (
                <S.EmptyMessage>신고 내역이 없습니다.</S.EmptyMessage>
            ) : (
                <>
                    <S.GridList>
                        {currentItems.map((report) => (
                            <S.ListItem key={report.id}>
                                <S.Field>
                                    <strong>신고 번호:</strong> {report.id}
                                </S.Field>
                                <S.Field>
                                    <strong>메쉬 번호:</strong> {report.mesh_id}
                                </S.Field>
                                <S.Field>
                                    <strong>신고 유형:</strong> {report.type}
                                </S.Field>
                                <S.Field>
                                    <strong>일시:</strong> {report.created_at}
                                </S.Field>
                            </S.ListItem>
                        ))}
                    </S.GridList>
                    <S.Pagination>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <S.PageButton
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                active={currentPage === i + 1}
                            >
                                {i + 1}
                            </S.PageButton>
                        ))}
                    </S.Pagination>
                </>
            )}
        </S.Container>
    );
}
