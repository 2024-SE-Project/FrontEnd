// // LoginPage.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

// function LoginPage() {
//     const navigate = useNavigate();

//     const responseGoogle = (response) => {
//         console.log(response);
//         // 여기서 response 객체를 사용하여 사용자 정보를 얻을 수 있음
//         // 예를 들어, response 객체의 구조에 따라 사용자의 구글 프로필 정보를 얻는 방식이 달라질 수 있음!!!

//         // 로그인 성공 후 홈 페이지로 리다이렉트
//         navigate('/');
//     }

//     // 구글 클라이언트 ID를 여기에 입력
//     const clientId = "your-google-client-id-here";

//     return (
//         <GoogleOAuthProvider clientId={clientId}> {/* 추가된 GoogleOAuthProvider */}
//             <div>
//                 <h2>로그인 페이지</h2>
//                 <GoogleLogin
//                     onSuccess={responseGoogle}
//                     onError={responseGoogle}
//                 />
//             </div>
//         </GoogleOAuthProvider>
//     );
// }

// export default LoginPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import './css/Login.css';

function LoginPage() {
    const navigate = useNavigate();

    const responseGoogle = (response) => {
        console.log(response);
        navigate('/');  // 로그인 성공 후 홈 페이지로 리다이렉트
    }

    const clientId = "your-google-client-id-here";  // 실제 구글 클라이언트 ID로 대체

    return (
        <GoogleOAuthProvider clientId={clientId}>
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

                        <GoogleLogin
                            onSuccess={responseGoogle}
                            onError={responseGoogle}
                            render={renderProps => (
                                <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="google-signin-btn">
                                    Sign in with Google
                                </button>
                            )}
                        />
                        <button className="link-button" /* onClick={handleForgotPassword} */ >Forgot Password</button>
                        <div className="signup-link">
                            No Account? <button className="link-button" /* onClick={handleSignUp } */ >Sign up</button>
                        </div>


                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}

export default LoginPage;