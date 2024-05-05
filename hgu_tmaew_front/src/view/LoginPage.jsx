// LoginPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

function LoginPage() {
    const navigate = useNavigate();

    const responseGoogle = (response) => {
        console.log(response);
        // 여기서 response 객체를 사용하여 사용자 정보를 얻을 수 있음
        // 예를 들어, response 객체의 구조에 따라 사용자의 구글 프로필 정보를 얻는 방식이 달라질 수 있음!!!
        
        // 로그인 성공 후 홈 페이지로 리다이렉트
        navigate('/');
    }

    // 구글 클라이언트 ID를 여기에 입력
    const clientId = "your-google-client-id-here";

    return (
        <GoogleOAuthProvider clientId={clientId}> {/* 추가된 GoogleOAuthProvider */}
            <div>
                <h2>로그인 페이지</h2>
                <GoogleLogin
                    onSuccess={responseGoogle}
                    onError={responseGoogle}
                />
            </div>
        </GoogleOAuthProvider>
    );
}

export default LoginPage;