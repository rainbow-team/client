import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollLoadDirective } from './directives/scroll-load.directive';
import { TextOmitPipe } from './pipes/text-omit.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ScrollLoadDirective,
    TextOmitPipe,
    DateFormatPipe
  ]
})
export class ShareModule { }
