import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/service/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  constructor(private itemService: ItemService, private router: Router) {}
  public Products: any[] = [];
  public filterText: string = '';

  ngOnInit(): void {
    this.itemService.getProducts().subscribe((products) => {
      this.Products = products;
    });
  }

  onEdit = (product: Object) => {
    this.router.navigateByUrl('/addProduct', {
      state: { product },
    });
  };

  onDelete = (product: Object) => {
    this.itemService.deleteProduct(product).subscribe((result) => {
      this.itemService.getProducts().subscribe((product) => {
        this.Products = product;
      });
    });
  };
}
