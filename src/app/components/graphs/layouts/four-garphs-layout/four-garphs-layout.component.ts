import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {GraphsComponent} from "../../graphs.component";
import {Dataset, GRAPH_TYPES, GraphMeta, STATIONS} from "../../../../data/graph-meta";
import {FormControl} from '@angular/forms';
import {PopupMessageComponent} from "../../../popup-message/popup-message.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSelectChange} from "@angular/material/select";

declare var Plotly: any;


@Component({
  selector: 'app-four-garphs-layout',
  templateUrl: './four-garphs-layout.component.html',
  styleUrl: './four-garphs-layout.component.scss'
})
export class FourGarphsLayoutComponent implements OnInit, AfterViewInit {
  LAYOUT: string = 'FourGarphs';
  stations: { [key: number]: string } = STATIONS;
  graphTypes: { [key: string]: string } = GRAPH_TYPES;
  datasets = Dataset;

  isEditModes: boolean[] = [false, false, false, false];
  graphsData: GraphMeta[] = [];
  selectedYChannels: FormControl[] = [];
  yChannels: string[][] = [];

  @ViewChildren('plotlyGraph') plotlyGraphs!: QueryList<ElementRef>;
  plotlyGraphIds: string[] = ['graph1', 'graph2', 'graph3', 'graph4'];


  constructor(protected graphs: GraphsComponent, public dialog: MatDialog) {
  }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized. It initializes the default graph metadata and sets selected values from the default graph data.
   */
  ngOnInit() {
    // Filling default meta data for graphs
    this.graphsData = this.graphs.getDefaultGraphMeta(4);
    this.setSelectedValuesFromDefaultGraphData();
  }

  /**
   * Lifecycle hook that is called after a component's view has been fully initialized. It initializes the default Plotly graphs.
   */
  ngAfterViewInit(): void {
    // Initializing default plotly graphs
    this.initializeGraphs();
  }

  /**
   * Sets the selected values for Y channels based on the default graph data. It initializes form controls for Y channel selection and sets up subscriptions to handle value changes.
   */
  setSelectedValuesFromDefaultGraphData(): void {
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

  /**
   * Toggles the edit mode for a specific graph. It checks for overlapping X and Y channels, updates the graph if necessary, and toggles the edit mode state.
   * @param graphNumber - graph index
   * @param isShowBtn - is it editing mode or building graph mode
   */
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

  /**
   * Updates the Y channels for a specific graph based on the selected values. It updates the local Y channels array, gets the corresponding channel labels, and updates the graph data.
   * @param selectedValues - Y channels selected
   * @param graphNumber - graph index
   */
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

  /**
   * Retrieves the channel labels for given channel names. It maps the selected channel names to their corresponding labels using the channel data for the specific dataset.
   * @param graphNumber - graph index
   * @param selectedValues - Y channels selected
   */
  getChannelLabelsFromName(graphNumber: number, selectedValues: string[]): string[] {
    let labels: string[] = [];
    let channelsByDataset = this.graphs.channelsByDataset[this.graphsData[graphNumber].dataset];
    for (const selectedValue of selectedValues) {
      labels.push(channelsByDataset[selectedValue])
    }
    return labels
  }

  /**
   * Validates the graph data for a specific graph. Currently, it only sets the X channel name based on the selected X channel.
   * @param graphNumber - graph index
   */
  validateGraphData(graphNumber: number) {
    // Check duplicated channels in X and Y
    this.graphsData[graphNumber].channelNameX = this.getChannelLabelsFromName(
      graphNumber, [this.graphsData[graphNumber].channelX])[0];
  }


  /**
   * Initializes all four graphs. It either retrieves cached graph data or uses default graph data to render each graph.
   */
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

  /**
   * Renders a Plotly graph in the specified HTML element using the provided data. It sets up the layout and configuration for the graph.
   * @param element - HTML graph element
   * @param data - data for the graph
   */
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

  /**
   *  Updates an existing graph with new data. If there's an error in the new data, it displays an error popup. Otherwise, it updates the graph with the new data.
   * @param graphId - String graph id
   * @param newData
   */
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

  /**
   * Updates a specific graph based on its current configuration. It validates the graph data, builds the graph, updates it, and caches the result.
   * @param graphNumber - graph index
   */
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

  /**
   * Displays a popup message dialog with the specified title and message.
   * @param title
   * @param message
   */
  showPopup(title: string, message: string): void {
    this.dialog.open(PopupMessageComponent, {
      width: '250px',
      data: {title: title, message: message}
    });
  }

  /**
   *  Compares two station numbers for equality. Used in template comparison.
   * @param station1
   * @param station2
   */
  compareStations(station1: number, station2: number): boolean {
    return station1 === station2;
  }

  /**
   *  Handles changes in station selection. Limits the selection to a maximum of two stations.
   * @param event
   * @param graphNumber - graph index
   */
  onStationSelectionChange(event: MatSelectChange, graphNumber: number): void {
    if (event.value.length > 2) {
      this.graphsData[graphNumber].station = event.value.slice(0, 2);
    }
  }
}
