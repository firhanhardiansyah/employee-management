import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { EmployeeGroupInterface } from '@interfaces/employee-group.interface';
import { Router } from '@angular/router';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class FormEmployeeComponent implements OnInit {
  @Output() formGroupEmit = new EventEmitter();
  @Output() onSubmitted = new EventEmitter();

  @Input() isLoading = new Input();

  public formGroup: FormGroup<{
    username: FormControl<string>;
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    email: FormControl<string>;
    birthDate: FormControl<string>;
    basicSalary: FormControl<number>;
    status: FormControl<string>;
    group: FormControl<string>;
    description: FormControl<string>;
  }>;

  protected employeeGroups: EmployeeGroupInterface[] = [
    { id: '1', name: 'IT' },
    { id: '2', name: 'Engineering' },
    { id: '3', name: 'Technology' },
    { id: '4', name: 'HR' },
    { id: '5', name: 'Finance' },
    { id: '6', name: 'Marketing' },
    { id: '7', name: 'Sales' },
    { id: '8', name: 'Service' },
    { id: '9', name: 'Designer' },
    { id: '10', name: 'General Division' },
  ];

  public employeeGroupsFilterCtrl: FormControl = new FormControl();
  public filteredEmployeeGroups: ReplaySubject<EmployeeGroupInterface[]> =
    new ReplaySubject(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

  protected _onDestroy = new Subject();

  get today() {
    return new Date();
  }

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.initFormGroup();

    this.filteredEmployeeGroups.next(this.employeeGroups.slice());

    this.employeeGroupsFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterEmployeeGroups();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next;
    this._onDestroy.complete();
  }

  public onDateEvent(event, val): void {}

  public onSubmit(): void {
    if (this.formGroup.valid) {
      this.onSubmitted.emit(true);
    } else {
      this.onSubmitted.emit(false);
    }
  }

  public onCancel(): void {
    this.router.navigate(['/home']);
  }

  protected setInitialValue() {
    this.filteredEmployeeGroups
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (
          a: EmployeeGroupInterface,
          b: EmployeeGroupInterface
        ) => a && b && a.id === b.id;
      });
  }

  protected filterEmployeeGroups() {
    if (!this.employeeGroups) {
      return;
    }

    let search = this.employeeGroupsFilterCtrl.value;

    if (!search) {
      this.filteredEmployeeGroups.next(this.employeeGroups.slice());

      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredEmployeeGroups.next(
      this.employeeGroups.filter(
        (bank) => bank.name.toLowerCase().indexOf(search) > -1
      )
    );
  }

  private initFormGroup(): void {
    this.formGroup = new FormGroup({
      username: new FormControl<string>(
        {
          value: '',
          disabled: false,
        },
        { validators: [Validators.required], nonNullable: true }
      ),
      firstName: new FormControl<string>(
        {
          value: '',
          disabled: false,
        },
        { validators: [Validators.required], nonNullable: true }
      ),
      lastName: new FormControl<string>(
        {
          value: '',
          disabled: false,
        },
        { validators: [Validators.required], nonNullable: true }
      ),
      email: new FormControl<string>(
        {
          value: '',
          disabled: false,
        },
        {
          validators: [Validators.required, Validators.email],
          nonNullable: true,
        }
      ),
      birthDate: new FormControl<string>(
        {
          value: '',
          disabled: false,
        },
        { validators: [Validators.required], nonNullable: true }
      ),
      basicSalary: new FormControl<number>(
        {
          value: undefined,
          disabled: false,
        },
        { validators: [Validators.required], nonNullable: true }
      ),
      status: new FormControl<string>(
        {
          value: '',
          disabled: false,
        },
        { validators: [Validators.required], nonNullable: true }
      ),

      group: new FormControl<string>(
        {
          value: '',
          disabled: false,
        },
        { validators: [Validators.required], nonNullable: true }
      ),

      description: new FormControl<string>(
        {
          value: '',
          disabled: false,
        },
        { validators: [Validators.required], nonNullable: true }
      ),
    });

    this.formGroupEmit.emit(this.formGroup.value);

    this.onChangesForm();
  }

  private onChangesForm(): void {
    this.formGroup.valueChanges.subscribe((_) => {
      this.formGroupEmit.emit(this.formGroup.value);
    });
  }
}
