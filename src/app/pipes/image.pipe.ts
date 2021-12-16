import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  baseUrl: string = environment.basedApiServer + '/contact/file/';
  transform(value: string): string {
    if (value == null) {
      return;
    }
    if (value.startsWith('data:image')) {
      return value;
    }
    return value ? this.baseUrl + value : this.baseUrl + 'assets/no-image.jpg';
  }

}
