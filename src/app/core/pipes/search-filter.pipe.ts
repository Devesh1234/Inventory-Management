import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], searchText: string):any[] {
      if(!items)
      {
        return [];
      }
      if(!searchText)
      {
        return items;
      }
      return items.filter((elem:any)=>{
        if(JSON.stringify(elem).toLowerCase().includes(searchText.toLowerCase()))
        return true;
        else
        return false;
      })

  }
}
