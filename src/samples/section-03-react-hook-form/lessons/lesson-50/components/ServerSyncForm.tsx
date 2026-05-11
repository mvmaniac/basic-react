import { useForm } from 'react-hook-form';

import type { SubmitEventHandler } from 'react';
import type { SubmitHandler } from 'react-hook-form';

interface InputForm {
  username: string;
  email: string;
}

type FormField = keyof InputForm;
type ServerFieldErrors = Partial<Record<FormField, string>>;

class MockRegisterError extends Error {
  readonly response: {
    data: {
      errors: ServerFieldErrors;
    };
  };

  constructor(errors: ServerFieldErrors) {
    super('Mock register validation error');
    this.name = 'MockRegisterError';
    this.response = {
      data: {
        errors,
      },
    };
  }
}

const isFormField = (value: string): value is FormField =>
  value === 'username' || value === 'email';

// 가짜 API: 무조건 서버 에러를 반환하도록 설계됨
const mockRegisterApi = async (_data: InputForm) => {
  await new Promise((resolve) => setTimeout(resolve, 800)); // 통신 지연 시뮬레이션
  throw new MockRegisterError({
    username: '이미 사용 중인 이름입니다.',
    email: '차단된 이메일 도메인입니다.',
  });
};

export default function ServerSyncForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<InputForm>({
    // reValidateMode를 onChange로 두면 사용자가 타이핑을 시작할 때
    // 기존 서버 에러가 부드럽게 사라집니다.
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<InputForm> = async (data) => {
    try {
      await mockRegisterApi(data);
      alert('성공!');
    } catch (error: unknown) {
      if (!(error instanceof MockRegisterError)) {
        return;
      }

      // 2. 서버가 400 에러와 함께 상세 에러 명단(errors)을 보내왔는지 확인합니다.
      // 예: { email: "이미 가입됨", password: "보안 취약" }
      const serverErrors = error.response.data.errors;

      if (serverErrors) {
        // 3. Object.entries를 통해 [필드명, 메시지] 쌍을 추출하여 순회합니다.
        Object.entries(serverErrors).forEach(([key, message]) => {
          if (!isFormField(key)) {
            return;
          }

          // 4. setError를 호출하여 각 필드에 자동 도장을 찍습니다.
          setError(key, {
            type: 'server', // 서버로부터 온 에러임을 명시
            message,
          });
        });
      }
    }
  };

  const handleFormSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    void handleSubmit(onSubmit)(e);
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-10 font-sans shadow-2xl">
      <h1 className="mb-8 text-2xl font-black tracking-tight text-slate-900">Server Error Sync</h1>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="ml-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
            Username
          </label>
          <input
            {...register('username')}
            placeholder="아이디 입력"
            className={`w-full rounded-2xl border-2 bg-slate-50 p-4 transition-all outline-none ${errors.username ? 'border-rose-500 bg-rose-50' : 'border-transparent focus:border-indigo-500'}`}
          />
          {errors.username && (
            <p className="mt-1 ml-1 text-xs font-bold text-rose-500">{errors.username.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="ml-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
            Email
          </label>
          <input
            {...register('email')}
            placeholder="이메일 입력"
            className={`w-full rounded-2xl border-2 bg-slate-50 p-4 transition-all outline-none ${errors.email ? 'border-rose-500 bg-rose-50' : 'border-transparent focus:border-indigo-500'}`}
          />
          {errors.email && (
            <p className="mt-1 ml-1 text-xs font-bold text-rose-500">{errors.email.message}</p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-slate-900 py-4 font-black text-white shadow-xl transition-all hover:bg-black active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? '서버 확인 중...' : '회원가입 요청'}
        </button>
      </form>
      <p className="mt-6 text-center text-xs text-slate-400 italic">
        제출 버튼을 누르면 서버 에러가 자동으로 매핑됩니다.
      </p>
    </div>
  );
}
