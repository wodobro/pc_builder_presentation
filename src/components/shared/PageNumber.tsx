interface PageNumberProps {
  current: number;
  total: number;
}

export function PageNumber({ current, total }: PageNumberProps) {
  return (
    <div className="right-6 bottom-6 z-40 fixed font-medium text-[var(--gray-4)] text-sm">
      {current} / {total}
    </div>
  );
}
