import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CategoryListComponent } from './pages/category/category-list/category-list.component';
import {RouterModule, Routes} from "@angular/router";
import { AlertErrorComponent } from './bootstrap/alert-error/alert-error.component';
import { ModalComponent } from './bootstrap/modal/modal.component';
import {CategoryNewModalComponent} from "./pages/category/category-new-modal/category-new-modal.component";
import {CategoryEditModalComponent} from "./pages/category/category-edit-modal/category-edit-modal.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'categories/list', component: CategoryListComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CategoryListComponent,
    AlertErrorComponent,
    ModalComponent,
    CategoryNewModalComponent,
    CategoryEditModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
