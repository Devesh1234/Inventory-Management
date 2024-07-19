import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';
import { BaseChartDirective } from 'ng2-charts';
import { SharedService } from 'src/app/shared.service';
import { TrackerService } from '../tracker.service';
import { MatDialog } from '@angular/material/dialog';
// import DataLabelsPlugin from 'chartjs-plugin-datalabels';


@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']

})
export class TrackerComponent implements OnInit {

  // myModal = document.getElementById('exampleModalCenter');


  dailyStatsData: any;

  activeButton: any;
  requestedOrdersDataList: any;
  acceptedOrdersDataList: any;
  activeOrdersDataList: any;
  checkoutOrdersDataList: any;
  historyOrdersDataList: any;

  trackingSearchValue: string = "";


  trackingSelectedValue: string = "requested";



  options = [
    { label: 'Requested', value: 'requested' },
    { label: 'Active', value: 'active' },
    { label: 'Checkout', value: 'checkout' },
    { label: 'History', value: 'history' }
  ];


  constructor(private trackerService: TrackerService, private sharedService: SharedService) {



  }




  ngOnInit(): void {

    // this.sharedService.loadScripts();



    this.trackerService.getDailyStats().subscribe((res: any) => {
      this.dailyStatsData=res;
      console.log('this.dailyStatsData: ', this.dailyStatsData);
    }, (err: any) => {
      console.log(err);
    })



    this.trackerService.getActiveTrackerButton().subscribe((res: any) => {
      console.log('Áctive Btn', res);
      this.activeButton = res;

    })


    this.getRequestedOrdersData();


  }


  getRequestedOrdersData() {
    this.trackerService.getRequestedOrders().subscribe({
      next: (res: any) => {
        console.log('response--', res)
        if (res && res.response) {
          this.requestedOrdersDataList = res.response.filter((item: any) => {
            return (item.order_status == "requested")
          })

          this.acceptedOrdersDataList = res.response.filter((item: any) => {
            return (item.order_status == "accepted")
          })

          console.log('this.requestedOrdersDataList: ', this.requestedOrdersDataList);
          console.log('this.cceptedorderlist: ', this.acceptedOrdersDataList);

        }
      },
      error: (res: any) => {

      }
    });

  }

  getActiveOrdersData() {


    this.trackerService.getActiveOrders().subscribe({
      next: (res: any) => {
        this.activeOrdersDataList = res.response;
        console.log('this.activeOrdersDataList: ', this.activeOrdersDataList);
      },
      error: (err: any) => {

      }
    })
  }

  getCheckoutOrdersData() {

    this.trackerService.getCheckoutOrders().subscribe({
      next: (res: any) => {
        this.checkoutOrdersDataList = res.response;
        console.log('this.checkoutOrdersDataList: ', this.checkoutOrdersDataList);
      },
      error: (err: any) => {

      }
    })


  }

  getHistoryOrdersData() {


    this.trackerService.getHistoryOrders().subscribe({
      next: (res: any) => {
        this.historyOrdersDataList = res.response;
        console.log('this.historyOrdersDataList: ', this.historyOrdersDataList);
      },
      error: (err: any) => {

      }
    })

  }

  onBtnClick(btnType: string) {
    // if(btnType!=this.activeButton)
    this.trackerService.setActiveTrackerButton(btnType);
    if (btnType == 'requested') {
      this.getRequestedOrdersData();
    }
    else if (btnType == 'active') {
      this.getActiveOrdersData();
    }

    else if (btnType == 'checkout') {
      this.getCheckoutOrdersData();
    }
    else if (btnType == 'history') {
      this.getHistoryOrdersData();
    }


  }

  acceptOrNot(status: boolean, id: any) {

    let obj = { 'notification_id': id, 'accepted': status }
    this.trackerService.postvendorAcceptOrReject(obj).subscribe({
      next: (res: any) => {
        console.log('Status', res)
        this.getRequestedOrdersData();

      },
      error: (res: any) => {

      }
    })
  }




  paymentAccept(status: boolean, id: any) {
    let obj = { 'checkout_id': id, 'payment_received': status }
    this.trackerService.postPaymentApproval(obj).subscribe({
      next: (res: any) => {
        console.log('Status', res)

      },
      error: (res: any) => {

      }
    })
  }






  //Bar Chart Code Starts

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      // datalabels: {
      //   anchor: 'end',
      //   align: 'end',
      // },
    },
  };
  public barChartType: ChartType = 'bar';
  // public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    ],
  };

  // events
  public chartClicked2({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered2({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];

    this.chart?.update();
  }


  // Bar Chart Code Ends




  //pie chart code starts


  // @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      // datalabels: {
      //   formatter: (value: any, ctx: any) => {
      //     if (ctx.chart.data.labels) {
      //       return ctx.chart.data.labels[ctx.dataIndex];
      //     }
      //   },
      // },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'],
    datasets: [
      {
        data: [300, 500, 100],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  // public pieChartPlugins = [DatalabelsPlugin];

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    // console.log(event, active);
  }

  changeLabels(): void {
    const words = [
      'hen',
      'variable',
      'embryo',
      'instal',
      'pleasant',
      'physical',
      'bomber',
      'army',
      'add',
      'film',
      'conductor',
      'comfortable',
      'flourish',
      'establish',
      'circumstance',
      'chimney',
      'crack',
      'hall',
      'energy',
      'treat',
      'window',
      'shareholder',
      'division',
      'disk',
      'temptation',
      'chord',
      'left',
      'hospital',
      'beef',
      'patrol',
      'satisfied',
      'academy',
      'acceptance',
      'ivory',
      'aquarium',
      'building',
      'store',
      'replace',
      'language',
      'redeem',
      'honest',
      'intention',
      'silk',
      'opera',
      'sleep',
      'innocent',
      'ignore',
      'suite',
      'applaud',
      'funny',
    ];
    const randomWord = () => words[Math.trunc(Math.random() * words.length)];
    this.pieChartData.labels = new Array(3).map((_) => randomWord());

    this.chart?.update();
  }

  addSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.push(['Line 1', 'Line 2', 'Line 3']);
    }

    this.pieChartData.datasets[0].data.push(400);

    this.chart?.update();
  }

  removeSlice(): void {
    if (this.pieChartData.labels) {
      this.pieChartData.labels.pop();
    }

    this.pieChartData.datasets[0].data.pop();

    this.chart?.update();
  }

  changeLegendPosition(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.position =
        this.pieChartOptions.plugins.legend.position === 'left'
          ? 'top'
          : 'left';
    }

    this.chart?.render();
  }

  toggleLegend(): void {
    if (this.pieChartOptions?.plugins?.legend) {
      this.pieChartOptions.plugins.legend.display =
        !this.pieChartOptions.plugins.legend.display;
    }

    this.chart?.render();
  }

  // pie chart code ends





  //   inOutStockHeaderArray = ['Sno', 'Username(ID)', 'Username', 'Invoice No', 'No of people', 'Date', 'Time of Arrival', 'Order Status']


  //   inOutStockArray: any = [{ '': 'Drink', 'category': 'Alcohol', 'name': 'Beer', 'status': 'Out', 'quantity': '1' },
  // ]


  // inOutStockHeaderArray:any=['Sno','First Name','Last Name']
  inOutStockHeaderArray: any = ['Sno', 'Last Name', 'Full Name']

  // inOutStockArray:any=[{'sno':'1','first_name':"Devesh",'last_name':"Bhatia"}];
  inOutStockArray: any = [{ 'sno': '1', 'last_name': "Bhatia", 'full_name': "Devesh_Bhatia" }];










  deleteditem: number = 0;








  dataSource: any = []

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'names', 'symbols', 'weights'];




  // onInputChange(event: any) {
  //   console.log(event);
  // }


  onInputCross() {
    this.trackingSearchValue = "";
  }



  getDeletedItem(id: any) {
    this.deleteditem = id;
    console.log('deleted item', id);
  }
  deleteItem() {
    this.acceptOrNot(false, this.deleteditem)
  }





}


