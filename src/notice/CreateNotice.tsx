import { useState } from 'react';
import * as S from '../style/notice/createNotice'; // 스타일 import

export default function CreateNotice() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('긴급'); // 기본값을 '긴급'으로 설정

    const selectType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
    };

    // 프론트엔드 유효성 검사
    const errHandle = () => {
        if (!title.trim()) {
            alert('제목을 입력해주세요');
            return false;
        }
        if (!content.trim()) {
            alert('내용을 입력하세요');
            return false;
        }
        return true;
    };

    // 폼 제출 핸들러
    const handleCreateNotice = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // form의 기본 제출 동작 방지

        // 유효성 검사 실패 시 중단
        if (!errHandle()) {
            return;
        }

        fetch(`${import.meta.env.VITE_BACK_URL}api/createNotice`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                type,
                content,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result) {
                    alert('성공적으로 작성되었습니다');
                    window.location.href = '/notice'; // 성공 시 페이지 이동
                } else {
                    // result가 false이거나 에러 객체일 경우
                    alert('공지 작성에 실패했습니다.');
                }
            })
            .catch((err) => {
                console.error('글 작성 오류:', err);
                alert('서버와 통신 중 오류가 발생했습니다.');
            });
    };

    return (
        <S.root>
            {/* 기존 createNoticeRootBox 대신 CreateNoticeForm 사용 */}
            <S.CreateNoticeForm onSubmit={handleCreateNotice}>
                <h1>공지 작성하기</h1>

                {/* 제목과 카테고리를 가로로 묶음 */}
                <S.TitleCategoryBox>
                    <S.FormGroup>
                        <label htmlFor="notice-title">제목</label>
                        <S.StyledTextArea
                            id="notice-title"
                            placeholder="제목 입력"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            rows={1} // 자동으로 늘어나거나 min-height로 조절됨
                        />
                    </S.FormGroup>

                    <S.FormGroup>
                        <label htmlFor="notice-type">카테고리</label>
                        <S.StyledSelect id="notice-type" onChange={selectType} value={type}>
                            <option value="긴급">긴급</option>
                            <option value="공지">공지</option>
                            <option value="대피">대피</option>
                        </S.StyledSelect>
                    </S.FormGroup>
                </S.TitleCategoryBox>

                {/* 내용 입력란 */}
                <S.FormGroup>
                    <label htmlFor="notice-content">내용</label>
                    <S.StyledContentTextArea
                        id="notice-content"
                        placeholder="내용 입력"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={8} // 최소 높이 지정
                    />
                </S.FormGroup>

                {/* 등록 버튼 */}
                <S.SubmitButton type="submit">등록</S.SubmitButton>
            </S.CreateNoticeForm>
        </S.root>
    );
}
