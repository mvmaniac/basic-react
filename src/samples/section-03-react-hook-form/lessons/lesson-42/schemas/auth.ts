import { z } from 'zod';

// 1. 설계도(Schema) 정의: 데이터가 흘러갈 '규정집'입니다.
export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, '이메일은 필수 입력 사항입니다.')
      .pipe(z.email('유효한 이메일 형식이 아닙니다.')),

    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .regex(/[A-Z]/, '대문자를 최소 하나 포함해야 합니다.')
      .regex(/[0-9]/, '숫자를 최소 하나 포함해야 합니다.'),

    passwordConfirm: z.string().min(1, '비밀번호 확인을 입력해주세요.'),

    role: z.enum(['user', 'creator'], {
      error: () => ({ message: '가입 유형을 선택해주세요.' }),
    }),

    age: z.number().min(14, '만 14세 이상만 가입 가능합니다.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

// 2. [Magic] z.infer를 통해 스키마로부터 타입을 자동으로 추출합니다.
export type SignupInputForm = z.infer<typeof signupSchema>;
