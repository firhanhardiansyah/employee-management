import { EmployeeService } from '@services/employee/employee.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeInterface } from '@interfaces/employee.interface';
import { lastValueFrom } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss'],
})
export class ListEmployeeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public readonly displayedColumns: string[] = [
    'id',
    'firstName',
    'group',
    'description',
    'status',
    'options',
  ];

  public dataSource = new MatTableDataSource<EmployeeInterface>();

  private employees: EmployeeInterface[] = [];

  constructor(
    private employeeService: EmployeeService,
    private liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event) {
    const value = event.target.value;
    const filterValue = value.trim().toLowerCase();

    this.dataSource.filter = filterValue;
  }

  public onSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  public onDetail(row): void {
    console.log('onDetail employee ==> ', row);
  }

  public onUpdate(event, employee: EmployeeInterface): void {
    console.log('onUpdate employee ==> ', employee);
    event.stopPropagation();
  }

  public onDelete(event, employee: EmployeeInterface): void {
    console.log('onDelete employee ==> ', employee);
    event.stopPropagation();
  }

  private async getEmployees(): Promise<void> {
    this.employees = await lastValueFrom(this.employeeService.getEmployees());

    const newEmployees: EmployeeInterface[] = [];

    for (let i = 1; i <= 100; i++) {
      newEmployees.push(this.createDummyUser(i));
    }

    this.dataSource.data = newEmployees;
  }

  private createDummyUser(index: number): EmployeeInterface {
    const randEmployee =
      this.employees[Math.round(Math.random() * (this.employees.length - 1))];

    const randFirstName =
      this.employees[Math.round(Math.random() * (this.employees.length - 1))]
        .lastName +
      ' ' +
      this.employees[Math.round(Math.random() * (this.employees.length - 1))]
        .firstName;

    return {
      id: index,
      username: randEmployee.username,
      password: randEmployee.password,
      firstName: randFirstName,
      lastName: randEmployee.lastName,
      email: randEmployee.email,
      birthDate: randEmployee.birthDate,
      basicSalary: randEmployee.basicSalary,
      group: randEmployee.group,
      description: randEmployee.description,
      status: randEmployee.status,
    };
  }
}
