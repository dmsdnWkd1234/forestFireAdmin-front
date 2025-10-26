import styled, { css } from 'styled-components';

export const ReadContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-height: 70vh;
    overflow-y: auto;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
`;

export const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
    margin: 0;
    line-height: 1.4;
`;

export const Badge = styled.span<{ type: string }>`
    display: inline-block;
    padding: 4px 10px;
    font-size: 12px;
    font-weight: 500;
    border-radius: 12px;
    align-self: flex-start;

    ${(props) => {
        switch (props.type) {
            case '긴급':
                return css`
                    background-color: #ffebee;
                    color: #d32f2f;
                `;
            case '대피':
                return css`
                    background-color: #fff3e0;
                    color: #f57c00;
                `;
            default:
                return css`
                    background-color: #e3f2fd;
                    color: #1976d2;
                `;
        }
    }}
`;

export const Content = styled.div`
    font-size: 16px;
    line-height: 1.6;
    color: #333;
    white-space: pre-wrap;
    padding: 10px 0;
    word-break: break-word; // 긴 단어/URL 줄바꿈 (삐져나옴 방지)
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding-top: 20px;
    border-top: 1px solid #eee;
    margin-top: auto;

    // --- 모바일 대응 ---
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 12px;

        > button {
            // 자식 버튼들
            width: 100%;
        }
    }
`;

const baseButton = css`
    padding: 10px 18px;
    font-size: 15px;
    font-weight: 600;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const PrimaryButton = styled.button`
    ${baseButton}
    color: white;
    background-color: #007bff;

    &:hover:not(:disabled) {
        background-color: #0056b3;
    }
`;

export const DangerButton = styled.button`
    ${baseButton}
    color: white;
    background-color: #dc3545;

    &:hover:not(:disabled) {
        background-color: #c82333;
    }
`;

export const SecondaryButton = styled.button`
    ${baseButton}
    color: #333;
    background-color: #f1f1f1;
    border: 1px solid #ddd;

    &:hover:not(:disabled) {
        background-color: #e0e0e0;
    }
`;

export const EditForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 10px;
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

const inputStyles = css`
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

    &:read-only {
        background-color: #f9f9f9;
        color: #555;
        border-color: #eee;
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

    &:disabled {
        background-color: #f9f9f9;
        color: #555;
        border-color: #eee;
    }
`;
