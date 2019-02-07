import { ModalService } from './modal.service';
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
import { SampleReposComponent } from './sample-repos/sample-repos.component';
import { HelpModalComponent } from './help-modal/help-modal.component';
import { ClickStopPropagationDirective } from './click-stop-propagation.directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SidebarFormComponent,
    SidebarDataComponent,
    SidebarContentComponent,
    D3ContainerComponent,
    SampleReposComponent,
    HelpModalComponent,
    ClickStopPropagationDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    GitApiService,
    SidebarContentService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
