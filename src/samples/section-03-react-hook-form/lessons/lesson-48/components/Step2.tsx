import { useFormContext } from 'react-hook-form';

export default function Step2() {
  const { register } = useFormContext();
  return (
    <div className="animate-in fade-in duration-500">
      <label className="mb-2 block text-xs font-black tracking-widest text-indigo-500 uppercase">
        Step 2: Brief Bio
      </label>
      <textarea
        {...register('step2.bio')}
        className="h-24 w-full rounded-2xl border-2 border-transparent bg-slate-50 p-4 transition-all outline-none focus:border-indigo-500"
        placeholder="짧은 소개글을 남겨주세요"
      />
    </div>
  );
}
