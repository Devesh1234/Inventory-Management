import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrl: './dashboard-cards.component.scss'
})
export class DashboardCardsComponent implements OnInit {

  @Input() cards_data: any;
  

  constructor() {

  }
  ngOnInit(): void {
    console.log('cards-data', this.cards_data);
  }
}
