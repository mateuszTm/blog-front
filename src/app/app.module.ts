import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { PanelModule } from './panel/panel.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { EditPostComponent } from './edit-post/edit-post.component';
import { SharedModule } from './shared/shared.module';
import { TestOneComponent } from './test/test-one/test-one.component';
import { TestTwoComponent } from './test/test-two/test-two.component';
import { TestBaseComponent } from './test/test-base/test-base.component';


@NgModule({
  declarations: [
    AppComponent,
    EditPostComponent,
    TestOneComponent,
    TestTwoComponent,
    TestBaseComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HeaderModule,
    FooterModule,
    PanelModule,
    HomeModule,
    LoginModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
