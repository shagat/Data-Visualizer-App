import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Data } from "./Data.model";
import { DataService } from "./data.service";
@Injectable({
    providedIn: 'root'
})
export class WorksResolverService implements Resolve<Data[]>{
    constructor(private dataService: DataService ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Data[] | Observable<Data[]> | Promise<Data[]> {
        const data = this.dataService.fetchData()
        if (data) {
            // console.log('This is the Data of a Resolver')
            return;
        } else {
            // console.log('This is the Data of a Resolver')
            return ;
        }
    }
}