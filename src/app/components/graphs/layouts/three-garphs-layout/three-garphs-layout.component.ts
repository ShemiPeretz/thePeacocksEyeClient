import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {GraphsComponent} from "../../graphs.component";
import {Dataset, GRAPH_TYPES, GraphMeta, STATIONS} from "../../../../data/graph-meta";
import {FormControl} from '@angular/forms';
import {PopupMessageComponent} from "../../../popup-message/popup-message.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSelectChange} from "@angular/material/select";

declare var Plotly: any;


@Component({
  selector: 'app-three-garphs-layout',
  templateUrl: './three-garphs-layout.component.html',
  styleUrl: './three-garphs-layout.component.scss'
})
export class ThreeGarphsLayoutComponent implements OnInit, AfterViewInit {
  LAYOUT: string = 'ThreeGarphs';
  stations: { [key: number]: string } = STATIONS;
  graphTypes: { [key: string]: string } = GRAPH_TYPES;
  datasets = Dataset;

  isEditModes: boolean[] = [false, false, false, false];
  graphsData: GraphMeta[] = [];
  selectedYChannels: FormControl[] = [];
  yChannels: string[][] = [];

  @ViewChildren('plotlyGraph') plotlyGraphs!: QueryList<ElementRef>;
  plotlyGraphIds: string[] = ['graph1', 'graph2', 'graph3'];


  constructor(protected graphs: GraphsComponent, public dialog: MatDialog) {
  }

  ngOnInit() {
    // Filling default meta data for graphs
    this.graphsData = this.graphs.getDefaultGraphMeta(3);
    this.setSelectedValuesFromDefaultGraphData();
  }

  ngAfterViewInit(): void {
    // Initializing default plotly graphs
    this.initializeGraphs();
  }

  setSelectedValuesFromDefaultGraphData(): void {
    for (let i = 0; i < 3; i++) {
      const graphData = this.graphsData[i];
      this.selectedYChannels[i] = new FormControl<string>(graphData.channelsY[0]);
      this.yChannels[i] = graphData.channelsY;
      this.selectedYChannels[i].valueChanges.subscribe((selectedValues: string[]) => {
        // Update yChannels based on selected values
        this.updateYChannels(selectedValues, i);
      });
    }
  }

  editGraph(graphNumber: number, isShowBtn: boolean): void {
    if (this.graphsData[graphNumber]?.channelsY.includes(this.graphsData[graphNumber]?.channelX)) {
      this.showPopup('', 'overlapping x and y channels');
    } else {
      if (isShowBtn) {
        this.updateSpecificGraph(graphNumber);
      }
      this.isEditModes[graphNumber] = !this.isEditModes[graphNumber];
    }
  }

  updateYChannels(selectedValues: string[], graphNumber: number) {
    // Clear existing yChannels array
    this.yChannels[graphNumber] = [];
    // Push selected values into yChannels array
    this.yChannels[graphNumber] = selectedValues;
    const yChannelsLabels = this.getChannelLabelsFromName(graphNumber, selectedValues)
    //Update graphData
    this.graphsData[graphNumber].channelsY = selectedValues;
    this.graphsData[graphNumber].channelNamesY = yChannelsLabels;
  }

  getChannelLabelsFromName(graphNumber: number, selectedValues: string[]): string[] {
    let labels: string[] = [];
    let channelsByDataset = this.graphs.channelsByDataset[this.graphsData[graphNumber].dataset];
    for (const selectedValue of selectedValues) {
      labels.push(channelsByDataset[selectedValue])
    }
    return labels
  }

  validateGraphData(graphNumber: number) {
    // Check duplicated channels in X and Y
    this.graphsData[graphNumber].channelNameX = this.getChannelLabelsFromName(
      graphNumber, [this.graphsData[graphNumber].channelX])[0];
  }


  initializeGraphs() {
    this.plotlyGraphIds.forEach((id, index) => {
      const graphElement = this.plotlyGraphs.find(el => el.nativeElement.id === id);
      if (graphElement) {
        const cachedGraph = this.graphs.getGraph(this.LAYOUT, id);
        if (cachedGraph) {
          this.renderGraph(graphElement.nativeElement, cachedGraph);
        } else {
          this.graphs.getDefaultGraphs().then(value => {
            const defaultGraphs = value;
            this.renderGraph(graphElement.nativeElement, defaultGraphs);
            // Cache the default graph
            this.graphs.setGraph(this.LAYOUT, id, defaultGraphs);
          });
        }
      }
    });
  }

  renderGraph(element: HTMLElement, data: any) {
    const layout = {
      title: 'Responsive to window\'s size!',
      font: {size: 18}
    };
    const config = {responsive: false}
    Plotly.newPlot(element, JSON.parse(data), layout, config);
    // Plotly.react(element, JSON.parse(data));
    const x = 0;
  }

  updateGraph(graphId: string, newData: any) {
    const graphElement = this.plotlyGraphs.find(el => el.nativeElement.id === graphId);
    if (newData.error) {
      this.showPopup('Error', newData.error);
      const graphNumber = Number(graphId.charAt(5)) - 1;
      this.isEditModes[graphNumber] = !this.isEditModes[graphNumber];
    } else if (graphElement) {
      Plotly.react(graphElement.nativeElement, JSON.parse(newData));
    }
  }

  updateSpecificGraph(graphNumber: number) {
    this.validateGraphData(graphNumber);
    this.graphs.buildGraph(this.graphsData[graphNumber]).then(graph => {
      const graphId = "graph" + (graphNumber + 1).toString();
      this.updateGraph(graphId, graph);
      // Cache the updated graph
      this.graphs.setGraph(this.LAYOUT, graphId, graph);
    }).catch(error => {
      console.error(error);
    });
  }

  showPopup(title: string, message: string): void {
    this.dialog.open(PopupMessageComponent, {
      width: '250px',
      data: {title: title, message: message}
    });
  }

  compareStations(station1: number, station2: number): boolean {
    return station1 === station2;
  }

  onStationSelectionChange(event: MatSelectChange, graphNumber: number): void {
    if (event.value.length > 2) {
      this.graphsData[graphNumber].station = event.value.slice(0, 2);
    }
  }
}
