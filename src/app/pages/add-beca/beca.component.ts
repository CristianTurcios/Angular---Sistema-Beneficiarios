import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { BecasService } from 'src/app/services/becas.service';
import { CountriesService } from 'src/app/services/countries.service';

interface vulnerableGroupInterface {
  name: string;
  checked: boolean;
}

const VULNERABLE_GROUP_LIST = [
  { name: 'Pobreza', checked: false },
  { name: 'Victima de Violencia', checked: false },
  { name: 'Migrante Retornado', checked: false },
  { name: 'Desplazados', checked: false },
  { name: 'Afectados por desastres', checked: false },
  { name: 'Afectados por riesgos de la naturaleza y/o pandemias', checked: false },
  { name: 'Afectados por epidemias', checked: false },
  { name: 'Otros', checked: false },
];

@Component({
  selector: 'app-beca',
  templateUrl: './beca.component.html',
  styleUrls: ['./beca.component.scss']
})
export class BecaComponent implements OnInit {
  states: Observable<any>;
  form: FormGroup;
  loading = false;
  submitted = false;
  department: string = '';
  isInvalidYear: boolean = false;
  model: NgbDateStruct;
  success: boolean = false;
  error: boolean = false;
  errorMessage: string = '';
  routerSubscription: Observable<any>;
  isEditMode: boolean = false;

  vulnerableGroup: vulnerableGroupInterface[];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private countriesService: CountriesService,
    private becasService: BecasService,
  ) { }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap?.get('id');

    if (userId) {
      this.isEditMode = true;
      this.editForm(+userId);
    }

    this.vulnerableGroup = VULNERABLE_GROUP_LIST;

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
      name: ['', Validators.required],
      lastName: ['', Validators.required],
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
      sex: ['', Validators.required],
      age: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(2),
      ])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      ethnicity: ['', Validators.required],
      vulnerableGroup: new FormArray([]),
      currentAddress: ['', Validators.required],
      civilStatus: ['', Validators.required],
      numberOfChildren: [0, Validators.compose([Validators.maxLength(2)])],
      educationalCenterName: ['', Validators.required],
      educationalCenterAddress: ['', Validators.required],
      academicLevel: ['', Validators.required],
      grade: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(2),
      ])],
      motherName: [''],
      fatherName: [''],
      numberOfChildrenFathers: [0, Validators.compose([Validators.maxLength(2)])],
      educationalLevelMother: [''],
      educationalLevelFather: ['', Validators.required],
      fathersAddress: [''],
      motherWork: [''],
      fatherWork: [''],
      monthlyIncome: [''],
      fathersPhone: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(8),
        Validators.pattern(/^\d+$/)
      ])],
      observation: [''],
    });

    if(!this.isEditMode) this._patchValues2();
  }

  private _patchValues2(data?: any): void {
    const formArray = this.form.get('vulnerableGroup') as FormArray;

    this.vulnerableGroup = data ? data : this.vulnerableGroup;
      this.vulnerableGroup.forEach((item) => {
        formArray.push(
          new FormGroup({
            name: new FormControl(item.name),
            checked: new FormControl(item.checked),
          })
        );
      });
  }

  editForm(id: number): void {
    this.loading = true;

    this.becasService.getById(id).pipe(first()).subscribe({
      next: (res) => {
        this.form.patchValue({
          identidad: res.identidad,
          name: res.name,
          lastName: res.lastName,
          bornDate: new Date(res.bornDate),
          phone: res.phone,
          sex: res.sex,
          age: res.age,
          department: res.department,
          municipality: res.municipality,
          village: res.village,
          barrio: res.barrio,
          currentAddress: res.currentAddress,
          email: res.email,
          ethnicity: res.ethnicity,
          civilStatus: res.civilStatus,
          numberOfChildren: res.numberOfChildren,
          educationalCenterName: res.educationalCenterName,
          educationalCenterAddress: res.educationalCenterAddress,
          academicLevel: res.academicLevel,
          grade: res.grade,
          motherName: res.motherName,
          fatherName: res.fatherName,
          numberOfChildrenFathers: res.numberOfChildrenFathers,
          educationalLevelMother: res.educationalLevelMother,
          educationalLevelFather: res.educationalLevelFather,
          fathersAddress: res.fathersAddress,
          motherWork: res.motherWork,
          fatherWork: res.fatherWork,
          monthlyIncome: res.monthlyIncome,
          fathersPhone: res.fathersPhone,
          observation: res.observation,
        });
        const [year, month, day] = res.bornDate.split('-');
        const obj = { year: parseInt(year), month: parseInt(month), day: parseInt(day.split(' ')[0].trim()) };
        this.model = obj;
        this.loading = false;
        this._patchValues2(res.vulnerableGroup);
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


    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    const bornDate = `${this.model.year}-${this.model.month}-${this.model.day}`;

    this.loading = true;
    this.form.value.bornDate = bornDate;

    if (!this.isEditMode) {
      this.becasService.post(this.form.value)
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
      this.becasService.put(+this.route.snapshot.paramMap?.get('id'), this.form.value)
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
