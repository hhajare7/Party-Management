import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { Button, ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { PartyManagementComponent } from './party-management/party-management.component';
import { MenuModule } from 'primeng/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ImageModule } from 'primeng/image';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
@NgModule({
  declarations: [AppComponent, LoginComponent, PartyManagementComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    Button,
    DividerModule,
    TableModule,
    MenuModule,
    ButtonModule,
    BrowserAnimationsModule,
    DialogModule,
    CheckboxModule,
    CalendarModule,
    InputNumberModule,
    ImageModule,
    FileUploadModule,
    ToastModule,
    MenubarModule,
    TabMenuModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
