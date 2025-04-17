import * as S from '../style/notice/modal';

export default function Modal({ isOpen, onClose, children }: { isOpen: any; onClose: any; children: any }) {
    return (
        <S.ModalBackground isOpen={isOpen}>
            <S.ModalWrapper>
                <S.CloseButton onClick={onClose}>
                    <strong>X</strong>
                </S.CloseButton>
                {children}
            </S.ModalWrapper>
        </S.ModalBackground>
    );
}
