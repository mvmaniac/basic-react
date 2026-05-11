import { useFormContext } from 'react-hook-form';

export default function Step1() {
  const { register } = useFormContext();
  return (
    <div className="animate-in fade-in duration-500">
      <label className="mb-2 block text-xs font-black tracking-widest text-indigo-500 uppercase">
        Step 1: Your Name
      </label>
      <input
        {...register('step1.name')}
        className="w-full rounded-2xl border-2 border-transparent bg-slate-50 p-4 transition-all outline-none focus:border-indigo-500"
        placeholder="성함을 적어주세요"
      />
    </div>
  );
}
