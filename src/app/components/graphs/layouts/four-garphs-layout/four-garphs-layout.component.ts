import {Component, OnInit} from '@angular/core';
import {GraphsComponent} from "../../graphs.component";
import {GraphMeta} from "../../../../data/graph-meta";
import {TimeInterval} from "../../../../data/time-interval";

@Component({
  selector: 'app-four-garphs-layout',
  templateUrl: './four-garphs-layout.component.html',
  styleUrl: './four-garphs-layout.component.scss'
})
export class FourGarphsLayoutComponent implements OnInit{
  isEditingGraph1: boolean = false;
  isEditingGraph2: boolean = false;
  isEditingGraph3: boolean = false;
  isEditingGraph4: boolean = false;

  selectedStation1!: string;
  selectedGraphType1!: string;
  selectedMonitorX1!: string;
  selectedMonitorY1!: string;
  startDate1!: Date;
  endDate1!: Date;
  selectedStation2!: string;
  selectedGraphType2!: string;
  selectedMonitorX2!: string;
  selectedMonitorY2!: string;
  startDate2!: Date;
  endDate2!: Date;
  selectedStation3!: string;
  selectedGraphType3!: string;
  selectedMonitorX3!: string;
  selectedMonitorY3!: string;
  startDate3!: Date;
  endDate3!: Date;
  selectedStation4!: string;
  selectedGraphType4!: string;
  selectedMonitorX4!: string;
  selectedMonitorY4!: string;
  startDate4!: Date;
  endDate4!: Date;

  stations = [
    { value: 'station1', viewValue: 'Station 1' },
    { value: 'station2', viewValue: 'Station 2' },
    { value: 'station3', viewValue: 'Station 3' }
  ];

  graphTypes = [
    { value: 'line', viewValue: 'Line Graph' },
    { value: 'bar', viewValue: 'Bar Graph' },
    { value: 'pie', viewValue: 'Pie Chart' }
  ];

  monitors = [
    { value: 'monitor1', viewValue: 'Monitor 1' },
    { value: 'monitor2', viewValue: 'Monitor 2' },
    { value: 'monitor3', viewValue: 'Monitor 3' }
  ];


  constructor(private graphs: GraphsComponent) {
  }

  ngOnInit() {
    this.selectedStation1 = this.stations[0].value;
    this.selectedGraphType1 = this.graphTypes[0].value;
    this.selectedMonitorX1 = this.monitors[0].value;
    this.selectedMonitorY1 = this.monitors[1].value;

    this.selectedStation2 = this.stations[0].value;
    this.selectedGraphType2 = this.graphTypes[0].value;
    this.selectedMonitorX2 = this.monitors[0].value;
    this.selectedMonitorY2 = this.monitors[1].value;

    this.selectedStation3 = this.stations[0].value;
    this.selectedGraphType3 = this.graphTypes[0].value;
    this.selectedMonitorX3 = this.monitors[0].value;
    this.selectedMonitorY3 = this.monitors[1].value;

    this.selectedStation4 = this.stations[0].value;
    this.selectedGraphType4 = this.graphTypes[0].value;
    this.selectedMonitorX4 = this.monitors[0].value;
    this.selectedMonitorY4 = this.monitors[1].value;

    const today: Date = new Date();
    const oneYearAgo: Date = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    this.startDate1 = oneYearAgo;
    this.endDate1 = today;
    this.startDate2 = oneYearAgo;
    this.endDate2 = today;
    this.startDate3 = oneYearAgo;
    this.endDate3 = today;
    this.startDate4 = oneYearAgo;
    this.endDate4 = today;
  }

  editGraph(graphNumber: number, isShowBtn: boolean): void{
    if (graphNumber === 1) {
      if(isShowBtn){
        this.buildGraph(1)
      }
      this.isEditingGraph1 = !this.isEditingGraph1;
    } else if (graphNumber === 2) {
      if(isShowBtn){
        this.buildGraph(2)
      }
      this.isEditingGraph2 = !this.isEditingGraph2;
    } else if (graphNumber === 3) {
      if(isShowBtn){
        this.buildGraph(3)
      }
      this.isEditingGraph3 = !this.isEditingGraph3;
    } else if (graphNumber === 4) {
      if(isShowBtn){
        this.buildGraph(4)
      }
      this.isEditingGraph4 = !this.isEditingGraph4;
    }
  }

  buildGraph(graphNumber: number){
    // if (graphNumber === 1) {
    // } else if (graphNumber === 2) {
    // } else if (graphNumber === 3) {
    // } else if (graphNumber === 4) {
    // }
  }
}
