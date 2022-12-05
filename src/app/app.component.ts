import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from './shared/interfaces/user.interface';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public dataSource: MatTableDataSource<User> = new MatTableDataSource();
  public displayedColumns = ['gender', 'cell', 'email', 'nat', 'phone'];
  @ViewChild(MatPaginator) paginateur!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.fetchUsers().subscribe((users: User[]) => {
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginateur;
      this.dataSource.sort = this.sort;
    });
  }

  updateFilter(event: Event) {
    let filtre = (event.target as HTMLInputElement).value;
    filtre = filtre.trim().toLowerCase();
    this.dataSource.filter = filtre;
  }
}
