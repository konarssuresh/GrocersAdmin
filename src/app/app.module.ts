import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './components/items/items.component';
import { UsersComponent } from './components/users/users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { ItemService } from './service/item.service';
import { UserService } from './service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddItemComponent } from './components/add-item/add-item.component';
import { ErrorComponent } from './components/error/error.component';
import { SortProductPipe } from './pipes/sort-product.pipe';
import { DescriptionPipe } from './pipes/description.pipe';
import { AddUserComponent } from './components/add-user/add-user.component';
import { FilterUserPipe } from './pipes/filter-user.pipe';
@NgModule({
  declarations: [AppComponent, ItemsComponent, UsersComponent, HomeComponent, AddItemComponent, ErrorComponent, SortProductPipe, DescriptionPipe, AddUserComponent, FilterUserPipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ItemService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
