import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { MlModelsComponent } from './components/ml-models/ml-models.component';
import {TwoGarphsLayoutComponent} from "./components/graphs/layouts/two-garphs-layout/two-garphs-layout.component";
import {ThreeGarphsLayoutComponent} from "./components/graphs/layouts/three-garphs-layout/three-garphs-layout.component";
import {FourGarphsLayoutComponent} from "./components/graphs/layouts/four-garphs-layout/four-garphs-layout.component";
import {FiveGarphsLayoutComponent} from "./components/graphs/layouts/five-garphs-layout/five-garphs-layout.component";

const routes: Routes = [
  {
  path: '',
  component: WeatherForecastComponent
  },
  {
    path: 'graphs',
    component: GraphsComponent
  },
  {
    path: 'models',
    component: MlModelsComponent
  },
  {
    path: 'two-graphs',
    component: TwoGarphsLayoutComponent
  },
  {
    path: 'three-graphs',
    component: ThreeGarphsLayoutComponent
  },
  {
    path: 'four-graphs',
    component: FourGarphsLayoutComponent
  },
  {
    path: 'five-graphs',
    component: FiveGarphsLayoutComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
