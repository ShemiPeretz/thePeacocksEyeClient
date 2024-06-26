import {Component, OnInit} from '@angular/core';
import {GraphsComponent} from "../../graphs.component";
import {GraphMeta, TimeInterval, Datasets, STATIONS, GRAPH_TYPES, CHANNELS} from "../../../../data/graph-meta";
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-four-garphs-layout',
  templateUrl: './four-garphs-layout.component.html',
  styleUrl: './four-garphs-layout.component.scss'
})
export class FourGarphsLayoutComponent implements OnInit{
  stations: { [key: number]: string } = STATIONS;
  graphTypes: { [key: string]: string } = GRAPH_TYPES;
  channels: { [key: string]: string } = CHANNELS;
  datasets = Datasets;

  isEditModes: boolean[] = [false, false, false, false];
  graphsData: GraphMeta[] = [];
  selectedGraphTypes: string[] = [];
  selectedStationsIds: number[] = [];
  selectedStationsNames: string[] = [];
  selectedXChannels: string[] = [];
  selectedYChannels: FormControl[] = [];
  yChannels: string[][] = [];
  selectedTimeIntervals: TimeInterval[] = [];
  selectedDatasets: string[] = [];
  selectedCumulative: boolean[] = [];

  constructor(private graphs: GraphsComponent) {
  }

  ngOnInit() {
    this.graphsData = this.graphs.getDefaultGraphMeta(4);
    this.setSelectedValuesFromGraphData();
  }

  setSelectedValuesFromGraphData(): void{
    for (let i = 0; i < 4; i++) {
      const graphData = this.graphsData[i];
      this.selectedGraphTypes[i] = graphData.graphType;
      this.selectedStationsIds[i] = graphData.station;
      this.selectedStationsNames[i] = this.stations[graphData.station];
      this.selectedXChannels[i] = graphData.channelX;
      this.selectedYChannels[i] = new FormControl<string>(graphData.channelsY[0]);
      this.yChannels[i] = graphData.channelsY;
      this.selectedYChannels[i].valueChanges.subscribe((selectedValues: string[]) => {
        // Update yChannels based on selected values
        this.updateYChannels(selectedValues, i);
      });
      this.selectedTimeIntervals[i] = graphData.timeInterval;
      this.selectedDatasets[i] = graphData.dataset.valueOf();
      this.selectedCumulative[i] = graphData.cumulative;
    }
  }

  editGraph(graphNumber: number, isShowBtn: boolean): void{
    if(isShowBtn){
      this.buildGraph(graphNumber);
    }
    this.isEditModes[graphNumber] = !this.isEditModes[graphNumber];
  }

  updateYChannels(selectedValues: string[], graphNumber: number) {
    // Clear existing yChannels array
    this.yChannels[graphNumber] = [];

    // Push selected values into yChannels array
    this.yChannels[graphNumber] = selectedValues;
  }

  buildGraph(graphNumber: number){
    // if (graphNumber === 1) {
    // } else if (graphNumber === 2) {
    // } else if (graphNumber === 3) {
    // } else if (graphNumber === 4) {
    // }
  }
}
