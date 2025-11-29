import { useState, useEffect } from 'react';
import * as S from '../style/fireLive/style';

export default function FireLive() {
    const [detections, setDetections] = useState<any[]>([]);
    const [page, setPage] = useState<any>(1);

    // 데이터 설정
    const totalDataCount: any = 60;
    const itemsPerPage: any = 8; // 화면이 좁아졌으므로 한 페이지에 8개 정도가 적당함

    const totalPages: any = Math.ceil(totalDataCount / itemsPerPage);

    useEffect(() => {
        const fetchDetections = () => {
            const startIdx: any = (page - 1) * itemsPerPage;
            const todayStr = new Date().toISOString().slice(0, 10);

            const data: any[] = Array.from({ length: itemsPerPage })
                .map((_: any, i: any) => {
                    const currentId: any = startIdx + i;
                    if (currentId >= totalDataCount) return null;

                    // 가짜 시간 로직
                    const hour = 14 + Math.floor(currentId / 60);
                    const minute = currentId % 60;
                    const second = Math.floor(Math.random() * 60);

                    const formatMin = String(minute).padStart(2, '0');
                    const formatSec = String(second).padStart(2, '0');
                    const fakeTime = `${todayStr} ${hour}:${formatMin}:${formatSec}`;

                    return {
                        id: currentId,
                        reportNo: currentId,
                        time: fakeTime,
                        imgUrl: `https://cam.duckpict.com/static/0-${currentId}.jpg`,
                        isVisible: true,
                    };
                })
                .filter((item: any) => item !== null);

            setDetections(data);
        };

        fetchDetections();
    }, [page]);

    const handlePageChange = (newPage: any) => {
        setPage(newPage);
        // 스크롤을 맨 위가 아니라 리스트 상단으로 올리는 게 좋음 (비디오는 고정이니까)
        // 여기선 간단히 둡니다.
    };

    const handleImageError = (id: any) => {
        setDetections((prev: any[]) =>
            prev.map((item: any) => (item.id === id ? { ...item, isVisible: false } : item))
        );
    };

    return (
        <S.Root>
            {/* [NEW] 좌우 레이아웃 컨테이너 */}
            <S.LayoutContainer>
                {/* 1. 왼쪽: 실시간 CCTV 영상 */}
                <S.VideoSection>
                    <S.VideoHeader>
                        <h2>LIVE 모니터링</h2>
                        <span style={{ fontSize: '12px', color: '#888' }}>mesh-01</span>
                    </S.VideoHeader>
                    <S.VideoWrapper>
                        {/* video_feed는 보통 img 태그로 받아옵니다 (MJPEG) */}
                        <img
                            src="https://cam.duckpict.com/video_feed"
                            alt="Live Camera Feed"
                            // 영상 로드 실패 시 스타일 처리
                            onError={(e: any) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.style.backgroundColor = '#000';
                                e.target.parentElement.innerHTML =
                                    '<div style="color:white; display:flex; justify-content:center; align-items:center; height:100%;">신호 없음 (No Signal)</div>';
                            }}
                        />
                        {/* 좌측 상단 REC 표시 */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '15px',
                                left: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                textShadow: '0 1px 2px black',
                            }}
                        >
                            <div
                                style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'red' }}
                            ></div>
                            REC
                        </div>
                    </S.VideoWrapper>
                </S.VideoSection>

                {/* 2. 오른쪽: 감지 리스트 (기존 코드) */}
                <S.showNoticeListRootBox>
                    <S.ListPageHeader>
                        <h1>감지 로그</h1>
                        <S.addNoticeButton onClick={() => window.location.reload()}>새로고침</S.addNoticeButton>
                    </S.ListPageHeader>

                    <S.GridContainer>
                        {detections.map((item: any) => (
                            <S.DetectionCard key={item.id} style={{ display: item.isVisible ? 'block' : 'none' }}>
                                <S.CardImageWrapper>
                                    <S.StatusBadge>화재 감지</S.StatusBadge>
                                    <img
                                        src={item.imgUrl}
                                        alt={`Fire detection ${item.id}`}
                                        onError={(e: any) => handleImageError(item.id)}
                                    />
                                </S.CardImageWrapper>
                                <S.CardHeader>
                                    <S.InfoRow>
                                        <span className="label">신고번호</span>
                                        <span className="value">{item.reportNo}</span>
                                    </S.InfoRow>
                                    <S.InfoRow>
                                        <span className="label">감지시간</span>
                                        <span className="value">{item.time}</span>
                                    </S.InfoRow>
                                </S.CardHeader>
                            </S.DetectionCard>
                        ))}
                    </S.GridContainer>

                    <S.PaginationContainer>
                        {Array.from({ length: totalPages }, (_: any, i: any) => i + 1).map((pageNum: any) => (
                            <S.PageButton
                                key={pageNum}
                                $isActive={page === pageNum}
                                onClick={() => handlePageChange(pageNum)}
                            >
                                {pageNum}
                            </S.PageButton>
                        ))}
                    </S.PaginationContainer>
                </S.showNoticeListRootBox>
            </S.LayoutContainer>
        </S.Root>
    );
}
