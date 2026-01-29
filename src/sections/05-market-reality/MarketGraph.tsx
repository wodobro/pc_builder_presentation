import { useMemo, useState, useEffect } from 'react';
import { SectionLabel } from '@/components/shared/SectionLabel';
import generatedData from '@/assets/generated/price_time_data.json';

type Point = { date: Date; value: number };

function parseDateDMY(s: string) {
  // Accept dd/mm/yy or dd/mm/yyyy
  const parts = s.trim().split('/');
  if (parts.length !== 3) return null;
  let [d, m, y] = parts;
  const day = parseInt(d, 10);
  const month = parseInt(m, 10) - 1;
  let year = parseInt(y, 10);
  if (y.length === 2) year += year < 70 ? 2000 : 1900;
  return new Date(year, month, day);
}

export function MarketGraph() {
  const [points, setPoints] = useState<Point[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileRef = null;

  const loadFile = async (file: File) => {
    setError(null);
    try {
      const text = await file.text();
      if (file.type.includes('json') || file.name.endsWith('.json')) {
        const parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) throw new Error('JSON must be an array of {date,value}');
        const parsedPoints: Point[] = parsed.map((p: any) => ({ date: parseDateDMY(String(p.date)) || new Date(p.date), value: Number(p.value) }));
        setPoints(parsedPoints.filter(p => p.date instanceof Date && !isNaN(p.date.getTime()) && Number.isFinite(p.value)));
      } else {
        // Assume CSV: date,value per line, optionally header
        const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
        const parsedPoints: Point[] = [];
        for (const line of lines) {
          const parts = line.split(/[,;\t]/).map(s => s.trim());
          if (parts.length < 2) continue;
          // skip header if non-numeric in second column
          if (parsedPoints.length === 0 && isNaN(Number(parts[1]))) continue;
          const date = parseDateDMY(parts[0]) || new Date(parts[0]);
          const value = Number(parts[1]);
          if (date instanceof Date && !isNaN(date.getTime()) && Number.isFinite(value)) parsedPoints.push({ date, value });
        }
        setPoints(parsedPoints);
      }
    } catch (e: any) {
      setError(e?.message || String(e));
    }
  };

  


  useEffect(() => {
    // If no points uploaded, try to use the generated JSON (static file)
    try {
      if ((!points || points.length === 0) && Array.isArray(generatedData) && generatedData.length) {
        const parsed = generatedData.map((p: any) => ({ date: new Date(p.date), value: Number(p.price ?? p.value) }));
        setPoints(parsed.filter(p => p.date instanceof Date && !isNaN(p.date.getTime()) && Number.isFinite(p.value)));
      }
    } catch (e) {
      // ignore if import not available at runtime
    }
  }, []);

  const svgSize = { width: 1200, height: 600 };
  const margin = { top: 20, right: 30, bottom: 40, left: 70 };

  const pathData = useMemo(() => {
    if (!points || points.length === 0) return { path: '', xTicks: [], yTicks: [], xFormat: () => '' };
    const pts = points.slice().sort((a, b) => a.date.getTime() - b.date.getTime());
    const xMin = pts[0].date.getTime();
    const xMax = pts[pts.length - 1].date.getTime();
    const yVals = pts.map(p => p.value);
    const yMin = Math.min(...yVals);
    const yMax = Math.max(...yVals);

    const w = svgSize.width - margin.left - margin.right;
    const h = svgSize.height - margin.top - margin.bottom;

    const xScale = (t: number) => margin.left + ((t - xMin) / (xMax - xMin || 1)) * w;
    const yScale = (v: number) => margin.top + h - ((v - yMin) / (yMax - yMin || 1)) * h;

    const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p.date.getTime()).toFixed(2)} ${yScale(p.value).toFixed(2)}`).join(' ');

    // ticks
    const xTicks = 10;
    const xTickVals = Array.from({ length: xTicks + 1 }, (_, i) => new Date(xMin + (i / xTicks) * (xMax - xMin)));
    const yTicks = 6;
    const yTickVals = Array.from({ length: yTicks + 1 }, (_, i) => yMin + (i / yTicks) * (yMax - yMin));

    const xFormat = (d: Date) => `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getFullYear()).slice(-2)}`;

    return { path: d, xTickVals, yTickVals, xScale, yScale, xFormat } as any;
  }, [points]);

  return (
    <section id="market-graph" className="relative flex flex-col justify-center items-center bg-gradient-to-br from-[var(--gray-7)] to-[var(--gray-8)] px-6 w-full h-screen snap-start pointer-events-auto">
      <div className="w-full max-w-[1300px]">
        <h2 className="mb-4 font-bold text-[var(--gray-1)] text-4xl">Market Reality — Price Over Time</h2>

        <div className="flex items-center gap-4 mb-4">
          <div className="text-[var(--gray-3)]">Showing DDR5 2x32GB 6000 prices (Jan 2025–Jan 2026).</div>
        </div>

        {error && <div className="mb-4 text-red-5">{error}</div>}

        <div className="bg-white p-3 rounded-md">
          <svg width={svgSize.width} height={svgSize.height}>
            <rect x={0} y={0} width={svgSize.width} height={svgSize.height} fill="transparent" />
            {/* axes and grid */}
            <g>
              {/* Y ticks */}
              {pathData.yTickVals && pathData.yTickVals.map((yv: number, idx: number) => {
                const y = (pathData.yScale ? pathData.yScale(yv) : 0);
                return (
                  <g key={idx}>
                    <line x1={margin.left} x2={svgSize.width - margin.right} y1={y} y2={y} stroke="#eee" />
                    <text x={margin.left - 10} y={y + 4} textAnchor="end" fontSize={12} fill="#666">{yv.toFixed(2)}€</text>
                  </g>
                );
              })}

              {/* X ticks */}
              {pathData.xTickVals && pathData.xTickVals.map((d: Date, idx: number) => {
                const x = (pathData.xScale ? pathData.xScale(d.getTime()) : 0);
                return (
                  <g key={idx}>
                    <line x1={x} x2={x} y1={svgSize.height - margin.bottom} y2={margin.top} stroke="#f6f6f6" />
                    <text x={x} y={svgSize.height - 8} textAnchor="middle" fontSize={12} fill="#666">{pathData.xFormat ? pathData.xFormat(d) : ''}</text>
                  </g>
                );
              })}

              {/* line path */}
              {pathData.path && <path d={pathData.path} fill="none" stroke="#e11" strokeWidth={2} />}
            </g>
          </svg>
            <div className="mt-3 text-[var(--gray-3)] text-sm">
              Source: <a href="https://tweakers.net/pricewatch/2210706/corsair-vengeance-rgb-cmh64gx5m2b6000z28.html" target="_blank" rel="noopener noreferrer" className="underline">Tweakers — Corsair Vengeance RGB CMH64GX5M2B6000Z28</a>
            </div>
        </div>
      </div>
    </section>
  );
}
