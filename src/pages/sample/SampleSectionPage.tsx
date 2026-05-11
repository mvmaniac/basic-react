import { Link, useParams } from 'react-router';

import { Button } from '@/components/ui/button.tsx';

import { getSampleSection } from '@/samples/registry.ts';

export default function SampleSectionPage() {
  const { sectionId } = useParams();
  const section = sectionId ? getSampleSection(sectionId) : undefined;

  if (!section) {
    return (
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-4 p-6">
        <h1 className="text-2xl font-bold">Section Not Found</h1>
        <Button asChild>
          <Link to="/sample">Back to Sections</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-4 p-6">
      <Button variant="outline" asChild>
        <Link to="/sample">Back to Sections</Link>
      </Button>
      <h1 className="text-2xl font-bold">{section.title}</h1>
      <p className="text-muted-foreground">{section.description}</p>
      <div className="flex flex-col gap-3">
        {section.lessons.map((lesson) => (
          <div key={lesson.id} className="rounded-lg border p-4">
            <h2 className="font-semibold">{lesson.title}</h2>
            <p className="text-sm text-muted-foreground">{lesson.summary}</p>
            <Button className="mt-3" asChild>
              <Link to={`/sample/${section.id}/${lesson.id}`}>Open Lesson</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
