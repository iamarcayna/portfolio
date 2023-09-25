import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeroComponent } from './pages/home/sections/hero/hero.component';
import { AboutComponent } from './pages/home/sections/about/about.component';
import { ProjectsComponent } from './pages/home/sections/projects/projects.component';
import { SkillsComponent } from './pages/home/sections/skills/skills.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/header/components/logo/logo.component';
import { NavigationsComponent } from './components/header/components/navigations/navigations.component';
import { ThemeSelectorComponent } from './components/header/components/theme-selector/theme-selector.component';
import { ContactComponent } from './pages/home/sections/contact/contact.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { VerticalNavigationsComponent } from './components/drawer/vertical-navigations/vertical-navigations.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { SkillCardComponent } from './pages/home/sections/skills/skill-card/skill-card.component';
import { SkillContainerComponent } from './pages/home/sections/skills/skill-container/skill-container.component';
import { ProjectCardComponent } from './pages/home/sections/projects/project-card/project-card.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { IntersectingDirective } from './directives/intersecting.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    SkillsComponent,
    HeaderComponent,
    FooterComponent,
    LogoComponent,
    NavigationsComponent,
    ThemeSelectorComponent,
    ContactComponent,
    DrawerComponent,
    VerticalNavigationsComponent,
    BackToTopComponent,
    SkillCardComponent,
    SkillContainerComponent,
    ProjectCardComponent,
    NotFoundComponent,
    IntersectingDirective,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
