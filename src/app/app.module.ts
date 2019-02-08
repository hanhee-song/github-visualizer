import { ModalService } from './services/modal.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarFormComponent } from './components/sidebar-form/sidebar-form.component';
import { SidebarDataComponent } from './components/sidebar-data/sidebar-data.component';
import { SidebarContentComponent } from './components/sidebar-content/sidebar-content.component';
import { GitApiService } from './services/git-api.service';
import { HttpClientModule } from '@angular/common/http';
import { SidebarContentService } from './services/sidebar-content.service';
import { D3ContainerComponent } from './components/d3-container/d3-container.component';
import { SampleReposComponent } from './components/sample-repos/sample-repos.component';
import { HelpModalComponent } from './components/help-modal/help-modal.component';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
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
