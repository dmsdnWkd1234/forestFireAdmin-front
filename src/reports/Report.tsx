'use client';
import { useEffect, useState, useMemo } from 'react';
import * as S from '../style/report/style';
import type { Report } from '../types/report';

const ITEMS_PER_PAGE = 9; // 페이지당 항목 수는 유지

// 신고 유형을 명확히 정의하고 필터링에 사용할 수 있도록 배열로 만듭니다.
const REPORT_TYPES = ['전체', '메쉬 신고', '조난 사고', '부상 사고', '자연재해'];

export default function Report() {
    const [reports, setReports] = useState<Report[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilter, setActiveFilter] = useState('전체'); // 활성 필터 상태 추가

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}api/report`)
            .then((res) => res.json())
            .then((data) => setReports(data))
            .catch((err) => console.error('신고 내역 불러오기 실패:', err));
    }, []);

    // 필터링된 신고 목록을 계산하는 useMemo
    const filteredReports = useMemo(() => {
        if (activeFilter === '전체') {
            return reports;
        }
        return reports.filter((report) => report.type === activeFilter);
    }, [reports, activeFilter]);

    // 필터링된 목록을 기준으로 페이지네이션 계산
    const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = filteredReports.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // 필터 변경 핸들러
    const handleFilterChange = (filterType: string) => {
        setActiveFilter(filterType);
        setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
    };

    return (
        <S.Container>
            <S.Title>신고 내역</S.Title>

            <S.FilterContainer>
                {REPORT_TYPES.map((type) => (
                    <S.FilterButton
                        key={type}
                        onClick={() => handleFilterChange(type)}
                        active={activeFilter === type}
                        typeColor={
                            type === '메쉬 신고'
                                ? '#2196F3' // 파란색
                                : type === '조난 사고'
                                ? '#FFC107' // 노란색
                                : type === '부상 사고'
                                ? '#F44336' // 빨간색
                                : type === '자연재해'
                                ? '#4CAF50' // 초록색
                                : '#607D8B' // 전체 및 기본 (회색)
                        }
                    >
                        {type}
                    </S.FilterButton>
                ))}
            </S.FilterContainer>

            {filteredReports.length === 0 ? (
                <S.EmptyMessage>선택한 유형의 신고 내역이 없습니다.</S.EmptyMessage>
            ) : (
                <>
                    <S.TableWrapper>
                        <S.ReportTable>
                            <thead>
                                <tr>
                                    <S.TableHeader>신고 번호</S.TableHeader>
                                    <S.TableHeader>메쉬 번호</S.TableHeader>
                                    <S.TableHeader>신고 유형</S.TableHeader>
                                    <S.TableHeader>일시</S.TableHeader>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((report) => (
                                    <S.TableRow key={report.id}>
                                        <S.TableData>{report.id}</S.TableData>
                                        <S.TableData>{report.mesh_id}</S.TableData>
                                        <S.TableData>
                                            <S.TypeBadge
                                                typeColor={
                                                    report.type === '메쉬 신고'
                                                        ? '#2196F3'
                                                        : report.type === '조난 사고'
                                                        ? '#FFC107'
                                                        : report.type === '부상 사고'
                                                        ? '#F44336'
                                                        : report.type === '자연재해'
                                                        ? '#4CAF50'
                                                        : '#607D8B'
                                                }
                                            >
                                                {report.type}
                                            </S.TypeBadge>
                                        </S.TableData>
                                        <S.TableData>
                                            {new Date(report.created_at).toLocaleString('ko-KR', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false, // 24시간 표기
                                            })}
                                        </S.TableData>
                                    </S.TableRow>
                                ))}
                            </tbody>
                        </S.ReportTable>
                    </S.TableWrapper>
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
