import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { DetailEmployeeComponent } from './detail-employee/detail-employee.component';
import { FormEmployeeComponent } from './form-employee/form-employee.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HomeComponent,
    ListEmployeeComponent,
    DetailEmployeeComponent,
    FormEmployeeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,

    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSortModule,
    MatButtonModule,
  ],
})
export class HomeModule {}
