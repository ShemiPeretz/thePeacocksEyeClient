import {Component, OnInit, ElementRef, ViewChild,  ViewChildren, QueryList} from '@angular/core';
import {GraphsComponent} from "../../graphs.component";
import {GraphMeta, Dataset, STATIONS, GRAPH_TYPES} from "../../../../data/graph-meta";
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
declare var Plotly: any;


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

  graphsJsons: string[] = [];
  @ViewChildren('plotlyGraph') plotlyGraphs!: QueryList<ElementRef>;
  graphIds: string[] = ['graph1', 'graph2', 'graph3', 'graph4'];




  constructor(protected graphs: GraphsComponent) {
  }

  ngOnInit() {
    this.graphsData = this.graphs.getDefaultGraphMeta(4);
    this.initializeGraphs();
    this.setSelectedValuesFromDefaultGraphData();

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
      this.updateSpecificGraph(graphNumber);
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

  initializeGraphs() {
    this.graphIds.forEach((id, index) => {
      const graphElement = this.plotlyGraphs.find(el => el.nativeElement.id === id);
      if (graphElement) {
        this.renderGraph(graphElement.nativeElement, this.graphsJsons[index]);
      }
    });
  }

  renderGraph(element: HTMLElement, data: any) {
    Plotly.newPlot(element, JSON.parse(data));
  }

  updateGraph(graphId: string, newData: any) {
    const graphElement = this.plotlyGraphs.find(el => el.nativeElement.id === graphId);
    if (graphElement) {
      Plotly.react(graphElement.nativeElement, JSON.parse(newData));
    }
  }

  updateSpecificGraph(graphNumber: number) {
    this.graphs.validateGraphData(this.graphsData[graphNumber]);
    this.graphs.buildGraph(this.graphsData[graphNumber]).then(graph => {
      this.updateGraph("graph" + (graphNumber+1).toString(), graph);
    }).catch(error => {
      console.error(error);
    });
  }

}
