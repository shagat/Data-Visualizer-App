import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModules } from "../shared.modules";
import { VisualizerComponent } from "../visualizer/visualizer.component"; 
import { SortItemComponent } from "./sort-item/sort-item.component";
import { SortStartComponent } from "./sort-start.component";
import { StartComponent } from "../start/start.component";


@NgModule({
    declarations:[
        StartComponent,
        SortItemComponent,
        SortStartComponent,
        VisualizerComponent,
    ],
    imports:[
        SharedModules,
        RouterModule.forChild([
            {path: '', component: SortStartComponent}
        ])
    ]
})
export class SortingModule {

}