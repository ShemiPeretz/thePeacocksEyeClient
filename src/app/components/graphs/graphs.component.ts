import {Component, OnInit} from '@angular/core';
import {DashboardLayout} from "../../enums/dashboard-layout";
import {DataService} from "../../data.service";
import {
  GraphMeta,
  TimeInterval,
  Dataset,
  STATIONS,
  GRAPH_TYPES,
  RAIN_STATIONS,
  WEATHER_STATIONS,
  RADIATION_STATIONS,
  RAIN_CHANNELS_DAILY,
  RAIN_CHANNELS_MONTHLY,
  RAIN_CHANNELS_YEARLY,
  HOURLY_CHANNELS, DAILY_CHANNELS, RADIATION_CHANNELS
} from "../../data/graph-meta";


@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.scss'
})
export class GraphsComponent implements OnInit{
  chosenLayout!: DashboardLayout;
  dashboardLayoutsEnum=DashboardLayout;
  stationsByDataset: {[key: string] : { [key: string]: number[] }} = {
    'daily_rain': RAIN_STATIONS,
    "monthly_rain": RAIN_STATIONS,
    "yearly_rain": RAIN_STATIONS,
    "hourly": WEATHER_STATIONS,
    "daily": WEATHER_STATIONS,
    "radiation": RADIATION_STATIONS
  };
  channelsByDataset: {[key: string] : { [key: string]: string }} = {
    'daily_rain': RAIN_CHANNELS_DAILY,
    "monthly_rain": RAIN_CHANNELS_MONTHLY,
    "yearly_rain": RAIN_CHANNELS_YEARLY,
    "hourly": HOURLY_CHANNELS,
    "daily": DAILY_CHANNELS,
    "radiation": RADIATION_CHANNELS
  };



  constructor(private dataService: DataService) {
  }

  ngOnInit(){
    this.chosenLayout = DashboardLayout.four;
  }

  changeLayout(event:any){
    this.chosenLayout =event;
  }

  getDefaultGraphMeta(numberOfGraphs: number): GraphMeta[]{
    let graphsData: GraphMeta[] = [];

    for (let i = 0; i < numberOfGraphs; i++) {
      let graphData: GraphMeta = {
        graphType: "line",
        graphSizeX: 400,
        graphSizeY: 300,
        station: [1],
        isTime: true,
        channelX: 'time',
        channelNameX: 'time',
        channelsY: ['Rain'],
        channelNamesY: ['Rain', 'Temperature'],
        timeInterval: {
          startTime: new Date(2023, 0, 1), // January 1, 2023
          endTime: new Date(2023, 11, 31)  // December 31, 2023
        },
        dataset: Dataset.daily,
        cumulative: false
      };
      graphsData.push(graphData);
    }

    return graphsData;
  }

  validateGraphData(graphData: GraphMeta){

  }

  buildGraph(graphData: GraphMeta): Promise<string> {
    return new Promise((resolve, reject) => {
      this.dataService.postGraph(graphData).subscribe(
        graph => resolve(graph),
        error => reject(error)
      );
    });
  }

  loadJson(filePath: string): any {
    this.dataService.readJsonFile(filePath).subscribe(
      data => {
        return data.data;
      },
      error => {
        console.error('Error reading JSON file', error);
      }
    );
  }
}
