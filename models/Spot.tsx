interface Spot {
  id: string;
  name: string;
  location: string;
  coordinates: number[];
  waveType: string;
  difficulty: string;
  description: string;
  stats?: SurfStats;
  forecast?: HourlyData[];
  dailyForecast?: DailyData[];
}
