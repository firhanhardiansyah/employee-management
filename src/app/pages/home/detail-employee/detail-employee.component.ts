import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeInterface } from '@interfaces/employee.interface';
import { map } from 'rxjs';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.scss'],
})
export class DetailEmployeeComponent implements OnInit {
  public employee: EmployeeInterface;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getDataFromState();
  }

  async getDataFromState(): Promise<void> {
    const state = this.route.paramMap.pipe(map(() => window.history.state));
    await state.subscribe((item) => {
      this.employee = item;
    });

    console.log('this.dataFromState => ', this.employee);
  }

  onBackToHome(): void {
    this.router.navigate(['home']);
  }
}
