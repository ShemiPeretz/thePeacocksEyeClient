import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DashboardLayout} from "../../../enums/dashboard-layout";

@Component({
  selector: 'app-layout-sidebar',
  templateUrl: './layout-sidebar.component.html',
  styleUrl: './layout-sidebar.component.scss'
})
export class LayoutSidebarComponent {
  layoutEnum = DashboardLayout;
  @Input() chosenLayout!:DashboardLayout;
  @Output() myLayout = new EventEmitter<DashboardLayout>();
  testMode: boolean = true;

  constructor() {
  }
  changeLayout(layout: DashboardLayout) {
    this.myLayout.emit(layout);
    this.chosenLayout=layout;
  }
}
