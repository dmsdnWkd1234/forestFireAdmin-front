import { useState } from 'react';
import * as S from '../style/notice/createNotice';

export default function CreateNotice() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('');

    const selectType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
    };

    const errHandle = () => {
        if (!title) {
            alert('제목을 입력해주세요');
        } else if (!content) {
            alert('내용을 입력하세요');
        }
    };

    const createNotice = () => {
        fetch(`/createNotice`, {
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
                    window.location.href = '/notice'; // 페이지 이동
                } else {
                    errHandle();
                }
            })
            .catch((err) => console.error('글 작성:', err));
    };

    return (
        <S.root>
            <S.createNoticeRootBox>
                <h1>공지 작성하기</h1>
                <S.titleCategoryBox>
                    <textarea
                        placeholder="제목 입력"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></textarea>
                    <select onChange={selectType}>
                        <option>긴급</option>
                        <option>공지</option>
                        <option>대피</option>
                    </select>
                </S.titleCategoryBox>

                <textarea
                    placeholder="내용 입력"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button type="button" onClick={createNotice}>
                    등록
                </button>
            </S.createNoticeRootBox>
        </S.root>
    );
}
