import { UserInterface } from './../../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndPoint } from '@enums/endpoint.enum';
import { StorageKey } from '@enums/storage-key.enum';
import { StorageHelper } from '@helpers/storage.helper';
import { EmployeeInterface } from '@interfaces/employee.interface';
import { delay, filter, mergeMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public authenticate(user: UserInterface) {
    return this.http.get<EmployeeInterface>(EndPoint.EMPLOYEE).pipe(
      delay(1000),
      mergeMap((data) => {
        const employee = data['employee'];
        const employeeFilter = employee.filter(
          (empl) =>
            empl.username === user.username && empl.password === user.password
        );

        if (employeeFilter.length === 0)
          throw { message: 'Account not found!' };

        return employee;
      }),
      filter(
        (empl) =>
          empl.username === user.username && empl.password === user.password
      ),
      tap((empl) => {
        StorageHelper.setItem(StorageKey.TOKEN, true);
        StorageHelper.setItem(StorageKey.USER, empl);
      })
    );
  }
}
