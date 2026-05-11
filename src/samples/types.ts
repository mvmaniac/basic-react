import type { ComponentType } from 'react';

export interface SampleLesson {
  id: string;
  title: string;
  summary: string;
  component: ComponentType;
}

export interface SampleSection {
  id: string;
  title: string;
  description: string;
  lessons: SampleLesson[];
}
