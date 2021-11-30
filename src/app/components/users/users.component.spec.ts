import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FilterUserPipe } from 'src/app/pipes/filter-user.pipe';
import { By } from '@angular/platform-browser';
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AppRoutingModule],
      declarations: [UsersComponent, FilterUserPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    component.users = [
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
