import { Component, OnInit } from '@angular/core';
import { Skill, SkillSet } from 'src/app/constants/models';
import { skillsets } from 'src/app/constants/portfolio-content';

@Component({
  selector: 'app-skill-container',
  templateUrl: './skill-container.component.html',
})
export class SkillContainerComponent implements OnInit {
  skills: Array<Skill> = [];
  filterMode: string = 'All';
  classifications!: Array<string>;

  ngOnInit(): void {
    skillsets.map((skillset: SkillSet) => {
      this.skills.push(...skillset.skills);
    });
    this.classifications = skillsets.map((skillsets) => {
      return skillsets.classification;
    });
    this.classifications.unshift(this.filterMode);
  }

  filter(classification: string) {
    this.skills = [];
    if (classification === 'All') {
      skillsets.map((skillset: SkillSet) => {
        this.skills.push(...skillset.skills);
      });
    } else {
      skillsets
        .filter(
          (skillset: SkillSet) => skillset.classification === classification
        )
        .map((skillset: SkillSet) => {
          this.skills.push(...skillset.skills);
        });
    }
    this.filterMode = classification;
  }

  trackBySkillName(_index: number, item: Skill) {
    return item.name;
  }
}
