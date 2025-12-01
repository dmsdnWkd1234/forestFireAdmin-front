'use client';
import { useEffect, useState, useMemo } from 'react';
import * as S from '../style/report/style';

interface ReportData {
    id: number;
    unicast_address: number;
    Emergency: number;
    Time: string;
}

const ITEMS_PER_PAGE = 9; // 한 페이지에 보여줄 개수
const PAGE_GROUP_SIZE = 5; // 페이지 번호 그룹 크기 (1~5, 6~10...)

export default function Report() {
    const [reports, setReports] = useState<ReportData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    // 필터 상태: '전체' 문자열 혹은 메쉬 번호(숫자)
    const [activeMeshFilter, setActiveMeshFilter] = useState<string | number>('전체');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}api/report`)
            .then((res) => res.json())
            .then((data) => {
                // 데이터 방어 로직: 배열이 아니면 빈 배열 처리
                if (Array.isArray(data)) {
                    setReports(data);
                } else {
                    console.error('데이터 형식이 배열이 아님:', data);
                    setReports([]);
                }
            })
            .catch((err) => {
                console.error('데이터 로딩 실패:', err);
                setReports([]);
            });
    }, []);

    // 1. 메쉬 ID 목록 생성 (필터 버튼용)
    const meshIdList = useMemo(() => {
        const safeReports = reports || [];
        const ids = safeReports.map((r) => r.unicast_address);
        // 중복 제거 및 정렬
        const uniqueIds = [...new Set(ids)].sort((a, b) => a - b);
        return ['전체', ...uniqueIds];
    }, [reports]);

    // 2. 실제 데이터 필터링 로직
    const filteredReports = useMemo(() => {
        const safeReports = reports || [];

        // '전체'일 때는 무조건 모든 데이터를 반환해야 해.
        if (activeMeshFilter === '전체') {
            return safeReports;
        }

        // 특정 메쉬 번호일 때 (문자/숫자 비교 안전하게 == 사용)
        return safeReports.filter((r) => r.unicast_address == activeMeshFilter);
    }, [reports, activeMeshFilter]);

    // 3. 페이지네이션 계산 (현재 페이지의 데이터 자르기)
    const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = filteredReports.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // 4. 페이지 번호 그룹 계산 (핵심!)
    // 현재 페이지가 6이면, (6-1)/5 = 1... -> 1*5 + 1 = 6 (시작번호)
    const currentGroup = Math.ceil(currentPage / PAGE_GROUP_SIZE);
    const startPage = (currentGroup - 1) * PAGE_GROUP_SIZE + 1;
    const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

    // 필터 변경 핸들러
    const handleFilterChange = (meshId: string | number) => {
        setActiveMeshFilter(meshId);
        setCurrentPage(1); // 필터 바꾸면 1페이지로 리셋
    };

    // 페이지 변경 핸들러
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <S.Container>
            <S.Title>긴급 신고 내역</S.Title>

            {/* 필터 버튼 영역 */}
            <S.FilterContainer>
                {meshIdList.map((meshId) => (
                    <S.FilterButton
                        key={meshId}
                        onClick={() => handleFilterChange(meshId)}
                        active={activeMeshFilter === meshId}
                        typeColor={meshId === '전체' ? '#607D8B' : '#FF4D4F'}
                    >
                        {meshId === '전체' ? '전체 보기' : `No.${meshId}`}
                    </S.FilterButton>
                ))}
            </S.FilterContainer>

            {filteredReports.length === 0 ? (
                <S.EmptyMessage>표시할 내역이 없어.</S.EmptyMessage>
            ) : (
                <>
                    <S.TableWrapper>
                        <S.ReportTable>
                            <colgroup>
                                <col width="20%" />
                                <col width="20%" />
                                <col width="30%" />
                                <col width="30%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <S.TableHeader>신고 ID</S.TableHeader>
                                    <S.TableHeader>기기 번호</S.TableHeader>
                                    <S.TableHeader>내용</S.TableHeader>
                                    <S.TableHeader>발생 시각</S.TableHeader>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((report) => (
                                    <S.TableRow key={report.id}>
                                        <S.TableData>{report.id}</S.TableData>
                                        <S.TableData style={{ fontWeight: 'bold' }}>
                                            No.{report.unicast_address}
                                        </S.TableData>
                                        <S.TableData>
                                            <S.TypeBadge typeColor="#D32F2F">
                                                🚨 신고 접수 ({report.Emergency}회)
                                            </S.TypeBadge>
                                        </S.TableData>
                                        <S.TableData>
                                            {report.Time ? report.Time.replace('T', ' ').substring(0, 19) : '-'}
                                        </S.TableData>
                                    </S.TableRow>
                                ))}
                            </tbody>
                        </S.ReportTable>
                    </S.TableWrapper>

                    {/* 5. 페이지네이션 UI (화살표 추가) */}
                    <S.Pagination>
                        {/* 이전 그룹(<) 버튼: active는 항상 false */}
                        <S.PageButton
                            onClick={() => handlePageChange(startPage - 1)}
                            disabled={startPage === 1}
                            style={{ visibility: startPage === 1 ? 'hidden' : 'visible' }}
                            active={false}
                        >
                            &lt;
                        </S.PageButton>

                        {/* 페이지 번호들 */}
                        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNum) => (
                            <S.PageButton
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                // ★ 핵심: 현재 페이지와 번호가 같으면 true!
                                active={currentPage === pageNum}
                            >
                                {pageNum}
                            </S.PageButton>
                        ))}

                        {/* 다음 그룹(>) 버튼: active는 항상 false */}
                        <S.PageButton
                            onClick={() => handlePageChange(endPage + 1)}
                            disabled={endPage === totalPages}
                            style={{ visibility: endPage === totalPages ? 'hidden' : 'visible' }}
                            active={false}
                        >
                            &gt;
                        </S.PageButton>
                    </S.Pagination>
                </>
            )}
        </S.Container>
    );
}
