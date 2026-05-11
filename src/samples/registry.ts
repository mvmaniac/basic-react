import { section01TypeScript } from '@/samples/section-01-typescript/meta.ts';
import { section02Zustand } from '@/samples/section-02-zustand/meta.ts';
import { section03ReactHookForm } from '@/samples/section-03-react-hook-form/meta.ts';
import { section04TanStackQuery } from '@/samples/section-04-tan-stack-query/meta.ts';

export type { SampleLesson, SampleSection } from '@/samples/types.ts';

export const SAMPLE_SECTIONS = [
  section01TypeScript,
  section02Zustand,
  section03ReactHookForm,
  section04TanStackQuery,
];

export function getSampleSection(sectionId: string) {
  return SAMPLE_SECTIONS.find((section) => section.id === sectionId);
}

export function getSampleLesson(sectionId: string, lessonId: string) {
  return getSampleSection(sectionId)?.lessons.find((lesson) => lesson.id === lessonId);
}
