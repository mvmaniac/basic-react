import CustomButton from '@/samples/section-01-typescript/lessons/lesson-04/components/CustomButton.tsx';
import StatusDisplay from '@/samples/section-01-typescript/lessons/lesson-04/components/StatusDisplay.tsx';

export default function Lesson04Page() {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <StatusDisplay status={{ state: 'success', data: 'System is healthy' }} />
      <CustomButton customColor="primary">Run</CustomButton>
    </div>
  );
}
