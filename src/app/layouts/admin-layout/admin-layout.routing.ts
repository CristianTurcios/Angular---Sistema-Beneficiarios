import { Routes } from '@angular/router';
import { UserProfileComponent } from '../../pages/add-beneficiario/user-profile.component';
import { TablesComponent } from '../../pages/beneficiarios/tables.component';
import { DiscapacitadosComponent } from '../../pages/discapacitados/discapacitados.component';
import { DiscapacitadoComponent } from '../../pages/add-discapacitado/discapacitado.component';
import { UsersComponent } from 'src/app/pages/users/users.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'add-beneficiario',       component: UserProfileComponent },
    { path: 'edit-user-profile/:id',   component: UserProfileComponent },
    { path: 'beneficiarios',             component: TablesComponent },
    { path: 'discapacitados',             component: DiscapacitadosComponent },
    { path: 'users',             component: UsersComponent },
    { path: 'add-discapacitado',       component: DiscapacitadoComponent },
    { path: 'edit-discapacitado/:id',   component: DiscapacitadoComponent },
];
