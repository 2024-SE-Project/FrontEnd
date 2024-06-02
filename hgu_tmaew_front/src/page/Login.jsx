import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios 라이브러리 추가
import './css/Login.css';

function LoginPage() {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleGoogleLogin = async () => {
        try {
            // 백엔드로 구글 로그인 요청을 보냅니다.
            const response = await axios.get('https://likelion.info:443/login/oauth2/google');

            // 백엔드에서 응답한 JSON 데이터를 콘솔에 출력합니다. (테스트용)
            console.log('Google login response:', response.data);

            // 구글 로그인이 성공적으로 처리되면 프론트엔드로 리디렉션하여 메인 페이지로 이동합니다.
            navigate('/home'); // 원하는 경로로 변경
        } catch (error) {
            console.error('Error during Google login:', error);
            // 에러 처리
        }
    };

    // useEffect 내부의 로직을 제거하고, 버튼 클릭 이벤트를 직접 핸들링합니다.
    // 따라서 useEffect는 더 이상 필요하지 않습니다.

    return (
        <div className="signin-container">
            <div className="left-panel">
                <h1 className="Sign-in-title">Sign in to</h1>
                <h2 className="Sign-in-subTitle">RAONz is simply</h2>
                <p className="Sign-in-dc">This platform will support the student<br /> support team and team executives in<br /> fostering a stronger team culture and<br /> developing leadership skills<br /> university-wide.</p>
            </div>
            <div className="right-panel">
                <div className="signin-box">
                    <h3>Welcome to RAONz</h3>
                    <br />
                    <h1>Sign in</h1>

                    {/* temp admin login button -> Directly link to Main Page */}
                    <br />
                    <Link to="/dashboard/main" className="adminLoginButton">Admin login</Link>
                    <br />
                    <br />

                    {/* 구글 로그인 버튼 */}
                    <button id="google-login-btn" className="google-signin-btn" onClick={handleGoogleLogin}>
                        Sign in with Google
                    </button>
                    
                    <br />

                    {/* 기타 버튼들 */}
                    <button className="link-button">Forgot Password</button>
                    <div className="signup-link">
                        No Account? <button className="link-button">Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
