import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MonacoEditorModule , NgxMonacoEditorConfig} from 'ngx-monaco-editor';
import { FilecompComponent } from './filecomp/filecomp.component';
import { HttpClientModule } from  '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ComponentNameComponent } from './component-name/component-name.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';
import { TabsComponent } from './tabs/tabs.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { OverlayModule} from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubmissionComponent } from './submission/submission.component';
import {MatTabsModule} from '@angular/material/tabs';
@NgModule({

  declarations: [
    AppComponent,
    FilecompComponent,
    ComponentNameComponent,
    NavbarComponent,
    TabsComponent,
    SubmissionComponent,
  
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    MonacoEditorModule.forRoot(),
    HttpClientModule,
    MatIconModule,
      MatProgressBarModule,
     SplitterModule,
     MatIconModule,
     MatToolbarModule,
     MatButtonModule,
     MatSidenavModule,
     MatIconModule,
     MatListModule,
    MatSidenavModule,
    MatListModule,
    OverlayModule,
    BrowserAnimationsModule,
    MatTabsModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
