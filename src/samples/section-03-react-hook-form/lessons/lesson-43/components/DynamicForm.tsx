import { useFieldArray, useForm } from 'react-hook-form';

import type { SubmitEventHandler } from 'react';

import { Button } from '@/components/ui/button.tsx';

interface CareerForm {
  // careers는 객체(company, period)를 담은 '배열'임을 명시하여 설계도를 완성합니다.
  careers: { company: string; role: string }[];
}

export default function DynamicForm() {
  /* [Step 2]: useForm 초기화 (defaultValues 설정 필수) */
  const { register, control, handleSubmit } = useForm<CareerForm>({
    // 폼이 시작될 때 최소 한 개의 비어있는 입력 칸은 보여주도록 초기값을 잡습니다
    defaultValues: { careers: [{ company: '', role: '' }] },
  });

  /* [Step 3]: useFieldArray 선언 및 조작 함수 추출 */
  const {
    fields, // 실시간 데이터 스냅샷 (고유 ID 포함)
    append, // 맨 뒤에 추가
    remove, // 특정 항목 삭제
    move, // 순서 변경
    insert, // 중간에 삽입
  } = useFieldArray({
    control, // 엔진과 소통하는 무전기 채널
    name: 'careers', // 인터페이스에 정의된 배열 필드명
  });

  const handleFormSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    void handleSubmit((data) => console.log(data))(e);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-10 font-sans">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-100 bg-white p-8 shadow-xl">
        <h1 className="mb-8 text-3xl font-black tracking-tight text-slate-900">
          Dynamic Career Manager
        </h1>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {fields.map((field, index) => (
            <div
              // 💡 중요: index가 아닌 field.id를 key로 사용합니다.
              key={field.id}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-indigo-300"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-black tracking-widest text-indigo-500 uppercase">
                  Item #{index + 1}
                </span>
                <div className="flex gap-2">
                  {/* move 기능: 위/아래 순서 바꾸기 */}
                  <Button
                    type="button"
                    onClick={() => move(index, index - 1)}
                    disabled={index === 0}
                    className="rounded bg-slate-100 px-2 py-1 text-xs disabled:opacity-30"
                  >
                    ▲
                  </Button>
                  <Button
                    type="button"
                    onClick={() => move(index, index + 1)}
                    disabled={index === fields.length - 1}
                    className="rounded bg-slate-100 px-2 py-1 text-xs disabled:opacity-30"
                  >
                    ▼
                  </Button>
                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    className="rounded bg-rose-50 px-2 py-1 text-xs text-rose-500"
                  >
                    삭제
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  {...register(`careers.${index}.company` as const)}
                  placeholder="회사명"
                  className="border-b py-2 outline-none focus:border-indigo-500"
                />
                <input
                  {...register(`careers.${index}.role` as const)}
                  placeholder="직무"
                  className="border-b py-2 outline-none focus:border-indigo-500"
                />
              </div>

              {/* insert 기능: 현재 항목 아래에 새로운 칸 끼워넣기 */}
              <Button
                type="button"
                onClick={() => insert(index + 1, { company: '', role: '' })}
                className="mt-4 text-[10px] text-slate-400 transition-colors hover:text-indigo-500"
              >
                + 이 아래에 항목 끼워넣기 (Insert)
              </Button>
            </div>
          ))}

          <Button
            type="button"
            onClick={() => append({ company: '', role: '' })}
            className="w-full rounded-2xl border-2 border-dashed border-slate-200 py-4 font-bold text-slate-500 transition-all hover:border-indigo-200 hover:bg-slate-50"
          >
            + 맨 끝에 항목 추가 (Append)
          </Button>

          <Button
            type="submit"
            className="w-full rounded-2xl bg-indigo-600 py-4 font-black text-white shadow-lg shadow-indigo-100"
          >
            데이터 전송하기
          </Button>
        </form>
      </div>
    </div>
  );
}
