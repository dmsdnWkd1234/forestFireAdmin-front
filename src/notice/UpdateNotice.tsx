import { useEffect, useState } from 'react';
import type { Notice, UpdateNotice as UpdateNoticeType } from '../types/notice';
import * as S from '../style/notice/readUpdateNotice'; // 새로 만든 스타일 파일 import
// import { dev_mode } from '../types/dev';

interface UpdateNoticeProps {
    initialNotice: Notice;
    onUpdated: () => void;
    onCancel: () => void;
}

export default function UpdateNotice({ initialNotice, onUpdated, onCancel }: UpdateNoticeProps) {
    const [notice, setNotice] = useState<UpdateNoticeType>({
        id: 0,
        title: '',
        content: '',
        type: '공지',
    });

    // initialNotice가 변경될 때마다 폼 상태 업데이트
    useEffect(() => {
        if (initialNotice) {
            setNotice({
                id: initialNotice.id,
                title: initialNotice.title,
                content: initialNotice.content,
                type: initialNotice.type,
            });
        }
    }, [initialNotice]);

    const updateNotice = () => {
        if (!notice.title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }
        if (!notice.content.trim()) {
            alert('내용을 입력해주세요.');
            return;
        }

        fetch(`${import.meta.env.VITE_BACK_URL}api/updateNotice`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: notice.id,
                title: notice.title,
                type: notice.type,
                content: notice.content,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result) {
                    alert('수정 성공');
                    onUpdated(); // 부모(ReadNotice)에게 수정 완료 알림
                } else {
                    alert('수정 실패');
                }
            })
            .catch((err) => console.error('글 수정:', err));
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNotice((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            {/* 수정 폼 */}
            <S.EditForm>
                <S.FormGroup>
                    <label htmlFor="update-title">제목</label>
                    <S.StyledTextArea
                        id="update-title"
                        name="title"
                        value={notice.title}
                        onChange={handleChange}
                        rows={1}
                    />
                </S.FormGroup>

                <S.FormGroup>
                    <label htmlFor="update-type">카테고리</label>
                    <S.StyledSelect id="update-type" name="type" value={notice.type} onChange={handleChange}>
                        <option value="공지">공지</option>
                        <option value="긴급">긴급</option>
                        <option value="대피">대피</option>
                    </S.StyledSelect>
                </S.FormGroup>

                <S.FormGroup>
                    <label htmlFor="update-content">내용</label>
                    <S.StyledContentTextArea
                        id="update-content"
                        name="content"
                        value={notice.content}
                        onChange={handleChange}
                        rows={8}
                    />
                </S.FormGroup>
            </S.EditForm>

            {/* 완료 / 취소 버튼 */}
            <S.ButtonContainer>
                <S.SecondaryButton onClick={onCancel}>취소</S.SecondaryButton>
                <S.PrimaryButton onClick={updateNotice}>완료</S.PrimaryButton>
            </S.ButtonContainer>
        </>
    );
}
