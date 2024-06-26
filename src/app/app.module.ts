import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar/navbar.component';
import { WeatherForecastComponent } from './components/weather-forecast/weather-forecast.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MlModelsComponent } from './components/ml-models/ml-models.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { LayoutSidebarComponent } from './components/graphs/layout-sidebar/layout-sidebar.component';
import { FourGarphsLayoutComponent } from './components/graphs/layouts/four-garphs-layout/four-garphs-layout.component';
import { ThreeGarphsLayoutComponent } from './components/graphs/layouts/three-garphs-layout/three-garphs-layout.component';
import { TranslatePipePipe } from './translate-pipe.pipe';
import { AlertsComponent } from './components/alerts/alerts.component';
import {NgOptimizedImage} from "@angular/common";
import { AirQualityComponent } from './components/air-quality/air-quality.component';
import { ClimateComponent } from './components/climate/climate.component';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatMenu} from "@angular/material/menu";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WeatherForecastComponent,
    MlModelsComponent,
    GraphsComponent,
    LayoutSidebarComponent,
    FourGarphsLayoutComponent,
    ThreeGarphsLayoutComponent,
    TranslatePipePipe,
    AlertsComponent,
    AirQualityComponent,
    ClimateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    NgOptimizedImage,
    MatTabGroup,
    MatTab,
    MatMenu,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
