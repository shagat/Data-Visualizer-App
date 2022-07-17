import { NgModule } from "@angular/core";
import { MatSliderModule} from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
    exports:[
        MatSliderModule,
        MatRadioModule,
    ]
})
export class MaterialsModule{}