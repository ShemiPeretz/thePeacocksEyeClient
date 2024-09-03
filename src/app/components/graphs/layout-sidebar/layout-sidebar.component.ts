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

  /**
   * This method is called when a user selects a new layout. It performs two actions:
   *    1. Emits the newly selected layout to the parent component using the `myLayout` EventEmitter.
   *    2. Updates the `chosenLayout` property with the newly selected layout.
   * @param layout - The newly selected `DashboardLayout` option.
   */
  changeLayout(layout: DashboardLayout) {
    this.myLayout.emit(layout);
    this.chosenLayout=layout;
  }
}
