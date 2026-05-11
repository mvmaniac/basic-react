import { Link } from 'react-router';

import { Button } from '@/components/ui/button.tsx';

import { SAMPLE_SECTIONS } from '@/samples/registry.ts';

export default function SamplePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">Sample Sections</h1>
      <p className="text-muted-foreground">Choose a section to open lesson examples.</p>
      <div className="flex flex-col gap-3">
        {SAMPLE_SECTIONS.map((section) => (
          <div key={section.id} className="rounded-lg border p-4">
            <h2 className="font-semibold">{section.title}</h2>
            <p className="text-sm text-muted-foreground">{section.description}</p>
            <p className="mt-2 text-sm">Lessons: {section.lessons.length}</p>
            <Button className="mt-3" asChild>
              <Link to={`/sample/${section.id}`}>Open Section</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
