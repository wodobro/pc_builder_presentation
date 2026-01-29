interface SectionLabelProps {
  label: string;
}

export function DateLabel({ label }: SectionLabelProps) {
  return (
    <div className="z-40 absolute flex justify-start items-end w-screen h-screen pointer-events-none">
        <div className="absolute p-7 font-mono text-[var(--gray-5)] text-xs uppercase tracking-wider">
            {label}
        </div>
    </div>
  );
}
