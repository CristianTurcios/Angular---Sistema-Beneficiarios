import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/add-beneficiario/user-profile.component';
import { TablesComponent } from '../../pages/beneficiarios/tables.component';
import { DiscapacitadosComponent } from '../../pages/discapacitados/discapacitados.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',          component: DashboardComponent },
    { path: 'add-beneficiario',       component: UserProfileComponent },
    { path: 'edit-user-profile/:id',   component: UserProfileComponent },
    { path: 'beneficiarios',             component: TablesComponent },
    { path: 'discapacitados',             component: DiscapacitadosComponent },
    { path: 'icons',              component: IconsComponent },
    { path: 'maps',               component: MapsComponent }
];
