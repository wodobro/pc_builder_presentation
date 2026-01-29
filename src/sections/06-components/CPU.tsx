import React, { useState } from 'react';
import { SectionLabel } from '@/components/shared/SectionLabel';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Cpu, Activity, Zap, Layers, Box, Thermometer, ExternalLink, Check, Minus, Microchip, ChevronDown } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

/* Mock Data for the CPU Table */
const cpuData = [
  { id: 1, brand: 'Intel', model: 'Core i9-14900K', price: '$549', cores: 24, threads: 32, baseClock: '3.2 GHz', boostClock: '6.0 GHz', pCores: 8, eCores: 16, socket: 'LGA1700', igpu: true, generation: '14' },
  { id: 2, brand: 'AMD', model: 'Ryzen 9 9950X3D', price: '$599', cores: 16, threads: 32, baseClock: '4.3 GHz', boostClock: '5.7 GHz', pCores: 16, eCores: 0, socket: 'AM5', igpu: true, generation: '5' },
  { id: 3, brand: 'Intel', model: 'Core i7-14700K', price: '$389', cores: 20, threads: 28, baseClock: '3.4 GHz', boostClock: '5.6 GHz', pCores: 8, eCores: 12, socket: 'LGA1700', igpu: true, generation: '14' },
  { id: 4, brand: 'AMD', model: 'Ryzen 7 9800X3D', price: '$369', cores: 8, threads: 16, baseClock: '4.7 GHz', boostClock: '5.2 GHz', pCores: 8, eCores: 0, socket: 'AM5', igpu: true, generation: '4' },
  { id: 5, brand: 'Intel', model: 'Core i5-14600K', price: '$299', cores: 14, threads: 20, baseClock: '3.5 GHz', boostClock: '5.3 GHz', pCores: 6, eCores: 8, socket: 'LGA1700', igpu: true, generation: '14' },
  { id: 6, brand: 'AMD', model: 'Ryzen 5 7600X', price: '$229', cores: 6, threads: 12, baseClock: '4.7 GHz', boostClock: '5.3 GHz', pCores: 6, eCores: 0, socket: 'AM5', igpu: true, generation: '6' },
  { id: 7, brand: 'Intel', model: 'Core i5-13400F', price: '$185', cores: 10, threads: 16, baseClock: '2.5 GHz', boostClock: '4.6 GHz', pCores: 6, eCores: 4, socket: 'LGA1700', igpu: false, generation: '13' },
];

export function CPU() {
  const [columns, setColumns] = useState({
    brand: true,
    cores: true,
    threads: false,
    clockSpeed: true,
    coreTypes: true,
    socket: true,
    graphics: false,
  });

  const toggleColumn = (key: string) => setColumns((p) => ({ ...p, [key]: !p[key as keyof typeof p] }));
  const [sortOption, setSortOption] = useState('none');
  const [description, setDescription] = useState('Select a control label to see a short description.');

  // planed iframe: https://www.cpubenchmark.net/cpu_value_available.html

  const getDisplayedData = () => {
    let data = [...cpuData];

    // generation filtering removed (select removed)

    const parsePrice = (p: string) => Number(p.replace(/[^0-9.]/g, ''));
    const parseGHz = (s: string) => parseFloat(s.replace(/[^0-9.]/g, '')) || 0;

    switch (sortOption) {
      case 'price_asc':
        data.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case 'price_desc':
        data.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case 'cores_asc':
        data.sort((a, b) => a.cores - b.cores);
        break;
      case 'cores_desc':
        data.sort((a, b) => b.cores - a.cores);
        break;
      case 'boost_asc':
        data.sort((a, b) => parseGHz(a.boostClock) - parseGHz(b.boostClock));
        break;
      case 'boost_desc':
        data.sort((a, b) => parseGHz(b.boostClock) - parseGHz(a.boostClock));
        break;
      case 'threads_asc':
        data.sort((a, b) => a.threads - b.threads);
        break;
      case 'threads_desc':
        data.sort((a, b) => b.threads - a.threads);
        break;
      case 'brand_asc':
        data.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      case 'brand_desc':
        data.sort((a, b) => b.brand.localeCompare(a.brand));
        break;
      case 'socket_asc':
        data.sort((a, b) => a.socket.localeCompare(b.socket));
        break;
      case 'socket_desc':
        data.sort((a, b) => b.socket.localeCompare(a.socket));
        break;
      case 'coreTypes_asc':
        data.sort((a, b) => a.pCores - b.pCores);
        break;
      case 'coreTypes_desc':
        data.sort((a, b) => b.pCores - a.pCores);
        break;
      case 'graphics_asc':
        data.sort((a, b) => Number(a.igpu) - Number(b.igpu));
        break;
      case 'graphics_desc':
        data.sort((a, b) => Number(b.igpu) - Number(a.igpu));
        break;
      case 'generation_asc':
        data.sort((a, b) => Number(a.generation) - Number(b.generation));
        break;
      case 'generation_desc':
        data.sort((a, b) => Number(b.generation) - Number(a.generation));
        break;
      default:
        break;
    }

    return data;
  };

  return (
    <section id="cpu" className="relative flex flex-col p-4 md:p-8 w-full min-h-screen snap-start">

      {/* Header */}
      <div className="flex flex-col gap-2 mt-20 mb-8 overflow-visible animate-fadeIn">
        <div className="flex items-center gap-3 overflow-visible">
          <h2 className="bg-clip-text bg-gradient-to-r from-[var(--color-purple-3)] via-[var(--color-magenta-2)] to-[var(--color-red-3)] p-2 overflow-visible font-bold text-transparent text-5xl tracking-tight">
            CPUs (Processors)
          </h2>
          <Badge variant="outline" className="border-[var(--color-purple-3)] text-[var(--color-purple-3)] text-xs">
            The Brain
          </Badge>
        </div>
        <p className="max-w-3xl text-[var(--gray-3)] text-sm">
          What to look for when buying a processor. Compare specs, prices, and architecture to find the heart of your next build.
        </p>
      </div>
      
      <Separator className="bg-gradient-to-r from-transparent via-[var(--color-purple-3)] to-transparent opacity-30 mb-6" />

      <div className='flex flex-row gap-4'>

          {/* Controls */}
          <div className="w-80">
            <Card>
              <CardHeader>
                <CardTitle>Compare Specs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* removed select controls per request */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Box className="w-4 h-4 text-muted-foreground" />
                    <Button variant="ghost" size="sm" onClick={() => setDescription('Brand indicates the manufacturer (Intel or AMD). Use this to filter or prioritize vendor-specific features.')}>Brand Identity</Button>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <Switch checked={columns.brand} onCheckedChange={() => toggleColumn('brand')} />
                    <Button size="sm" variant="outline" onClick={() => setSortOption('brand_asc')}>Sort</Button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Layers className="w-4 h-4 text-muted-foreground" />
                    <Button variant="ghost" size="sm" onClick={() => setDescription('Core count is total physical cores — higher counts help parallel workloads and productivity tasks.')}>Core Counts</Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={columns.cores} onCheckedChange={() => toggleColumn('cores')} />
                    <Button size="sm" variant="outline" onClick={() => setSortOption('cores_desc')}>Sort</Button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                    <Button variant="ghost" size="sm" onClick={() => setDescription('Thread count represents logical threads; simultaneous multithreading adds threads per core and improves multitasking.')}>Thread Count</Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={columns.threads} onCheckedChange={() => toggleColumn('threads')} />
                    <Button size="sm" variant="outline" onClick={() => setSortOption('threads_desc')}>Sort</Button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-muted-foreground" />
                    <Button variant="ghost" size="sm" onClick={() => setDescription('Clock speeds include base and boost frequencies; single-threaded performance often benefits from higher boost clocks.')}>Clock Speeds</Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={columns.clockSpeed} onCheckedChange={() => toggleColumn('clockSpeed')} />
                    <Button size="sm" variant="outline" onClick={() => setSortOption('boost_desc')}>Sort</Button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Microchip className="w-4 h-4 text-muted-foreground" />
                    <Button variant="ghost" size="sm" onClick={() => setDescription('P-Cores (performance) are optimized for single-thread throughput; E-Cores (efficiency) are for background and parallel tasks.')}>P-Cores / E-Cores</Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={columns.coreTypes} onCheckedChange={() => toggleColumn('coreTypes')} />
                    <Button size="sm" variant="outline" onClick={() => setSortOption('coreTypes_desc')}>Sort</Button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-muted-foreground" />
                    <Button variant="ghost" size="sm" onClick={() => setDescription('Socket type determines motherboard compatibility — LGA/AM sockets are vendor-specific.')}>Socket Type</Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={columns.socket} onCheckedChange={() => toggleColumn('socket')} />
                    <Button size="sm" variant="outline" onClick={() => setSortOption('socket_desc')}>Sort</Button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Box className="w-4 h-4 text-muted-foreground" />
                    <Button variant="ghost" size="sm" onClick={() => setDescription('Integrated Graphics (iGPU) indicates whether the CPU includes an on-die GPU for display and light graphics workloads.')}>Integrated Graphics</Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={columns.graphics} onCheckedChange={() => toggleColumn('graphics')} />
                    <Button size="sm" variant="outline" onClick={() => setSortOption('graphics_asc')}>Sort</Button>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-4 border-t">
                <a href="https://www.cpubenchmark.net/power_performance.html" target="_blank" rel="noreferrer" className="flex justify-between items-center w-full">
                  <div className="flex flex-col text-sm">
                    <span className="opacity-70 font-bold text-xs uppercase">External Data</span>
                    <span className="font-semibold">Power vs Performance</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </a>
              </CardFooter>
            </Card>
            <div className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Control Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{description}</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Table */}
          <div className="flex flex-col lg:col-span-6 h-full">
            <Card className="flex flex-col flex-1 h-full overflow-hidden">
              <CardContent className="flex-1 p-0 overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted text-muted-foreground text-xs uppercase">
                    <TableRow>
                      <TableHead className="px-4 py-3 font-medium">Model</TableHead>
                      <TableHead className="px-4 py-3 font-medium text-right">Price</TableHead>
                      <TableHead className="px-4 py-3 font-medium text-center">Generation</TableHead>
                      {columns.brand && <TableHead className="px-4 py-3 font-medium text-center">Brand</TableHead>}
                      {columns.cores && <TableHead className="px-4 py-3 font-medium text-center">Cores</TableHead>}
                      {columns.threads && <TableHead className="px-4 py-3 font-medium text-center">Threads</TableHead>}
                      {columns.clockSpeed && (
                        <>
                          <TableHead className="px-4 py-3 font-medium text-center">Base Clock</TableHead>
                          <TableHead className="px-4 py-3 font-medium text-primary text-center">Boost</TableHead>
                        </>
                      )}
                      {columns.coreTypes && (
                        <>
                          <TableHead className="px-4 py-3 font-medium text-center">P-Cores</TableHead>
                          <TableHead className="px-4 py-3 font-medium text-center">E-Cores</TableHead>
                        </>
                      )}
                      {columns.socket && <TableHead className="px-4 py-3 font-medium text-center">Socket</TableHead>}
                      {columns.graphics && <TableHead className="px-4 py-3 font-medium text-center">iGPU</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y">
                    {getDisplayedData().map((cpu) => (
                      <TableRow key={cpu.id} className="bg-card hover:bg-muted/30 transition-colors">
                        <TableCell className="px-4 py-3 font-medium whitespace-nowrap">{cpu.model}</TableCell>
                        <TableCell className="px-4 py-3 font-bold text-primary text-right">{cpu.price}</TableCell>

                        {/* Generation cell (aligned with header) */}
                        <TableCell className="px-4 py-3 text-center">{cpu.generation}</TableCell>

                        {columns.brand && (
                          <TableCell className="px-4 py-3 text-center">
                            {cpu.brand === 'Intel' ? (
                              <Badge variant="outline" className='bg-blue-300 border-blue-600 text-blue-600'>INTEL</Badge>
                            ) : (
                              <Badge variant="outline" className='bg-red-300 border-red-600 text-red-600'>AMD</Badge>
                            )}
                          </TableCell>
                        )}

                        {columns.cores && <TableCell className="px-4 py-3 text-muted-foreground text-center">{cpu.cores}</TableCell>}
                        {columns.threads && <TableCell className="px-4 py-3 text-muted-foreground text-center">{cpu.threads}</TableCell>}

                        {columns.clockSpeed && (
                          <>
                            <TableCell className="px-4 py-3 text-muted-foreground text-center">{cpu.baseClock}</TableCell>
                            <TableCell className="px-4 py-3 font-semibold text-primary text-center">{cpu.boostClock}</TableCell>
                          </>
                        )}

                        {columns.coreTypes && (
                          <>
                            <TableCell className="px-4 py-3 text-muted-foreground text-center">{cpu.pCores}</TableCell>
                            <TableCell className="px-4 py-3 text-muted-foreground text-center">{cpu.eCores > 0 ? cpu.eCores : <span className="text-muted">-</span>}</TableCell>
                          </>
                        )}

                        {columns.socket && (
                          <TableCell className="px-4 py-3 text-center">
                            <Badge variant="outline">{cpu.socket}</Badge>
                          </TableCell>
                        )}

                        {columns.graphics && (
                          <TableCell className="px-4 py-3 text-center">
                            {cpu.igpu ? <Check className="mx-auto w-4 h-4 text-primary" /> : <Minus className="mx-auto w-4 h-4 text-muted-foreground" />}
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>

              <CardFooter className="mt-auto p-4 border-t">
                <div className="flex items-center gap-2 w-full text-muted-foreground text-xs">
                  <Thermometer className="w-3 h-3" />
                  Ensure your cooling solution matches the TDP of high-core-count models.
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>

        <SectionLabel label="cpu" />
    </section>
  );
}