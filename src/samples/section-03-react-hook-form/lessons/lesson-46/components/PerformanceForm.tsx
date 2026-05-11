import { useForm, useWatch } from 'react-hook-form';

import type { Control } from 'react-hook-form';

interface InputForm {
  title: string;
}

function RenderCounter({ name }: { name: string }) {
  return (
    <span className="rounded-full bg-rose-100 px-2 py-1 text-[10px] font-bold text-rose-600">
      {name} Render Monitor
    </span>
  );
}

function TitleWatcher({ control }: { control: Control<InputForm> }) {
  const title = useWatch<InputForm, 'title'>({ control, name: 'title' });
  return (
    <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-black text-indigo-600">useWatch Mode</h3>
        <RenderCounter name="ChildComponent" />
      </div>
      <p className="font-medium text-indigo-900 italic">&quot;{title ?? 'Typing...'}&quot;</p>
    </div>
  );
}

export default function PerformanceForm() {
  const { register, control, getValues } = useForm<InputForm>({
    defaultValues: { title: '' },
  });

  return (
    <div className="w-full max-w-xl rounded-3xl border border-slate-100 bg-white p-10 shadow-2xl">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-black text-slate-900">Performance Lab</h1>
        <RenderCounter name="ParentContainer" />
      </header>

      <div className="space-y-6">
        <input
          {...register('title')}
          className="w-full rounded-2xl border-2 border-transparent bg-slate-50 p-4 transition-all outline-none focus:border-indigo-500"
          placeholder="데이터를 입력하세요"
        />
        <TitleWatcher control={control} />
        <button
          type="button"
          onClick={() => console.log(getValues('title'))}
          className="w-full rounded-2xl bg-slate-900 py-4 font-black text-white transition-all hover:bg-slate-800"
        >
          getValues (No Render)
        </button>
      </div>
    </div>
  );
}
