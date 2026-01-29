import { SectionLabel } from '@/components/shared/SectionLabel';

export function Troubleshooting() {
  return (
    <section id="troubleshooting" className="relative flex flex-col justify-center items-center bg-gradient-to-br from-[var(--gray-7)] to-[var(--gray-8)] px-6 w-full h-screen snap-start pointer-events-auto">
      <div className="w-full max-w-4xl text-center">
        <h2 className="mb-6 font-bold text-[var(--gray-1)] text-4xl md:text-5xl">Troubleshooting</h2>
        <p className="mx-auto max-w-2xl text-[var(--gray-3)] text-lg">
          Common issues during build and first boot, with steps to diagnose and fix.
        </p>

        <div className="space-y-4 mt-8 text-left">
          <ul className="pl-6 text-[var(--gray-3)] list-disc">
            <li>No POST or beeps — check seating and power</li>
            <li>GPU/display issues — reseat and check power connectors</li>
            <li>Boot drive not found — verify SATA/PCIe connections and BIOS settings</li>
          </ul>
        </div>
      </div>
      <SectionLabel label="troubleshooting" />
    </section>
  );
}
