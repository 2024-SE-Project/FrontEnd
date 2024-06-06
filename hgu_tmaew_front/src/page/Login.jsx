import React from 'react';
import { Link } from 'react-router-dom';
import './css/Login.css';

function LoginPage() {
    const handleGoogleLogin = () => {
        console.log("!!!");
        window.location.href = "https://likelion.info:443/login/oauth2/google"
    };

    const clientId = "your-google-client-id-here";  // 실제 구글 클라이언트 ID로 대체

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
                    
                    <br />
                    <Link to="/dashboard/main" className="adminLoginButton">Admin login</Link>
                    <br />
                    <br />

                    <button onClick={handleGoogleLogin} className="google-signin-btn">
                        Sign in with Google
                    </button>
                    <button className="link-button" /* onClick={handleForgotPassword} */ >Forgot Password</button>
                    <div className="signup-link">
                        No Account? <button className="link-button" /* onClick={handleSignUp } */ >Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;