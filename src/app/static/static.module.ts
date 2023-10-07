import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticRoutingModule } from './static-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, StaticRoutingModule],
})
export class StaticModule {}
