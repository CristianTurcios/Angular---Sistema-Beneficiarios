import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { UserProfileComponent } from '../../pages/add-beneficiario/user-profile.component';
import { TablesComponent } from '../../pages/beneficiarios/tables.component';
import { DiscapacitadosComponent } from '../../pages/discapacitados/discapacitados.component';
import { DiscapacitadoComponent } from '../../pages/add-discapacitado/discapacitado.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListFilterPipe } from 'src/app/pipes/list-filter.pipe';
import { UsersComponent } from '../../pages/users/users.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UserProfileComponent,
    TablesComponent,
    DiscapacitadosComponent,
    DiscapacitadoComponent,
    UsersComponent,
    ListFilterPipe
  ]
})

export class AdminLayoutModule {}
