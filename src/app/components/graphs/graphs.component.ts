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

  private cache: { [key: string]: string } = {};

  constructor(private dataService: DataService) {
  }

  /**
   * Initializes the component by setting the default layout to four.
   */
  ngOnInit(){
    this.chosenLayout = DashboardLayout.four;
  }

  /**
   * Updates the chosen layout based on the event received.
   * @param event - The new layout value
   */
  changeLayout(event:any){
    this.chosenLayout =event;
  }

  /**
   * Generates an array of default GraphMeta objects.
   * @param numberOfGraphs - The number of default graph metadata objects to generate
   * @returns An array of GraphMeta objects
   */
  getDefaultGraphMeta(numberOfGraphs: number): GraphMeta[]{
    let graphsData: GraphMeta[] = [];

    for (let i = 0; i < numberOfGraphs; i++) {
      let graphData: GraphMeta = {
        graphType: "line",
        graphSizeX: 600,
        graphSizeY: 400,
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

  /**
   * Fetches default graphs from the data service.
   * @returns A Promise that resolves with the default graphs as a string
   */
  getDefaultGraphs(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.dataService.getDefaultGraphs().subscribe(
        graph => resolve(graph),
        error => reject(error)
      );
    });
  }

  /**
   *  Sends a request to build a graph based on the provided metadata.
   *  @param graphData - The GraphMeta object containing graph configuration
   *  @returns A Promise that resolves with the built graph as a string
   */
  buildGraph(graphData: GraphMeta): Promise<string> {
    return new Promise((resolve, reject) => {
      this.dataService.postGraph(graphData).subscribe(
        graph => resolve(graph),
        error => {window.alert(error); reject(error)}
      );
    });
  }

  /**
   * Caches a graph in memory and localStorage.
   * @param layout - The layout identifier
   * @param graphId - The graph identifier
   * @param graphData - The graph data to cache
   */
  setGraph(layout: string, graphId: string, graphData: string): void {
    const cacheKey = this.getCacheKey(layout, graphId);
    this.cache[cacheKey] = graphData;
    // Save to localStorage for persistence across page reloads
    localStorage.setItem(cacheKey, graphData);
  }

  /**
   * Retrieves a cached graph from memory or localStorage.
   * @param layout - The layout identifier
   * @param graphId - The graph identifier
   * @returns The cached graph data as a string, or null if not found
   */
  getGraph(layout: string, graphId: string): string | null {
    const cacheKey = this.getCacheKey(layout, graphId);
    // Check in-memory cache first
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey];
    }
    // If not in memory, check localStorage
    const storedGraph = localStorage.getItem(cacheKey);
    if (storedGraph) {
      this.cache[cacheKey] = storedGraph; // Load into memory cache
      return storedGraph;
    }
    return null;
  }

  /**
   * Clears the graph cache, either for a specific layout or all layouts.
   * @param layout - Optional. The layout to clear cache for. If not provided, clears all cache.
   */
  clearCache(layout?: string): void {
    if (layout) {
      // Clear cache for specific layout
      const prefix = `graph_${layout}_`;
      this.cache = Object.keys(this.cache).reduce((acc, key) => {
        if (!key.startsWith(prefix)) {
          acc[key] = this.cache[key];
        }
        return acc;
      }, {} as {[key: string]: string});

      // Clear localStorage items for specific layout
      Object.keys(localStorage)
        .filter(key => key.startsWith(prefix))
        .forEach(key => localStorage.removeItem(key));
    } else {
      // Clear all cache
      this.cache = {};
      // Clear all localStorage items starting with 'graph_'
      Object.keys(localStorage)
        .filter(key => key.startsWith('graph_'))
        .forEach(key => localStorage.removeItem(key));
    }
  }

  /**
   * Generates a cache key for a specific graph.
   * @param layout - The layout identifier
   * @param graphId - The graph identifier
   * @returns A string representing the cache key
   */
  private getCacheKey(layout: string, graphId: string): string {
    return `graph_${layout}_${graphId}`;
  }

}
