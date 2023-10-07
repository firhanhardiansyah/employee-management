import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndPoint } from '@enums/endpoint.enum';
import { EmployeeInterface } from '@interfaces/employee.interface';
import { delay, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  public getEmployees() {
    return this.http.get<EmployeeInterface[]>(EndPoint.EMPLOYEE).pipe(
      delay(1000),
      map((empl) => empl['employee'])
    );
  }
}
