export interface GraphMeta {
  graphType: string;
  graphSizeX: number;
  graphSizeY: number;
  station: number;
  isTime: boolean;
  channelX: string;
  channelNameX: string;
  channelsY: string[];
  channelNamesY: string[];
  timeInterval: TimeInterval;
  dataset: Datasets;
  hourly: boolean;
  daily: boolean;
  cumulative: boolean;
}

export interface TimeInterval {
  startTime: Date;
  endTime: Date;
}

export enum Datasets {
  daily_rain = "daily_rain",
  monty_rain = "monty_rain",
  yearly_rain = "yearly_rain",
  hourly = "hourly",
  daily = "daily",
  radiation = "radiation"
}

export const STATIONS: { [key: number]: string } = {
  1: 'Station1',
  2: 'Station2',
  3: 'Station3',
  4: 'Station4'
};

export const GRAPH_TYPES: { [key: string]: string } = {
  'line': 'Line Graph',
  'bar': 'Bar Graph',
  'pie': 'Pie Chart'
};

export const CHANNELS: { [key: string]: string } = {
  "time": "time",
  "Rain": "Rain",
  "WS": "Wind Speed",
  "WD": "Wind Direction",
  "TD": "Temperature",
  "RH": "Humidity",
  "TDmax": "Max Temperature",
  "TDmin": "Min Temperature",
  "BP": "Pressure",
  "Grad": "Radiation"
};
