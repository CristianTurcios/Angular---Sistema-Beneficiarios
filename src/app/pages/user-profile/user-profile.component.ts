import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { BeneficiariosService } from 'src/app/services/beneficiarios.service';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  states: Observable<any>;
  form: FormGroup;
  loading = false;
  submitted = false;
  department: string = '';
  isInvalidYear: boolean = false;
  model: NgbDateStruct;
  supportedYear: number;
  success: boolean = false;
  error: boolean = false;
  errorMessage: string = '';
  routerSubscription: Observable<any>;
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private countriesService: CountriesService,
    private beneficiariosService: BeneficiariosService,
  ) { }

  ngOnInit() {
    this.supportedYear = new Date().getFullYear() - 70;
    const userId = this.route.snapshot.paramMap?.get('id');

    if (userId) {
      this.isEditMode = true;
      this.editForm(+userId);
    }
    
    this.initializeForm();
    this.getStates();
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      identidad: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(13),
        Validators.pattern(/^\d+$/)
      ])],
      bornDate: ['', Validators.required],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(8),
        Validators.pattern(/^\d+$/)
      ])],
      department: ['', Validators.required],
      municipality: ['', Validators.required],
      village: ['', Validators.required],
      barrio: ['', Validators.required],
    });
  }

  editForm(id: number): void {
    this.loading = true;

    this.beneficiariosService.getById(id).pipe(first()).subscribe({
      next: (res) => {
        this.form.patchValue({
          identidad: res.identidad,
          bornDate: new Date(res.bornDate),
          phone: res.phone,
          department: res.department,
          municipality: res.municipality,
          village: res.village,
          barrio: res.barrio,
        });
        const [year, month, day] = res.bornDate.split('-');
        const obj = { year: parseInt(year), month: parseInt(month), day: parseInt(day.split(' ')[0].trim()) };
        this.model = obj;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  getStates(): void {
    this.countriesService.getStates().pipe(first()).subscribe({
      next: (res) => {
        this.states = res.data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    this.isInvalidYear = false;

    const year = new Date().getFullYear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    const bornDate = `${this.model.year}-${this.model.month}-${this.model.day}`;

    if (year - this.model.year < 70) {
      this.isInvalidYear = true;
      return;
    }

    this.loading = true;
    this.form.value.bornDate = bornDate;


    if(!this.isEditMode) {
      this.beneficiariosService.post(this.form.value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.loading = false;
            this.submitted = false;
            this.form.reset();
            this.success = true;
            setTimeout(() => {
              this.success = false;
            }, 3000)
          },
          error: (err) => {
            console.error(err.error.message);
            this.loading = false;
            this.submitted = false;
            this.error = true;
            this.errorMessage = err.error.message;
  
            setTimeout(() => {
              this.error = false;
              this.errorMessage = '';
            }, 7000)
          }
        });
    } else {
      this.beneficiariosService.put(+this.route.snapshot.paramMap?.get('id'), this.form.value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.loading = false;
            this.submitted = false;
            this.success = true;
            setTimeout(() => {
              this.success = false;
            }, 3000)
          },
          error: (err) => {
            this.loading = false;
            this.submitted = false;
            this.error = true;
            this.errorMessage = err.error.message;
  
            setTimeout(() => {
              this.error = false;
              this.errorMessage = '';
            }, 7000)
          }
        });
    }
  }
}
