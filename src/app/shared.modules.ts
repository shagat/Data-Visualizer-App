import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MaterialsModule } from "src/materials.modules";

@NgModule({
    imports:[
        NgbModule,
        MaterialsModule,
        CommonModule,
        FormsModule
    ],
    exports: [
        NgbModule,
        MaterialsModule,
        CommonModule,
        FormsModule,
    ]
}) export class SharedModules{

}