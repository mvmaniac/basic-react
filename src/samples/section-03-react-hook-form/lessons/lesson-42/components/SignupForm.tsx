import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import type { SignupInputForm } from '@/samples/section-03-react-hook-form/lessons/lesson-42/schemas/auth.ts';
import type { CSSProperties, SubmitEventHandler } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button.tsx';

import { signupSchema } from '@/samples/section-03-react-hook-form/lessons/lesson-42/schemas/auth.ts';

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInputForm>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<SignupInputForm> = (data) => {
    console.log('🚀 검증 통과! 정제된 데이터:', data);
  };

  const handleFormSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    void handleSubmit(onSubmit)(e);
  };

  return (
    <div style={containerStyle}>
      <h2>Premium Signup</h2>
      <form onSubmit={handleFormSubmit} style={formStyle}>
        <div style={groupStyle}>
          <label style={labelStyle}>Email</label>
          {/* register 내부가 깨끗해졌습니다. 규칙은 이미 스키마에 정의되어 있기 때문입니다. */}
          <input {...register('email')} placeholder="example@mail.com" style={inputStyle} />
          {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
        </div>

        <div style={groupStyle}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            {...register('password')}
            placeholder="********"
            style={inputStyle}
          />
          {errors.password && <p style={errorStyle}>{errors.password.message}</p>}
        </div>

        <Button type="submit" style={buttonStyle}>
          Create Account
        </Button>
      </form>
    </div>
  );
}

// --- ✨ Modern UI Styles (CSS-in-JS) ---
const containerStyle: CSSProperties = {
  padding: '40px',
  maxWidth: '420px',
  margin: '50px auto',
  backgroundColor: '#fff',
  borderRadius: '16px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
};

const formStyle: CSSProperties = { display: 'flex', flexDirection: 'column' as const, gap: '20px' };

const groupStyle: CSSProperties = { display: 'flex', flexDirection: 'column' as const, gap: '6px' };

const labelStyle: CSSProperties = { fontSize: '13px', fontWeight: 'bold', color: '#555' };

const inputStyle: CSSProperties = {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  fontSize: '15px',
};

const errorStyle: CSSProperties = { color: '#ff4d4f', fontSize: '12px', margin: '4px 0 0 4px' };

const buttonStyle: CSSProperties = {
  padding: '14px',
  backgroundColor: '#007aff',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
};
