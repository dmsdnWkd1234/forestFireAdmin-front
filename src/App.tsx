import * as S from './style/main/style';
function App() {
    return (
        <>
            <h1>관리자용 페이지입니다</h1>
            <S.menuRootContainer>
                <S.menuBtnSection>
                    <S.menuBtn>메쉬정보</S.menuBtn>
                </S.menuBtnSection>
                <S.menuBtnSection>
                    <S.menuBtn>신고접수</S.menuBtn>
                </S.menuBtnSection>
                <S.menuBtnSection>
                    <S.menuBtn>날씨정보</S.menuBtn>
                </S.menuBtnSection>
                <S.menuBtnSection>
                    <S.menuBtn>클릭</S.menuBtn>
                </S.menuBtnSection>
            </S.menuRootContainer>
        </>
    );
}

export default App;
