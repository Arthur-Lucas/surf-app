'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import spots from '../../datas/spots.json';

interface SurfStats {
    wind: string;
    tide: string;
    swellHeight: string;
    swellDirection: string;
    swellPeriod: string;
    waterTemp: string;
    airTemp: string;
    rating: number;
}

interface HourlyData {
    hour: string;
    swell: number;
    wind: number;
    tide: number;
}

interface DailyData {
    day: string;
    swell: number;
    wind: number;
    tide: number;
}

interface Spot {
    id: string;
    name: string;
    location: string;
    waveType: string;
    difficulty: string;
    description: string;
    stats: SurfStats;
    forecast: HourlyData[];
    dailyForecast: DailyData[];
}

export default function SingleSpot() {
    const { id } = useParams();
    const [spot, setSpot] = useState<Spot | null>(null);
    const [selectedData, setSelectedData] = useState<'swell' | 'wind' | 'tide'>('swell');

    useEffect(() => {
        const found = (spots as Spot[]).find((s) => s.id === id);
        setSpot(found || null);
    }, [id]);

    if (!spot) return <div className="p-8">Spot introuvable.</div>;

    return (
        <section className="relative min-h-screen p-4 sm:p-8 bg-white text-black overflow-hidden">
            <h1 className="absolute text-[20rem] font-bold text-gray-100 opacity-50 pointer-events-none -top-16 left-0 select-none whitespace-nowrap">
                {spot.name.toUpperCase()}
            </h1>

            <div className="relative z-10 max-w-5xl mx-auto space-y-12">
                <div>
                    <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">{spot.name}</h2>
                    <p className="text-lg text-gray-500">{spot.location}</p>
                </div>

                <div className="flex gap-4 flex-wrap">
                    <Badge variant="outline">{spot.waveType}</Badge>
                    <Badge variant="secondary">{spot.difficulty}</Badge>
                </div>

                <p className="max-w-3xl text-base leading-relaxed text-gray-700">{spot.description}</p>

                <Card className="border border-gray-200 rounded-xl bg-white">
                    <CardContent className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm">
                        <SurfStat label="Vent" value={spot.stats.wind} />
                        <SurfStat label="Marée" value={spot.stats.tide} />
                        <SurfStat label="Houle" value={spot.stats.swellHeight} />
                        <SurfStat label="Direction Houle" value={spot.stats.swellDirection} />
                        <SurfStat label="Période" value={spot.stats.swellPeriod} />
                        <SurfStat label="Temp. Eau" value={spot.stats.waterTemp} />
                        <SurfStat label="Temp. Air" value={spot.stats.airTemp} />
                        <SurfStat
                            label="Note"
                            value={`${'★'.repeat(spot.stats.rating)}${'☆'.repeat(5 - spot.stats.rating)}`}
                        />
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Prévisions horaires</h3>

                    <ToggleGroup
                        type="single"
                        className="flex flex-wrap gap-2"
                        value={selectedData}
                        onValueChange={(val) => setSelectedData(val as 'swell' | 'wind' | 'tide')}
                    >
                        <ToggleGroupItem value="swell">Houle</ToggleGroupItem>
                        <ToggleGroupItem value="wind">Vent</ToggleGroupItem>
                        <ToggleGroupItem value="tide">Marée</ToggleGroupItem>
                    </ToggleGroup>

                    <div className="h-64 sm:h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={spot.forecast}>
                                <XAxis dataKey="hour" stroke="#999" />
                                <YAxis stroke="#999" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'white', borderColor: '#ccc', color: 'black' }}
                                    formatter={(value: any, name: any) => [`${value}`, name.charAt(0).toUpperCase() + name.slice(1)]}
                                />
                                <Line
                                    type="monotone"
                                    dataKey={selectedData}
                                    stroke="#000"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Prévisions sur 7 jours</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {spot.dailyForecast.map((day, index) => (
                            <Card key={index} className="border border-gray-200">
                                <CardContent className="p-4 text-sm space-y-1">
                                    <div className="font-semibold">{day.day}</div>
                                    <div>🌊 Houle : {day.swell} m</div>
                                    <div>💨 Vent : {day.wind} km/h</div>
                                    <div>🌙 Marée : {day.tide} m</div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function SurfStat({ label, value }: { label: string; value: string; }) {
    return (
        <div className="space-y-1">
            <div className="text-gray-500 uppercase text-xs tracking-wide">{label}</div>
            <div className="font-medium text-black">{value}</div>
        </div>
    );
}