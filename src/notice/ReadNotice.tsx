import { useEffect, useState } from 'react';
import DeleteNotice from './DeleteNotice';
import UpdateNotice from './UpdateNotice';
import { Notice } from '../types/notice';
// import { dev_mode } from '../types/dev';

export default function ReadNotice({ id }: { id: number }) {
    const [notice, setNotice] = useState<Notice>({
        id: 0,
        title: '',
        content: '',
        type: '',
        created_at: '',
        updated_at: '',
    });
    const fetchData = () => {
        // fetch(`${dev_mode}api/notice/${id}`)
        fetch(`/api/notice/${id}`)
            .then((res) => res.json())
            .then((data) => setNotice(data))
            .catch((err) => console.error('공지 불러오기 실패:', err));
    };
    useEffect(() => {
        fetchData();
    }, [id]);

    const handleUpdated = () => {
        fetchData();
    };
    return (
        <>
            <h1>{notice.title}</h1>
            <p>{notice.type}</p>
            <p>{notice.content}</p>
            <DeleteNotice no={id}></DeleteNotice>
            <UpdateNotice no={id} onUpdated={handleUpdated}></UpdateNotice>
        </>
    );
}
