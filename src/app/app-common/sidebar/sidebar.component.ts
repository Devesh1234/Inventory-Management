import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public router: Router, private sharedService: SharedService) { }
  activeTile: string = '';
  activeSubTile: string = '';

  ngOnInit(): void {
    this.sharedService.getActiveTile().subscribe((res: any) => {
      this.activeTile = res;
    })
    this.sharedService.getActiveSubTile().subscribe((res: any) => {
      this.activeSubTile = res;
    })
  }



  selectTile(val: any) {
    console.log('val-----', val)

    switch (val) {
      case 'Dashboard':
        this.router.navigate(['/dashboard/Dashboard']);
        this.sharedService.setActiveTile('Dashboard');

        break;
      case 'Tracker':
        this.router.navigate(['/tracker/Tracker']);
        this.sharedService.setActiveTile('Tracker');

        break;
      case 'Overview':
        this.router.navigate(['/inventory/Overview']);
        this.sharedService.setActiveTile('Inventory');
        this.sharedService.setActiveSubTile('Overview');
        break;

      case 'Input':
        this.router.navigate(['/inventory/Input']);
        this.sharedService.setActiveTile('Inventory');
        this.sharedService.setActiveSubTile('Input');
        break;


      case 'Offer':
        this.router.navigate(['/inventory/Offer']);
        this.sharedService.setActiveTile('Inventory');
        this.sharedService.setActiveSubTile('Offer');
        break;




    }


  }

}
