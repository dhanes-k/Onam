import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzGridModule } from 'ng-zorro-antd/grid';

let zorro = [
  NzNotificationModule,
  NzButtonModule,
  NzModalModule,
  NzCarouselModule,
  NzGridModule,
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...zorro
  ],
  exports:[
    ...zorro
  ]
})
export class ZorroModule { }
