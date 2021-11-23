import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUser',
})
export class FilterUserPipe implements PipeTransform {
  transform(value: any[], textfilter: string): any[] {
    if (textfilter) {
      value = value.filter((data) => {
        if (!data.userId.toLowerCase().search(textfilter.toLowerCase())) {
          return true;
        } else {
          return false;
        }
      });
    }
    return value;
  }
}
