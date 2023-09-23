import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/constants/models';
import { skills } from 'src/app/constants/portfolio-content';

@Component({
  selector: 'app-skill-container',
  templateUrl: './skill-container.component.html',
})
export class SkillContainerComponent implements OnInit {
  skills!: Array<Skill>;
  filterMode: string = 'All';
  classifications: Array<string> = [];

  ngOnInit(): void {
    this.skills = skills;
    this.skills.map((skill: Skill) => {
      if (!this.classifications.includes(skill.classification)) {
        this.classifications.push(skill.classification);
      }
      return skill;
    });

    this.classifications.unshift(this.filterMode);
  }

  filter(classification: string) {
    this.skills =
      classification === 'All'
        ? skills
        : skills.filter(
            (skill: Skill) => skill.classification === classification
          );
    this.filterMode = classification;
  }
}
