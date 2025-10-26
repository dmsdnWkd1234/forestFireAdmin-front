import styled from 'styled-components';

export const root = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const CreateNoticeForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;

    h1 {
        font-size: 24px;
        font-weight: 600;
        text-align: center;
        margin: 0;
    }
`;

export const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;

    label {
        font-size: 14px;
        font-weight: 500;
        color: #333;
    }
`;

export const TitleCategoryBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    width: 100%;

    // 제목 (flex: 1)
    > div:first-child {
        flex: 1;
    }

    // 카테고리 (너비 고정)
    > div:last-child {
        flex: 0 0 150px;
    }

    // --- 모바일 대응 ---
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;

        > div:first-child,
        > div:last-child {
            flex: 1 1 auto; // flex-basis 초기화
            width: 100%;
        }
    }
`;

const inputStyles = `
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    box-sizing: border-box; 
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    font-family: inherit; 

    &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
    }
`;

export const StyledTextArea = styled.textarea`
    ${inputStyles}
    resize: vertical;
    min-height: 50px;
`;

export const StyledContentTextArea = styled.textarea`
    ${inputStyles}
    resize: vertical;
    min-height: 150px;
`;

export const StyledSelect = styled.select`
    ${inputStyles}
    height: 50px;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px;
    cursor: pointer;
`;

export const SubmitButton = styled.button`
    width: 100%;
    padding: 14px;
    font-size: 16px;
    font-weight: 600;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    margin-top: 10px;

    &:hover {
        background-color: #0056b3;
    }
`;

export const createNoticeRootBox = CreateNoticeForm;
export const titleCategoryBox = TitleCategoryBox;
export const titleTextAreaBox = styled.div``;
