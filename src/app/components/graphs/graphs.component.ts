import {Component, OnInit} from '@angular/core';
import {DashboardLayout} from "../../enums/dashboard-layout";

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrl: './graphs.component.scss'
})
export class GraphsComponent implements OnInit{
  chosenLayout!: DashboardLayout;
  dashboardLayoutsEnum=DashboardLayout;

  constructor() {
  }

  ngOnInit(){
    this.chosenLayout = DashboardLayout.four;
  }

  changeLayout(event:any){
    this.chosenLayout =event;
  }
}
