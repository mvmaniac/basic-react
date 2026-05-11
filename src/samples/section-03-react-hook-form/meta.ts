import type { SampleSection } from '@/samples/types.ts';

import Lesson38Page from '@/samples/section-03-react-hook-form/lessons/lesson-38/Page.tsx';
import Lesson40Page from '@/samples/section-03-react-hook-form/lessons/lesson-40/Page.tsx';
import Lesson42Page from '@/samples/section-03-react-hook-form/lessons/lesson-42/Page.tsx';
import Lesson45Page from '@/samples/section-03-react-hook-form/lessons/lesson-43/Page.tsx';
import Lesson46Page from '@/samples/section-03-react-hook-form/lessons/lesson-46/Page.tsx';
import Lesson48Page from '@/samples/section-03-react-hook-form/lessons/lesson-48/Page.tsx';
import Lesson50page from '@/samples/section-03-react-hook-form/lessons/lesson-50/Page.tsx';

export const section03ReactHookForm: SampleSection = {
  id: 'section-03-react-hook-form',
  title: 'Section 03. React Hook Form',
  description: '',
  lessons: [
    {
      id: 'lesson-38',
      title: '38. React Hook Form + TypeScript',
      summary: '',
      component: Lesson38Page,
    },
    {
      id: 'lesson-40',
      title: '40. Validation Form',
      summary: '',
      component: Lesson40Page,
    },
    {
      id: 'lesson-42',
      title: '42. Zod + Schema Form',
      summary: '',
      component: Lesson42Page,
    },
    {
      id: 'lesson-45',
      title: '45. Dynamic Form',
      summary: '',
      component: Lesson45Page,
    },
    {
      id: 'lesson-46',
      title: '46. Performance Form',
      summary: '',
      component: Lesson46Page,
    },
    {
      id: 'lesson-48',
      title: '48. Multi Step Form',
      summary: '',
      component: Lesson48Page,
    },
    {
      id: 'lesson-50',
      title: '50. Server Sync Form',
      summary: '',
      component: Lesson50page,
    },
  ],
};
