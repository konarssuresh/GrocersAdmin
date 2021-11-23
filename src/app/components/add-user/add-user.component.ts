import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  private initialValues: any = {};
  public isEditUser: boolean = false;
  public errMsg: string = '';
  public userForm: any;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    let formInitialValues: any =
      this.router?.getCurrentNavigation()?.extras?.state?.user;
    if (formInitialValues !== undefined) {
      const { userId, password, firstName, lastName, userType, dateOfBirth } =
        formInitialValues;
      const dob = new Date(dateOfBirth);
      const calculatedDob: Object = {
        day: dob.getDate(),
        month: dob.getMonth() + 1,
        year: dob.getFullYear(),
      };
      this.initialValues = {
        userId,
        password,
        firstName,
        lastName,
        userType,
        dateOfBirth: calculatedDob,
      };
      this.isEditUser = true;
    } else {
      this.initialValues = {
        userId: '',
        password: '',
        firstName: '',
        lastName: '',
        userType: 'general',
        dateOfBirth: '',
      };
      this.isEditUser = false;
    }
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userId: [
        { value: this.initialValues.userId, disabled: this.isEditUser },
        Validators.required,
      ],
      password: [
        this.initialValues.password,
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ],
      ],
      firstName: [this.initialValues.firstName, Validators.required],
      lastName: [this.initialValues.lastName],
      userType: [this.initialValues.userType, Validators.required],
      dateOfBirth: [this.initialValues.dateOfBirth, Validators.required],
    });
  }

  get getControl() {
    return this.userForm.controls;
  }

  addOrEditUser = (): void => {
    const user = this.userForm.value;
    if (this.isEditUser) {
      this.userService
        .editUser({
          ...user,
          dateOfBirth: `${user.dateOfBirth.month}/${user.dateOfBirth.day}/${user.dateOfBirth.year}`,
        })
        .subscribe((result) => {
          console.log(result);
          if (result?.message === 'user updated successfully') {
            alert(result?.message);
            this.router.navigateByUrl('/users');
          } else {
            this.errMsg = result?.message;
          }
        });
    } else {
      this.userService
        .addUser({
          ...user,
          dateOfBirth: `${user.dateOfBirth.month}/${user.dateOfBirth.day}/${user.dateOfBirth.year}`,
        })
        .subscribe((result) => {
          if (result?.message === 'User added successfully') {
            alert(result?.message);
            this.router.navigateByUrl('/users');
          } else {
            this.errMsg = result?.message;
          }
        });
    }
  };
}
