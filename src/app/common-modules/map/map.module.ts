import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainMapComponent } from './components/main-map/main-map.component';
import { LayerTreeComponent } from './components/layer-tree/layer-tree.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MainMapComponent,
    LayerTreeComponent
  ],
  exports: [
    MainMapComponent,
    LayerTreeComponent
  ]
})
export class MapModule { }
