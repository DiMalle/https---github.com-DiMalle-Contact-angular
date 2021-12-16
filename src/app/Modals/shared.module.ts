import { NgModule } from "@angular/core";
import { ImagePipe } from '../pipes/image.pipe';
import { SortPipe } from "../pipes/sort.pipe";

@NgModule({
    declarations: [ImagePipe, SortPipe],
    exports: [ImagePipe, SortPipe],
})
export class SharedModule { }