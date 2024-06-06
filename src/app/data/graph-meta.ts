import {TimeInterval} from "./time-interval";

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
  hourly: boolean;
  daily: boolean;
  cumulative: boolean;
}
