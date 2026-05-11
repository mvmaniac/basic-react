import { useForm } from 'react-hook-form';

import type { CSSProperties, SubmitEventHandler } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button.tsx';

interface InputForm {
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function ValidationForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<InputForm>({
    mode: 'onChange', // "onChange"로 설정하면 타이핑할 때마다 즉시 검증 결과가 업데이트됩니다.
  });

  const onSubmit: SubmitHandler<InputForm> = (data) => {
    console.log('제출 성공:', data);
    alert('✨ 회원가입이 완료되었습니다!');
  };

  const handleFormSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    void handleSubmit(onSubmit)(e);
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Join Us</h1>
      <p style={subtitleStyle}>무결점 시스템으로 안전하게 시작하세요.</p>

      <form onSubmit={handleFormSubmit} style={formStyle}>
        {/* 이메일 섹션 */}
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Email Address</label>
          <input
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                // 자바스크립트 파일에 \. 이 한 번만 출력되도록 파이썬에서 4개의 역슬래시를 사용합니다.
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '이메일 형식이 올바르지 않습니다.',
              },
            })}
            placeholder="example@mail.com"
            style={errors.email ? { ...inputStyle, ...inputErrorStyle } : inputStyle}
          />
          {errors.email && <span style={errorTextStyle}>{errors.email.message}</span>}
        </div>

        {/* 비밀번호 섹션 */}
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: { value: 8, message: '최소 8자 이상 입력해야 합니다.' },
            })}
            placeholder="8자 이상 입력"
            style={errors.password ? { ...inputStyle, ...inputErrorStyle } : inputStyle}
          />
          {errors.password && <span style={errorTextStyle}>{errors.password.message}</span>}
        </div>

        {/* 비밀번호 확인 섹션 */}
        <div style={fieldGroupStyle}>
          <label style={labelStyle}>Confirm Password</label>
          <input
            type="password"
            {...register('passwordConfirm', {
              required: '비밀번호 확인이 필요합니다.',
              validate: (val) => val === getValues('password') || '비밀번호가 일치하지 않습니다.',
            })}
            placeholder="다시 한번 입력"
            style={errors.passwordConfirm ? { ...inputStyle, ...inputErrorStyle } : inputStyle}
          />
          {errors.passwordConfirm && (
            <span style={errorTextStyle}>{errors.passwordConfirm.message}</span>
          )}
        </div>

        <Button type="submit" style={buttonStyle}>
          Get Started
        </Button>
      </form>
    </div>
  );
}

// --- ✨ Modern UI Styles (CSS-in-JS) ---
const containerStyle: CSSProperties = {
  width: '100%',
  maxWidth: '420px',
  padding: '40px',
  backgroundColor: '#ffffff',
  borderRadius: '24px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  textAlign: 'center',
};

const titleStyle: CSSProperties = {
  fontSize: '32px',
  fontWeight: '800',
  color: '#1a1a1a',
  marginBottom: '8px',
  letterSpacing: '-0.5px',
};

const subtitleStyle: CSSProperties = {
  fontSize: '15px',
  color: '#666',
  marginBottom: '32px',
};

const formStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  textAlign: 'left',
};

const fieldGroupStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const labelStyle: CSSProperties = {
  fontSize: '14px',
  fontWeight: '700',
  color: '#333',
  marginLeft: '4px',
};

const inputStyle: CSSProperties = {
  padding: '14px 18px',
  borderRadius: '14px',
  border: '1.5px solid #eee',
  fontSize: '16px',
  outline: 'none',
  transition: 'all 0.2s ease',
  backgroundColor: '#fbfbfb',
};

const inputErrorStyle: CSSProperties = {
  border: '1.5px solid #ff4d4f',
  backgroundColor: '#fff1f0',
};

const errorTextStyle: CSSProperties = {
  fontSize: '12px',
  color: '#ff4d4f',
  fontWeight: '600',
  marginLeft: '4px',
};

const buttonStyle: CSSProperties = {
  marginTop: '12px',
  padding: '16px',
  borderRadius: '14px',
  border: 'none',
  backgroundColor: '#007aff',
  color: '#ffffff',
  fontSize: '17px',
  fontWeight: '700',
  cursor: 'pointer',
  transition: 'transform 0.1s active, opacity 0.2s',
  boxShadow: '0 6px 16px rgba(0, 122, 255, 0.25)',
};
