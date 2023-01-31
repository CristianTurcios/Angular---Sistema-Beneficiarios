import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any = [];
  allUsers: any = [];
  success: boolean = false;
  error: boolean = false;
  errorMessage: string = '';
  page = 0;
  pageSize = 10;
  headers: any;
  searchTerm: string = '';
  collectionSize: number = 0;

  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList(): void {
    this.usersService.get(this.page, this.pageSize).pipe(first()).subscribe({
      next: (res) => {
        this.users = res.users;
        this.allUsers = this.users;
        this.collectionSize = res.totalItems;
      },
    });
  }

  search(value: string): void {
    this.users = this.allUsers.filter((val) => val.email.toLowerCase().includes(value));
  }
}