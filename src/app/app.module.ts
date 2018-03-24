import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarFormComponent } from './sidebar-form/sidebar-form.component';
import { SidebarDataComponent } from './sidebar-data/sidebar-data.component';
import { SidebarContentComponent } from './sidebar-content/sidebar-content.component';
import { GitApiService } from './git-api.service';
import { HttpClientModule } from '@angular/common/http';
import { SidebarContentService } from './sidebar-content.service';
import { D3ContainerComponent } from './d3-container/d3-container.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SidebarFormComponent,
    SidebarDataComponent,
    SidebarContentComponent,
    D3ContainerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    GitApiService,
    SidebarContentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
