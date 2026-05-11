import { useSidebarState } from '@/samples/section-02-zustand/lessons/lesson-32/stores/auth.ts';

export const Sidebar = () => {
  const { name, role } = useSidebarState();

  console.log('✅ [Optimization Success] 사이드바 컴포넌트가 렌더링되었습니다.');

  return (
    <aside
      style={{
        padding: '20px',
        border: '2px solid #4CAF50',
        borderRadius: '10px',
        backgroundColor: '#f9fff9',
        width: '250px',
      }}
    >
      <h3 style={{ marginTop: 0 }}>Sidebar (Shallow)</h3>
      <p>
        사용자: <strong>{name ?? 'N/A'}</strong>
      </p>
      <p>
        권한: <strong>{role ?? 'N/A'}</strong>
      </p>
      <small style={{ color: '#888' }}>* 데이터가 실제 변할 때만 이 영역이 다시 그려집니다.</small>
    </aside>
  );
};
