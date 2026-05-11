import type { SampleSection } from '@/samples/types.ts';

import Lesson04Page from '@/samples/section-01-typescript/lessons/lesson-04/Page.tsx';
import Lesson05Page from '@/samples/section-01-typescript/lessons/lesson-05/Page.tsx';
import Lesson08Page from '@/samples/section-01-typescript/lessons/lesson-08/Page.tsx';
import Lesson10Page from '@/samples/section-01-typescript/lessons/lesson-10/Page.tsx';
import Lesson11Page from '@/samples/section-01-typescript/lessons/lesson-11/Page.tsx';
import Lesson12Page from '@/samples/section-01-typescript/lessons/lesson-12/Page.tsx';

export const section01TypeScript: SampleSection = {
  id: 'section-01-typescript',
  title: 'Section 01. TypeScript Core Patterns',
  description: 'Type narrowing, generics, runtime validation, and error boundaries.',
  lessons: [
    {
      id: 'lesson-04',
      title: '04. Discriminated Union Practice',
      summary: 'Status-driven rendering with safe narrowing.',
      component: Lesson04Page,
    },
    {
      id: 'lesson-05',
      title: '05. Generic Components',
      summary: 'Reusable list rendering with generic constraints.',
      component: Lesson05Page,
    },
    {
      id: 'lesson-08',
      title: '08. Component Props Typing',
      summary: 'Utility types for safer component interfaces.',
      component: Lesson08Page,
    },
    {
      id: 'lesson-10',
      title: '10. Runtime Validation',
      summary: 'Type guard based schemas checks for unknown data.',
      component: Lesson10Page,
    },
    {
      id: 'lesson-11',
      title: '11. Template Literal Types',
      summary: 'Token-safe design system string contracts.',
      component: Lesson11Page,
    },
    {
      id: 'lesson-12',
      title: '12. Error Boundary',
      summary: 'Runtime failure isolation and fallback rendering.',
      component: Lesson12Page,
    },
  ],
};
