import { useEffect, useState } from 'react';
import DeleteNotice from './DeleteNotice';
import UpdateNotice from './UpdateNotice';
import { Notice } from '../types/notice';
import * as S from '../style/notice/readUpdateNotice'; // 새로 만든 스타일 파일 import
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
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태

    const fetchData = () => {
        // fetch(`${dev_mode}api/notice/${id}`)
        fetch(`${import.meta.env.VITE_BACK_URL}api/notice/${id}`)
            .then((res) => res.json())
            .then((data) => setNotice(data))
            .catch((err) => console.error('공지 불러오기 실패:', err));
    };

    useEffect(() => {
        fetchData();
        setIsEditing(false); // 모달이 새로 열릴 때 (id 변경 시) 항상 조회 모드로
    }, [id]);

    // 수정 완료 시 호출될 콜백
    const handleUpdated = () => {
        fetchData(); // 데이터 새로고침
        setIsEditing(false); // 조회 모드로 변경
    };

    return (
        <S.ReadContainer>
            {isEditing ? (
                // --- 수정 모드 ---
                <UpdateNotice
                    initialNotice={notice} // 기존 공지 데이터 전달
                    onUpdated={handleUpdated} // 수정 완료 콜백
                    onCancel={() => setIsEditing(false)} // 취소 콜백
                />
            ) : (
                // --- 조회 모드 ---
                <>
                    <S.Header>
                        <S.Badge type={notice.type}>{notice.type}</S.Badge>
                        <S.Title>{notice.title}</S.Title>
                    </S.Header>

                    <S.Content>{notice.content}</S.Content>

                    <S.ButtonContainer>
                        <DeleteNotice no={id} />
                        <S.PrimaryButton onClick={() => setIsEditing(true)}>수정</S.PrimaryButton>
                    </S.ButtonContainer>
                </>
            )}
        </S.ReadContainer>
    );
}
