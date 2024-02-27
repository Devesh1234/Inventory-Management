import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';
import { BaseChartDirective } from 'ng2-charts';
import { SharedService } from 'src/app/shared.service';
// import DataLabelsPlugin from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.sharedService.loadScripts();



  }

}
