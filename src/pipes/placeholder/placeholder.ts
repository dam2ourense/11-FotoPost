import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PlaceholderPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'placeholder',
})
export class PlaceholderPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, defecto: string = "sin texto") {
    // if (value)
    //   return value
    // else
    //   return defecto;
    return (value)?value:defecto;
  }
}
