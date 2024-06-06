import {Component, OnInit} from '@angular/core';
import {DashboardLayout} from "../../enums/dashboard-layout";
import {DataService} from "../../data.service";


@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.scss'
})
export class GraphsComponent implements OnInit{
  chosenLayout!: DashboardLayout;
  dashboardLayoutsEnum=DashboardLayout;
  graphStations!:[];

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
}
