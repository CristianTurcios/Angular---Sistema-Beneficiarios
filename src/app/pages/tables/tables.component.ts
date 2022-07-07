import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { BeneficiariosService } from 'src/app/services/beneficiarios.service';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  beneficiarios: any;
  success: boolean = false;
  error: boolean = false;
  errorMessage: string = '';
  page = 1;
  pageSize = 10;

  constructor(
    private _router: Router,
    private beneficiariosService: BeneficiariosService
  ) { }

  ngOnInit() {
    this.getBeneficiariosList();
  }

  getBeneficiariosList(): void {
    this.beneficiariosService.get().pipe(first()).subscribe({
      next: (res) => {
        this.beneficiarios = res;
        },
    });
  }

  getAge(userAge): number {
    const currentYear =  new Date().getFullYear();
    return currentYear - new Date(userAge).getFullYear();
  }

  delete(id: number): void {
    this.beneficiariosService.delete(id)
      .pipe(first())
      .subscribe({
        next: () => {
          this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 3000);
          this.getBeneficiariosList();
        },
        error: (err) => {
          this.error = true;
          this.errorMessage = err.error.message;

          setTimeout(() => {
            this.error = false;
            this.errorMessage = '';
          }, 7000)
        }
      });
  }

  edit(id: number): void {    
    this._router.navigate(['/edit-user-profile', id]);
  }

  exportData(): void {
    const options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true, 
    showTitle: true,
    title: 'Lista Beneficiarios',
    useBom: true,
    noDownload: false,
    headers: ["id", "Identidad", "Fecha de Nacimiento", "Telefono", "Departamento", "Municipio", "Aldea", "Barrio", "Fecha Creacion", "Fecha Edicion"],
    useHeader: false,
    nullToEmptyString: true,
  };
    new AngularCsv(this.beneficiarios, `Lista Beneficiarios - ${new Date().toDateString()}`, options);
  }
}
