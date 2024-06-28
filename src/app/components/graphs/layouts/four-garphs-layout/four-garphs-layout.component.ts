import {Component, OnInit} from '@angular/core';
import {GraphsComponent} from "../../graphs.component";
import {GraphMeta, Dataset, STATIONS, GRAPH_TYPES} from "../../../../data/graph-meta";
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-four-garphs-layout',
  templateUrl: './four-garphs-layout.component.html',
  styleUrl: './four-garphs-layout.component.scss'
})
export class FourGarphsLayoutComponent implements OnInit{
  stations: { [key: number]: string } = STATIONS;
  graphTypes: { [key: string]: string } = GRAPH_TYPES;
  datasets = Dataset;

  isEditModes: boolean[] = [false, false, false, false];
  graphsData: GraphMeta[] = [];
  selectedYChannels: FormControl[] = [];
  yChannels: string[][] = [];

  graphsPaths: string[] = [];


  constructor(protected graphs: GraphsComponent) {
  }

  ngOnInit() {
    this.graphsData = this.graphs.getDefaultGraphMeta(4);
    this.setSelectedValuesFromDefaultGraphData();
    this.graphsPaths = ["/assets/map/max_temp_beer_sheva.html",
      "/assets/map/min_temp_beer_sheva.html",
      "/assets/map/ashdod_tel_aviv_avg_rain.html",
      "/assets/map/avg_rain_ashdod.html"];
  }

  setSelectedValuesFromDefaultGraphData(): void{
    for (let i = 0; i < 4; i++) {
      const graphData = this.graphsData[i];
      this.selectedYChannels[i] = new FormControl<string>(graphData.channelsY[0]);
      this.yChannels[i] = graphData.channelsY;
      this.selectedYChannels[i].valueChanges.subscribe((selectedValues: string[]) => {
        // Update yChannels based on selected values
        this.updateYChannels(selectedValues, i);
      });
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
    //Update graphData
    this.graphsData[graphNumber].channelsY = selectedValues;
  }

  buildGraph(graphNumber: number){
    this.graphs.validateGraphData(this.graphsData[graphNumber]);
    this.graphs.buildGraph(this.graphsData[graphNumber]).then(graph => {
      this.graphsPaths[graphNumber] = graph;
    }).catch(error => {
      console.error(error);
    });
  }
}
