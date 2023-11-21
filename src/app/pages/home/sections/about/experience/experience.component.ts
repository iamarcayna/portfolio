import { Component, Input, OnInit } from '@angular/core';
import { Experience } from 'src/app/constants/models';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
})
export class ExperienceComponent implements OnInit {
  @Input('experiences') experiences!: Array<Experience>;

  ngOnInit(): void {
    this.experiences.map((experience) => {
      return (experience.duration = this.calculateTimePeriod(
        experience.start_date,
        experience.end_date
      ));
    });
  }

  private calculateTimePeriod(startDateString: string, endDateString: string) {
    const startDate = new Date(startDateString);
    const endDate =
      endDateString.toLowerCase() === 'present'
        ? new Date()
        : new Date(endDateString);

    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();
    let totalMonths = years * 12 + months + 1;

    const remainingYears = Math.floor(totalMonths / 12);
    const remainingMonths = Math.ceil(totalMonths % 12);
    return remainingYears === 0
      ? `(${remainingMonths} mos)`
      : `(${remainingYears} yrs ${remainingMonths} mos)`;
  }
}
