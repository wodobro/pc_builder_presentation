import { SectionLabel } from '@/components/shared/SectionLabel';

export function QA() {
  return (
    <section id="qa" className="relative flex flex-col justify-center items-center bg-gradient-to-br from-[var(--gray-7)] to-[var(--gray-8)] px-6 w-full h-screen snap-start pointer-events-auto">
      <div className="w-full max-w-4xl text-center">
        <h2 className="mb-6 font-bold text-[var(--gray-1)] text-4xl md:text-5xl">Q&amp;A</h2>
        <p className="mx-auto max-w-2xl text-[var(--gray-3)] text-lg">
          Open Q&amp;A session — bring your questions about builds, parts, and troubleshooting.
        </p>
      </div>
    </section>
  );
}
