import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'listFilter' })
export class ListFilterPipe implements PipeTransform {

  transform(list: any[], filterText: string, param = 'identidad'): any {
    return list ? list.filter(item => item[param].search(new RegExp(filterText, 'i')) > -1) : [];
  }
}