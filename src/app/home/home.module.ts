import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NvD3Module } from 'ng2-nvd3';

import 'd3';
import 'nvd3';

import { HomeComponent } from "./home.component";
import { TodaysmatchComponent } from "./todaysmatch/todaysmatch.component";
import { HomeService } from "./home.service";
import { RunRateComponent } from "./charts/runrate.component";
import { SeasonChart } from "./charts/seasonchart.component";

@NgModule({
    declarations: [
        HomeComponent,
        TodaysmatchComponent,
        RunRateComponent,
        SeasonChart
    ],
    imports: [
        CommonModule,
        NvD3Module
    ],
    providers: [HomeService]
})
export class HomeModule{}