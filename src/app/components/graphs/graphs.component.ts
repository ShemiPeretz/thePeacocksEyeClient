import {Component, OnInit} from '@angular/core';
import {DashboardLayout} from "../../enums/dashboard-layout";
import {DataService} from "../../data.service";
import {GraphMeta, TimeInterval, Datasets, STATIONS, GRAPH_TYPES} from "../../data/graph-meta";


@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.scss'
})
export class GraphsComponent implements OnInit{
  chosenLayout!: DashboardLayout;
  dashboardLayoutsEnum=DashboardLayout;
  graphStations!:[];
  stations: { [key: number]: string } = STATIONS;


  constructor(private dataService: DataService) {
  }

  ngOnInit(){
    this.chosenLayout = DashboardLayout.four;
    this.dataService.getActiveCities().subscribe(data => {
      this.graphStations = data;
    });
  }

  changeLayout(event:any){
    this.chosenLayout =event;
  }

  getDefaultGraphMeta(numberOfGraphs: number): GraphMeta[]{
    var graphsData: GraphMeta[] = [];

    for (let i = 0; i < numberOfGraphs; i++) {
      let graphData: GraphMeta = {
        graphType: "line",
        graphSizeX: 400,
        graphSizeY: 300,
        station: 1,
        isTime: true,
        channelX: 'time',
        channelNameX: 'time',
        channelsY: ['Rain'],
        channelNamesY: ['Rain', 'Temperature'],
        timeInterval: {
          startTime: new Date(2023, 0, 1), // January 1, 2023
          endTime: new Date(2023, 11, 31)  // December 31, 2023
        },
        dataset: Datasets.daily,
        hourly: true,
        daily: false,
        cumulative: false
      };
      graphsData.push(graphData);
    }

    return graphsData;
  }

}
