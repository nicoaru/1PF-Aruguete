import { Pipe, PipeTransform } from '@angular/core';

interface IFullNamePipeValue {
  nombre:string|null,
  apellido:string|null
}

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value?: IFullNamePipeValue|null): string {
    return `${value?.nombre} ${value?.apellido}`;
  }

}
