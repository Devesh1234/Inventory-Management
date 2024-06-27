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

      case 'Social':
        this.router.navigate(['/social/Social']);
        this.sharedService.setActiveTile('Social');

        break;

      case 'Tracker':
        this.router.navigate(['/tracker/Tracker']);
        this.sharedService.setActiveTile('Tracker');

        break;

      case 'itemsOverview':
        this.router.navigate(['/inventory/Overview']);
        this.sharedService.setActiveTile('items');
        this.sharedService.setActiveSubTile('itemsOverview');
        break;


      case 'addInput':
        this.router.navigate(['/inventory/Input']);
        this.sharedService.setActiveTile('items');
        this.sharedService.setActiveSubTile('addInput');
        break;
      case 'category':
        this.router.navigate(['/inventory/category']);
        this.sharedService.setActiveTile('Inventory');
        this.sharedService.setActiveSubTile('category');
        break;

      case 'subCategory':
        this.router.navigate(['/inventory/subcategory']);
        this.sharedService.setActiveTile('Inventory');
        this.sharedService.setActiveSubTile('subCategory');
        break;

      case 'subSubCategory':
        this.router.navigate(['/inventory/subsubcategory']);
        this.sharedService.setActiveTile('Inventory');
        this.sharedService.setActiveSubTile('subSubCategory');
        break;



    }


  }



  openSubSubMenu() {

    let elem = document.getElementsByClassName("subsubmenuheading");

    if (elem[0].className.includes('active')) {
      // elem[0].classList.remove('active')
    }
    else {
      // elem[0].classList.add('active')
    }
    // console.log('elem: ',);

    let elem2 = document.getElementsByClassName("subsubmenu");
    console.log('elem2: ', elem2);
    // elem2[0].childNodes[0]('subdrop')
    // let x = elem2[0].childNodes[0].classList.remove();


  }

}




