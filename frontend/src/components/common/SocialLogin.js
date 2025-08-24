import React from 'react';
import { GithubIcon, LinkedinIcon } from '../icons/Icons';

export const SocialLogin = ({ theme }) => (
  <>
    <div style={{
      margin: '24px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <div style={{ flexGrow: 1, height: '1px', backgroundColor: theme.inputBorder }}></div>
      <span style={{ color: theme.textSecondary, fontSize: '14px' }}>or continue with</span>
      <div style={{ flexGrow: 1, height: '1px', backgroundColor: theme.inputBorder }}></div>
    </div>

    <div style={{ display: 'flex', gap: '16px' }}>
      <button 
        type="button"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '10px 16px',
          border: `1px solid ${theme.socialBorder}`,
          borderRadius: '8px',
          backgroundColor: theme.socialBg,
          cursor: 'pointer',
          transition: 'transform 0.2s ease, background-color 0.2s ease',
          fontSize: '14px',
          fontFamily: 'inherit',
          color: theme.textPrimary
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.backgroundColor = theme.socialHover;
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.backgroundColor = theme.socialBg;
        }}
      >
        <GithubIcon /> Github
      </button>
      <button 
        type="button"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '10px 16px',
          border: `1px solid ${theme.socialBorder}`,
          borderRadius: '8px',
          backgroundColor: theme.socialBg,
          cursor: 'pointer',
          transition: 'transform 0.2s ease, background-color 0.2s ease',
          fontSize: '14px',
          fontFamily: 'inherit',
          color: theme.textPrimary
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.backgroundColor = theme.socialHover;
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.backgroundColor = theme.socialBg;
        }}
      >
        <LinkedinIcon /> LinkedIn
      </button>
    </div>
  </>
);