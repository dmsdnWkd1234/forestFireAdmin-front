import { useState } from 'react';

interface ReportItem {
    id: number;
    content: string;
    date: string;
    name: string;
}

export default function Report() {
    const [reports, setReports] = useState<ReportItem[]>([
        { id: 1, content: '가까운 산에 산불 발생', date: '2025-03-29', name: '김은호' },
        { id: 2, content: '먼 산에 산불 발생', date: '2025-03-28', name: '김은후' },
    ]);

    return (
        <div>
            <h2>신고 내역</h2>
            {reports.length === 0 ? (
                <p>신고 내역이 없습니다.</p>
            ) : (
                <ul>
                    {reports.map((report) => (
                        <li key={report.id}>
                            <strong>{report.date}</strong>: {report.content}
                            <br></br>
                            {report.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
