import { useEffect, useState } from 'react';
import type { Report } from '../types/report';

export default function Report() {
    const [reports, setReports] = useState<Report[]>([]);

    useEffect(() => {
        fetch('https://forestfireadmin-back.onrender.com/report')
            .then((res) => res.json())
            .then((data) => setReports(data))
            .catch((err) => console.error('공지 불러오기 실패:', err));
    }, []);
    return (
        <div>
            <h2>신고 내역</h2>
            {reports.length === 0 ? (
                <p>신고 내역이 없습니다.</p>
            ) : (
                <ul>
                    {reports.map((report) => (
                        <li key={report.id}>
                            <strong>신고 번호:{report.id}</strong>
                            <br></br>
                            <strong>메쉬 번호:{report.mesh_id}</strong>
                            <br></br>
                            <strong>신고 유형:{report.type}</strong>
                            <br></br>
                            일시:{report.created_at}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
