import { Link, useParams } from 'react-router';

import { Button } from '@/components/ui/button.tsx';

import { getSampleLesson, getSampleSection } from '@/samples/registry.ts';

export default function SampleLessonPage() {
  const { lessonId, sectionId } = useParams();

  const section = sectionId ? getSampleSection(sectionId) : undefined;
  const lesson = sectionId && lessonId ? getSampleLesson(sectionId, lessonId) : undefined;

  if (!section || !lesson) {
    return (
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-4 p-6">
        <h1 className="text-2xl font-bold">Lesson Not Found</h1>
        <Button asChild>
          <Link to="/sample">Back to Sections</Link>
        </Button>
      </div>
    );
  }

  const LessonComponent = lesson.component;

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col gap-4 p-6">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" asChild>
          <Link to="/sample">Sections</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to={`/sample/${section.id}`}>Lessons</Link>
        </Button>
      </div>
      <h1 className="text-2xl font-bold">{lesson.title}</h1>
      <p className="text-muted-foreground">{lesson.summary}</p>
      <div className="rounded-lg border">
        <LessonComponent />
      </div>
    </div>
  );
}
