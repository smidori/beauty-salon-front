import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Availability } from '../../models/availability.interface';
import { TableActions } from 'src/app/shared/enums/table-actions.enum';
import { User } from 'src/app/user/models/user.interface';

@Component({
  selector: 'availability-list',
  templateUrl: './availability-list.component.html',
  styleUrls: ['./availability-list.component.css']
})
export class AvailabilityListComponent implements OnInit{
  @Input() headers: Array<{ headerName: string, fieldName: keyof Availability, userName?: (keyof User)[] }> = []
  @Input() availabilities: ReadonlyArray<Availability> = [];
  @Output() availability = new EventEmitter<{availability: Availability, action:TableActions}>();

  headerFields:string[] = [];

  constructor() {}
  
  getFullName(user: User, userFields: (keyof User)[]): string {
    const nameParts = userFields.map(field => user[field]);
    return nameParts.join(' ');
  }

  
  ngOnInit(): void {
    this.getHeaderFields();
  }

  getHeaderFields(){
    this.headerFields = this.headers.map((data) => data.fieldName);
    this.headerFields.push("actions");
  }

  selectAvailability(availability: Availability, action:TableActions) {
    this.availability.emit({availability,action})
  }
}
