interface Source {
  label: string;
  url?: string;
}

interface SourcesFooterProps {
  sources: Source[];
}

export function SourcesFooter({ sources }: SourcesFooterProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="z-40 absolute flex justify-start items-end mb-20 p-7 w-screen h-screen pointer-events-none">
      <div className="text-[var(--gray-5)] text-xs">
        <p className="mb-1 font-semibold">Sources:</p>
        <div className="space-y-0.5">
          {sources.map((source, index) => (
            <p key={index}>
              {source.url ? (
                <a 
                  href={source.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gray-3 underline transition-colors"
                >
                  {source.label}
                </a>
              ) : (
                source.label
              )}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
