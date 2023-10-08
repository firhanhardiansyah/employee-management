import { EmployeeService } from '@services/employee/employee.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeInterface } from '@interfaces/employee.interface';
import { lastValueFrom } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { StorageHelper } from '@helpers/storage.helper';
import { StorageKey } from '@enums/storage-key.enum';

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

  public tmpSearchValue: string = null;

  private filterObject = {
    search: '',
  };

  private employees: EmployeeInterface[] = [];

  constructor(
    private employeeService: EmployeeService,
    private liveAnnouncer: LiveAnnouncer,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async ngAfterViewInit() {
    await this.getEmployees();

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSourceFilter();

    const tmpData =
      StorageHelper.getItem(StorageKey.TMP_EMPLOYEE_DATA) || undefined;

    if (tmpData) {
      this.tmpSearchValue = tmpData['search'];
      this.dataSource.filter = JSON.stringify(tmpData);
    }
  }

  dataSourceFilter() {
    this.dataSource.filterPredicate = (data, filter: string) => {
      const filterData = JSON.parse(filter);

      return (
        !filterData.search ||
        data.firstName
          .toString()
          .trim()
          .toLowerCase()
          .includes(filterData.search) ||
        data.group
          .toString()
          .trim()
          .toLowerCase()
          .includes(filterData.search) ||
        data.description
          .toString()
          .trim()
          .toLowerCase()
          .includes(filterData.search) ||
        data.status.toString().trim().toLowerCase().includes(filterData.search)
      );
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterObject.search = filterValue.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterObject);

    this.tmpSearchValue = this.filterObject.search;
    StorageHelper.setItem(StorageKey.TMP_EMPLOYEE_DATA, this.filterObject);
  }

  public onSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  public onAddForm(): void {
    this.router.navigate(['home', 'add-employee']);
  }

  public onDetail(data: EmployeeInterface): void {
    this.tmpSearchValue = this.filterObject.search;
    StorageHelper.setItem(StorageKey.TMP_EMPLOYEE_DATA, this.filterObject);

    this.router.navigate(['home', 'detail-employee', data.username], {
      state: data,
    });
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
      id: index.toString(),
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
