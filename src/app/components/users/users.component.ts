import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  public users: any[] = [];
  public filterText: string = '';
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }

  onEdit = (user: Object) => {
    this.router.navigateByUrl('/addUser', {
      state: { user },
    });
  };
  onDelete = (userToDelete: Object) => {
    this.userService.deleteUser(userToDelete).subscribe((result) => {
      this.userService.getUsers().subscribe((user) => {
        this.users = user;
      });
    });
  };
}
