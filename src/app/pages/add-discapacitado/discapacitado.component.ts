import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { DiscapacitadosService } from 'src/app/services/discapacitados.service';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-discapacitado',
  templateUrl: './discapacitado.component.html',
  styleUrls: ['./discapacitado.component.scss']
})
export class DiscapacitadoComponent implements OnInit {
  states: Observable<any>;
  form: FormGroup;
  loading = false;
  submitted = false;
  department: string = '';
  isInvalidYear: boolean = false;
  model: NgbDateStruct;
  model1: NgbDateStruct;
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
    private discapacitadosService: DiscapacitadosService,
  ) { }

  ngOnInit() {
    this.supportedYear = new Date().getFullYear() - 18;
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
      name: [''],
      lastName: [''],
      bornDate: ['', Validators.required],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(8),
        Validators.pattern(/^\d+$/)
      ])],
      discapacidad: ['', Validators.required],
      department: ['', Validators.required],
      municipality: ['', Validators.required],
      village: ['', Validators.required],
      barrio: ['', Validators.required],
      identidadPersonInCharge: [''],
      fullNamePersonInCharge: [''],
      phonePersonInCharge: [''],
      bornDatePersonInCharge: [''],
    });
  }

  editForm(id: number): void {
    this.loading = true;

    this.discapacitadosService.getById(id).pipe(first()).subscribe({
      next: (res) => {
        this.form.patchValue({
          identidad: res.identidad,
          name: res.name,
          lastName: res.lastName,
          bornDate: new Date(res.bornDate),
          phone: res.phone,
          discapacidad: res.discapacidad,
          department: res.department,
          municipality: res.municipality,
          village: res.village,
          barrio: res.barrio,
          identidadPersonInCharge: res.identidadPersonInCharge,
          fullNamePersonInCharge: res.fullNamePersonInCharge,
          phonePersonInCharge: res.phonePersonInCharge,
          bornDatePersonInCharge: res.bornDatePersonInCharge,
        });
        const [year, month, day] = res.bornDate.split('-');
        const obj = { year: parseInt(year), month: parseInt(month), day: parseInt(day.split(' ')[0].trim()) };
        this.model = obj;

        if (res.bornDatePersonInCharge) {
          const [year1, month1, day1] = res.bornDatePersonInCharge.split('-');
          const obj1 = { year: parseInt(year1), month: parseInt(month1), day: parseInt(day1.split(' ')[0].trim()) };
          this.model1 = obj1;
        }

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

    let bornDatePersonInCharge = ''
    if(this.model1) {
      bornDatePersonInCharge = `${this.model1.year}-${this.model1.month}-${this.model1.day}`;
    }

    if (year - this.model1?.year < 18) {
      this.isInvalidYear = true;
      return;
    }

    this.loading = true;
    this.form.value.bornDate = bornDate;
    this.form.value.bornDatePersonInCharge = bornDatePersonInCharge;

    if(!this.isEditMode) {
      this.discapacitadosService.post(this.form.value)
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
      this.discapacitadosService.put(+this.route.snapshot.paramMap?.get('id'), this.form.value)
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
