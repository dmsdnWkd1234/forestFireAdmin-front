import { useEffect, useState } from 'react';
// import { dev_mode } from '../types/dev';
import * as S from '../style/home/HomeContainer';
import type { Report } from '../types/report';
import { Link } from 'react-router-dom';

export default function HomeReporteSection() {
    const [reports, setReports] = useState<Report[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}api/report`)
            // fetch(dev_mode + 'api/report')
            .then((res) => res.json())
            .then((data) => setReports(data.slice(0, 3))) // 최신 3개만 표시
            .catch((err) => console.error('신고 내역 불러오기 실패:', err));
    }, []);

    return (
        <S.Container>
            <S.Title>최근 신고 내역</S.Title>
            {reports.length === 0 ? (
                <S.EmptyMessage>신고 내역이 없습니다.</S.EmptyMessage>
            ) : (
                <S.Grid>
                    {reports.map((report) => (
                        <S.Card key={report.id}>
                            <Link to={'/report'} style={{ textDecoration: 'none' }}>
                                <S.Field>
                                    <strong>신고 번호:</strong> {report.id}
                                </S.Field>

                                <S.Field>
                                    <strong>일시:</strong> {report.Time.split('.')[0].replace('T', ' ')}
                                </S.Field>
                            </Link>
                        </S.Card>
                    ))}
                </S.Grid>
            )}
        </S.Container>
    );
}
