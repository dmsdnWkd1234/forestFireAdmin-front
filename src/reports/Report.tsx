'use client';
import { useEffect, useState } from 'react';
import * as S from '../style/report/style';
import type { Report } from '../types/report';

export default function Report() {
    const [reports, setReports] = useState<Report[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACK_URL}api/report`)
            .then((res) => res.json())
            .then((data) => setReports(data))
            .catch((err) => console.error('공지 불러오기 실패:', err));
    }, []);

    return (
        <S.Container>
            <S.Title>신고 내역</S.Title>
            {reports.length === 0 ? (
                <S.EmptyMessage>신고 내역이 없습니다.</S.EmptyMessage>
            ) : (
                <S.List>
                    {reports.map((report) => (
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
                </S.List>
            )}
        </S.Container>
    );
}
