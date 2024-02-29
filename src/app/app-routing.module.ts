import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { MlModelsComponent } from './components/ml-models/ml-models.component';
import {AlertsComponent} from "./components/alerts/alerts.component";

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
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
