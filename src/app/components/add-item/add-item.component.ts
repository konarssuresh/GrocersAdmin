import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemService } from 'src/app/service/item.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  private initialValues: any = {};
  public isEditProduct: boolean = false;
  public errMsg: string = '';
  public productForm: any;
  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private router: Router
  ) {
    let formInitialValues: any =
      this.router?.getCurrentNavigation()?.extras?.state?.product;

    if (formInitialValues !== undefined) {
      let { _id, name, imageUrl, price, quantity, expiryDate, description } =
        formInitialValues;
      console.log(formInitialValues);
      const expDate = new Date(expiryDate);
      const calculatedExpiryDate: Object = {
        day: expDate.getDate(),
        month: expDate.getMonth() + 1,
        year: expDate.getFullYear(),
      };
      this.initialValues = {
        _id,
        name,
        imageUrl,
        price,
        quantity,
        expiryDate: calculatedExpiryDate,
        description,
      };
      this.isEditProduct = true;
    } else {
      this.initialValues = {
        name: '',
        imageUrl: '',
        price: null,
        quantity: null,
        expiryDate: '',
        description: '',
      };
      this.isEditProduct = false;
    }
  }

  ngOnInit(): void {
    console.log(this.initialValues);
    this.productForm = this.fb.group({
      name: [this.initialValues.name, Validators.required],
      imageUrl: [this.initialValues.imageUrl],
      price: [
        this.initialValues.price,
        [Validators.required, Validators.min(1)],
      ],
      quantity: [
        this.initialValues.quantity,
        [Validators.required, Validators.min(1)],
      ],
      expiryDate: [this.initialValues.expiryDate, Validators.required],
      description: [this.initialValues.description, Validators.required],
    });
  }

  get getControl() {
    return this.productForm.controls;
  }

  addOrEditItem = () => {
    const product = this.productForm.value;

    if (this.isEditProduct) {
      let { _id } = this.initialValues;
      this.itemService
        .editProduct({
          _id,
          ...product,
          expiryDate: new Date(
            `${product.expiryDate.month}/${product.expiryDate.day}/${product.expiryDate.year}`
          ),
        })
        .subscribe((response: any) => {
          if (response?.message === 'item updated successfully') {
            alert(response?.message);
            this.router.navigateByUrl('/products');
          } else {
            this.errMsg = response.message;
          }
        });
    } else {
      this.itemService
        .addProduct({
          ...product,
          expiryDate: new Date(
            `${product.expiryDate.month}/${product.expiryDate.day}/${product.expiryDate.year}`
          ),
        })
        .subscribe((response: any) => {
          if (response?.message === 'item added successfully') {
            alert(response?.message);
            this.router.navigateByUrl('/products');
          } else if (response?.message === 'item  already exists') {
            this.errMsg = response.message;
          } else {
            this.errMsg = response.message;
          }
        });
    }
  };
}
