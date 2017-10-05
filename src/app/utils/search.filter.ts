import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'searchfilter'
})

@Injectable()
export class SearchFilterPipe implements PipeTransform {
    transform(items: any[], field: string, value: string): any[] {
        if (!items) return [];
        if (!value) {
            return items;
        }
        if (field && field.indexOf('.') >= 0) {
            let columns = field.split('.');
            let parentField = columns[0];
            let childField = columns[1];
            return items.filter(it =>  it[parentField][childField] && it[parentField][childField].toLowerCase().indexOf(value.toLowerCase()) >= 0);
        }
        return items.filter(it => it[field] && it[field].toLowerCase().indexOf(value.toLowerCase()) >= 0);
    }
}