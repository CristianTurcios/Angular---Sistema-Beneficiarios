import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private countriesService: CountriesService,
    private beneficiariosService: BeneficiariosService,
  ) { }

  ngOnInit() {
    this.supportedYear = new Date().getFullYear() - 70;
    

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
    this.getStates();
  }

  getStates(): void {
    this.countriesService.getStates().subscribe((res) => {
      this.states = res.data;
    }, (err) => {
      console.error(err);
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
    
    if(year - this.model.year < 70) {
      this.isInvalidYear = true;
      return;
    }

    this.loading = true;
    this.form.value.bornDate = bornDate;


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
  }
}
