import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export const ROUTES: any[] = [{
  submenu: [
    { path: '/beneficiarios', title: 'Registros', icon: 'ni-bullet-list-67 text-red', class: '', isCollapsed: true },
    { path: '/add-beneficiario', title: 'Nuevo Registro', icon: 'ni-single-02 text-yellow', class: '', isCollapsed: true },
  ],
  icon: 'ni ni-favourite-28',
  title: 'Adulto Mayor',
  isCollapsed: true,
  requiredAdmin: false,
}, {
  submenu: [
    { path: '/discapacitados', title: 'Registros', icon: 'ni-bullet-list-67 text-red', class: '', isCollapsed: true },
    { path: '/add-discapacitado', title: 'Nuevo Registro', icon: 'ni-single-02 text-yellow', class: '', isCollapsed: true },
  ],
  title: 'Personas con Discapacidad',
  icon: 'ni ni-world',
  isCollapsed: true,
  requiredAdmin: false,
},
{
  submenu: [
    { path: '/users', title: 'Registros', icon: 'ni-bullet-list-67 text-red', class: '', isCollapsed: true },
  ],
  title: 'Usuarios',
  icon: 'ni ni-circle-08 text-pink',
  isCollapsed: true,
  requiredAdmin: true,
}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    const isAdmin = this.authService.userValue.isAdmin;
    
    this.menuItems = ROUTES.filter((menuItem) => {
      if (menuItem.requiredAdmin && isAdmin) {
        return menuItem
      } else if (!menuItem.requiredAdmin) {
        return menuItem
      }
    });

    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
