import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, first, tap } from 'rxjs/operators';
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
  @ViewChild('input') input: ElementRef;

  constructor(
    private usersService: UsersService
  ) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap((text) => {
          this.search(this.input.nativeElement.value)
        })
      ).subscribe();
  }

  getUsersList(page: number, pageSize: number): void {
    this.usersService.get(page, pageSize).pipe(first()).subscribe({
      next: (res) => {
        this.users = res.rows;
        this.allUsers = this.users;
        this.collectionSize = res.totalItems;
      },
    });
  }

  pageChange(): void {
    this.getUsersList(this.page - 1, this.pageSize);
  }

  search(value: string): void {
    if(value) {
      this.usersService.search(value.toLowerCase()).pipe(first()).subscribe({
        next: (res) => {
          this.users = res.rows;
          this.allUsers = this.users;
          this.collectionSize = res.totalItems;
        },
      });

    } else {
      this.getUsersList(this.page - 1, this.pageSize);
    }
  }
}