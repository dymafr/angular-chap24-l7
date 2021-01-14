import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { User } from "./shared/interfaces/user.interface";
import { UserService } from "./shared/services/user.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  public dataSource: MatTableDataSource<User> = new MatTableDataSource();
  public displayedColumns = ["gender", "cell", "email", "nat", "phone"];
  @ViewChild(MatPaginator, { static: true }) paginateur: MatPaginator;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.fetchUsers().subscribe((users: User[]) => {
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginateur;
    });
  }
}
