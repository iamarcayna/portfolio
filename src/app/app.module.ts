import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutMeComponent } from './pages/about-me/about-me.component';
import { HeroComponent } from './pages/home/sections/hero/hero.component';
import { AboutComponent } from './pages/about-me/sections/about/about.component';
import { ProjectsComponent } from './pages/home/sections/projects/projects.component';
import { SkillsComponent } from './pages/home/sections/skills/skills.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/header/components/logo/logo.component';
import { NavigationsComponent } from './components/header/components/navigations/navigations.component';
import { ThemeSelectorComponent } from './components/header/components/theme-selector/theme-selector.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ExperienceComponent } from './pages/about-me/sections/experience/experience.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { VerticalNavigationsComponent } from './components/drawer/vertical-navigations/vertical-navigations.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { SkillCardComponent } from './pages/home/sections/skills/skill-card/skill-card.component';
import { SkillContainerComponent } from './pages/home/sections/skills/skill-container/skill-container.component';
import { ProjectCardComponent } from './pages/home/sections/projects/project-card/project-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutMeComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
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
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
