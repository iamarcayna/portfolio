import { Component, OnInit, ViewChild, ViewRef } from '@angular/core';
import { Skill } from 'src/app/constants/models';
import { skills } from 'src/app/constants/portfolio-content';
import { ContainerDirective } from 'src/app/directives/container.directive';
import { SkillCardComponent } from '../skill-card/skill-card.component';

@Component({
  selector: 'app-skill-container',
  templateUrl: './skill-container.component.html',
})
export class SkillContainerComponent implements OnInit {
  skills: Array<Skill> = skills;
  skillsViewRef: Array<{ viewRef: ViewRef | null; classification: string }> =
    [];
  filterMode: string = 'All';
  classifications: Array<string> = [];

  @ViewChild(ContainerDirective, { static: true })
  skillContainer!: ContainerDirective;

  ngOnInit(): void {
    this.skills.map((skill: Skill) => {
      if (!this.classifications.includes(skill.classification)) {
        this.classifications.push(skill.classification);
      }
      return skill;
    });
    this.classifications.unshift(this.filterMode);
    this.prepareView();
    this.showAllSkills();
  }

  filter(classification: string) {
    this.removeAllSkills();
    if (classification === 'All') {
      this.showAllSkills();
    } else {
      this.showByClassification(classification);
    }
    this.filterMode = classification;
  }

  private prepareView() {
    this.skills.forEach((skill) => {
      const skillCardRef =
        this.skillContainer.viewContainerRef.createComponent<SkillCardComponent>(
          SkillCardComponent
        );
      skillCardRef.instance.icon = skill.icon;
      skillCardRef.instance.title = skill.name;
      this.skillsViewRef.push({
        viewRef: this.skillContainer.viewContainerRef.detach(0),
        classification: skill.classification,
      });
    });
  }

  private showAllSkills() {
    this.skillsViewRef.forEach((skill) => {
      if (skill.viewRef) {
        this.skillContainer.viewContainerRef.insert(skill.viewRef);
      }
    });
  }

  private removeAllSkills() {
    while (this.skillContainer.viewContainerRef.length !== 0) {
      this.skillContainer.viewContainerRef.detach(0);
    }
  }

  private showByClassification(classification: string) {
    this.skillsViewRef.forEach((skill) => {
      if (skill.classification === classification && skill.viewRef) {
        this.skillContainer.viewContainerRef.insert(skill.viewRef);
      }
    });
  }
}
