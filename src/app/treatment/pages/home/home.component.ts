import { Component, OnInit } from '@angular/core';
import { Treatment } from '../../models/treatment.interface';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { TreatmentActions } from '../../state/treatment.actions';
import { TableActions } from '../../enums/table-actions.enum';
import { selectTreatments } from '../../state/treatment.selectors';
import { CommandBarActions } from '../../enums/command-bar-actions.enum';
import { ScrollService } from 'src/app/core/services/scroll-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  

  
  treatmentsGroupedByType: { [key: string]: Treatment[] } = {};
  treatments: ReadonlyArray<Treatment> = [];
  treatments$ = this.store.select(selectTreatments());
  headers:{headerName: string, fieldName: keyof Treatment}[] = [
    {headerName: "Name", fieldName: "name"},
    {headerName: "Description", fieldName: "description"},
    {headerName: "Price", fieldName: "price"},
    {headerName: "Duration(min)", fieldName: "duration"}    
  ]

  constructor(
    private router: Router, 
    private store: Store<AppState>,
    private scrollService: ScrollService){}

  ngOnInit(): void {
    this.store.dispatch({type: TreatmentActions.GET_TREATMENT_LIST})
    
    this.treatments$.subscribe((data) => {
      this.treatments = data;
      this.assignTreatments();
    })

    this.scrollService.scrollToSection$.subscribe((section) => { 
      this.scrollToSection(section);
    });
  }

  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  
  selectTreatment(data: {treatment: Treatment, action : TableActions}){
    switch(data.action){
      case TableActions.View :{
        this.router.navigate(['treatments', 'form', data.treatment.id]);
        return;
      }
      default: ""
    }
  }

  assignTreatments() {
    

    this.treatmentsGroupedByType = this.treatments.reduce((acc, treatment) => {
      const typeName = treatment.type.name;
      if (!acc[typeName]) {
        acc[typeName] = [];
      }
      acc[typeName].push(treatment);
      return acc;
    }, {} as { [key: string]: Treatment[] });
  }

  executeCommandBarAction(action: CommandBarActions){
    switch(action){
      case CommandBarActions.Create :{
        this.router.navigate(["treatments","form"]);
        return;
      }
      case CommandBarActions.List :{
        this.router.navigate(["treatments","list"]);
        return;
      }
      // case CommandBarActions.DeleteAll :{
      //   return;
      // }
      default: ""
    }
  }


  getTreatmentTypes(): string[] {
    return Object.keys(this.treatmentsGroupedByType);
  }

  getTreatmentsByType(type: string): Treatment[] {
    return this.treatments.filter(treatment => treatment.type.name === type);
  }
}
