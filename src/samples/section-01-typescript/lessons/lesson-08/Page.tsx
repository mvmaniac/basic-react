import PrimaryButton from '@/samples/section-01-typescript/lessons/lesson-08/components/PrimaryButton.tsx';
import ProductDetail from '@/samples/section-01-typescript/lessons/lesson-08/components/ProductDetail.tsx';
import ProfileEditor from '@/samples/section-01-typescript/lessons/lesson-08/components/ProfileEditor.tsx';

export default function Lesson08Page() {
  return (
    <div style={{ padding: '40px' }}>
      <PrimaryButton variant="solid" onClick={() => alert('Click!')}>
        Button
      </PrimaryButton>
      <ProductDetail product={{ id: '1', name: 'TypeScript Practice', price: 45000 }} />
      <ProfileEditor />
    </div>
  );
}
