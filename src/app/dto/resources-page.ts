import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ResourcesPage {
    content: object[];
    numberOfElements: number;
    totalPages: number;
    number: number;
}