import type { SampleSection } from '@/samples/types.ts';

import Lesson63Page from '@/samples/section-04-tan-stack-query/lessons/lesson-63/Page.tsx';
import Lesson65Page from '@/samples/section-04-tan-stack-query/lessons/lesson-65/Page.tsx';
import Lesson66Page from '@/samples/section-04-tan-stack-query/lessons/lesson-66/Page.tsx';
import Lesson69Page from '@/samples/section-04-tan-stack-query/lessons/lesson-69/Page.tsx';
import Lesson75Page from '@/samples/section-04-tan-stack-query/lessons/lesson-75/Page.tsx';
import Lesson76Page from '@/samples/section-04-tan-stack-query/lessons/lesson-76/Page.tsx';

export const section04TanStackQuery: SampleSection = {
  id: 'section-04-tan-stack-query',
  title: 'Section 04. TanStack Query',
  description: '',
  lessons: [
    {
      id: 'lesson-63',
      title: '63. TanStack Query Lifecycle',
      summary: '',
      component: Lesson63Page,
    },
    {
      id: 'lesson-65',
      title: '65. Suspense & Error Boundary',
      summary: '',
      component: Lesson65Page,
    },
    {
      id: 'lesson-66',
      title: '66. Suspense & Error Boundary Optimization',
      summary: '',
      component: Lesson66Page,
    },
    {
      id: 'lesson-69',
      title: '69. Invalidation',
      summary: '',
      component: Lesson69Page,
    },
    {
      id: 'lesson-75',
      title: '75. Placeholder',
      summary: '',
      component: Lesson75Page,
    },
    {
      id: 'lesson-76',
      title: '75. Selector',
      summary: '',
      component: Lesson76Page,
    },
  ],
};
