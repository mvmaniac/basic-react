import { type SubmitEventHandler, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { SubmitHandler } from 'react-hook-form';

import Step1 from '@/samples/section-03-react-hook-form/lessons/lesson-48/components/Step1.tsx';
import Step2 from '@/samples/section-03-react-hook-form/lessons/lesson-48/components/Step2.tsx';

interface MultiStepFormValues {
  step1: {
    name: string;
  };
  step2: {
    bio: string;
  };
}

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const methods = useForm<MultiStepFormValues>({
    shouldUnregister: false, // 💡 핵심: 언마운트 시 데이터 삭제 방지
    defaultValues: { step1: { name: '' }, step2: { bio: '' } },
  });

  const onSubmit: SubmitHandler<MultiStepFormValues> = (data) => console.log('Merged Data:', data);

  const handleFormSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    void methods.handleSubmit(onSubmit)(e);
  };

  return (
    <div className="w-full max-w-lg rounded-[2rem] border border-slate-100 bg-white p-10 font-sans shadow-2xl">
      <header className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Persistence Form</h1>
        <div className="mt-4 flex gap-2">
          <div
            className={`h-1.5 flex-1 rounded-full transition-all ${step >= 1 ? 'bg-indigo-500' : 'bg-slate-100'}`}
          />
          <div
            className={`h-1.5 flex-1 rounded-full transition-all ${step >= 2 ? 'bg-indigo-500' : 'bg-slate-100'}`}
          />
        </div>
      </header>

      <FormProvider {...methods}>
        <form onSubmit={handleFormSubmit} className="flex min-h-30 flex-col justify-between">
          <div className="flex-1">
            {step === 1 && <Step1 />}
            {step === 2 && <Step2 />}
          </div>

          <footer className="mt-10 flex gap-4">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 rounded-2xl bg-slate-100 py-4 font-bold"
              >
                이전
              </button>
            )}
            {step === 1 ? (
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 rounded-2xl bg-indigo-600 py-4 font-bold text-white shadow-lg"
              >
                다음 단계
              </button>
            ) : (
              <button
                type="submit"
                className="flex-1 rounded-2xl bg-slate-900 py-4 font-bold text-white"
              >
                최종 제출
              </button>
            )}
          </footer>
        </form>
      </FormProvider>
    </div>
  );
}
