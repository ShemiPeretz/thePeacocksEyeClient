import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { MlModelsComponent } from './components/ml-models/ml-models.component';
import {AlertsComponent} from "./components/alerts/alerts.component";
import {ClimateComponent} from "./components/climate/climate.component";

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
    path: 'climate',
    component: ClimateComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
