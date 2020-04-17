import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SnackBarIconComponent } from './snack-bar-icon.component';
import { IconModule } from '@visurel/iconify-angular';
@NgModule({
  declarations: [SnackBarIconComponent],
  entryComponents:[SnackBarIconComponent],
  imports: [
    CommonModule,
    MatIconModule,
    IconModule
  ]
})
export class SnackBarIconModule {
}
