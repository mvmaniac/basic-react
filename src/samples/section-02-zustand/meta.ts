import type { SampleSection } from '@/samples/types.ts';

import Lesson01Page from '@/samples/section-02-zustand/lessons/lesson-01/Page.tsx';
import Lesson26Page from '@/samples/section-02-zustand/lessons/lesson-26/Page.tsx';
import Lesson30Page from '@/samples/section-02-zustand/lessons/lesson-30/Page.tsx';
import Lesson32Page from '@/samples/section-02-zustand/lessons/lesson-32/Page.tsx';
import Lesson33Page from '@/samples/section-02-zustand/lessons/lesson-33/Page.tsx';

export const section02Zustand: SampleSection = {
  id: 'section-02-zustand',
  title: 'Section 02. Zustand State Patterns',
  description: 'Store slicing and selector-based subscriptions.',
  lessons: [
    {
      id: 'lesson-01',
      title: '01. Slice Pattern',
      summary: 'Split large stores into composable domain slices.',
      component: Lesson01Page,
    },
    {
      id: 'lesson-26',
      title: '26. Vanilla API 실습',
      summary: '',
      component: Lesson26Page,
    },
    {
      id: 'lesson-30',
      title: '30. 커스텀 로거 미들웨어',
      summary: '',
      component: Lesson30Page,
    },
    {
      id: 'lesson-32',
      title: '32. Zustand 렌더링 최적화 시스템',
      summary: '',
      component: Lesson32Page,
    },
    {
      id: 'lesson-33',
      title: '33. 상태 스냅샷 실습',
      summary: '',
      component: Lesson33Page,
    },
  ],
};
