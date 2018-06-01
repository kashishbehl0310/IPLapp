import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NvD3Module } from  'ng2-nvd3';

import 'd3';
import 'nvd3';
import  { DataTableModule, SharedModule } from 'primeng/primeng';
import { SeasonComponent } from './season/season.component';
import { HomeService } from '../home/home.service';
import { SeasonChart } from './seasonchart.component';
import { SeasontableComponent } from './season/seasontable/seasontable.component';

@NgModule({
    declarations: [
        SeasonComponent,
        SeasonChart,
        SeasontableComponent
    ],
    imports:[
        CommonModule,
        NvD3Module,
        SharedModule,
        DataTableModule
    ],
    providers:[
        HomeService
    ]
})
export class SeasonModule{}