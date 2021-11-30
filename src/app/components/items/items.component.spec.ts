import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DescriptionPipe } from 'src/app/pipes/description.pipe';
import { SortProductPipe } from 'src/app/pipes/sort-product.pipe';
import { By } from '@angular/platform-browser';
import { ItemsComponent } from './items.component';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AppRoutingModule],
      declarations: [ItemsComponent, SortProductPipe, DescriptionPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    component.Products = [
      {
        name: 'test',
        price: 1,
        description: 'test',
        quantity: 1,
        imageUrl: 'testUrl',
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onEdit on clicking edit button', () => {
    component.onEdit = jasmine.createSpy();
    let button = fixture.debugElement.query(By.css('[data-aq="btnEdit"]'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.onEdit).toHaveBeenCalledOnceWith({
      name: 'test',
      price: 1,
      description: 'test',
      quantity: 1,
      imageUrl: 'testUrl',
    });
  });

  it('should call onDelete on clicking edit button', () => {
    component.onDelete = jasmine.createSpy();
    let button = fixture.debugElement.query(By.css('[data-aq="btnDelete"]'));
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.onDelete).toHaveBeenCalledOnceWith({
      name: 'test',
      price: 1,
      description: 'test',
      quantity: 1,
      imageUrl: 'testUrl',
    });
  });
});
