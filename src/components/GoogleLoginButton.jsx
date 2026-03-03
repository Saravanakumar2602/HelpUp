import React from "react";

export default function GoogleLoginButton({ onClick }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 18 }}>
      <button
        type="button"
        className="google-login-btn"
        onClick={onClick}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          background: '#fff', color: '#444', border: '1.5px solid #c3dafe', borderRadius: 8,
          padding: '10px 18px', fontWeight: 600, fontSize: '1.08rem', cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,123,255,0.07)'
        }}
      >
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{width:24,height:24}} />
        Continue with Google
      </button>
    </div>
  );
}
