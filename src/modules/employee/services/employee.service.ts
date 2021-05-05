import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    EmployeeBasic,
    EmployeeContact,
    EmployeeEducation,
    EmployeeExperience,
    EmployeePosition,
} from '@modules/employee/models';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    constructor(private messageService: MessageService, private http: HttpClient) {}
    private employeeBasicUrl = 'http://192.168.1.100:7777/basic'; // URL to web api
    private employeeContactUrl = 'http://192.168.1.100:7777/contact';
    private employeeEducationUrl = 'http://192.168.1.100:7777/education';
    private employeeExperienceUrl = 'http://192.168.1.100:7777/experience';
    private employeePositionUrl = 'http://192.168.1.100:7777/position';
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    private log(message: string) {
        this.messageService.add(`EmployeeService: ${message}`);
    }

    /** GET: get the EmployeeMessage on the server */
    getEmployeeBasics(page: number, perpage: number): Observable<any> {
        // this.http.get<any>(this.employeesUrl).subscribe(res => {console.log(res); } );
        return this.http.get(this.employeeBasicUrl + '?page=' + page + '&size=' + perpage);
    }

    getEmployeeBasic(id: number): Observable<EmployeeBasic> {
        const url = `${this.employeeBasicUrl}/${id}`;
        // tslint:disable-next-line:no-non-null-assertion
        return this.http.get<EmployeeBasic>(url).pipe(
            tap(_ => this.log(`fetched EmployeeBasic id=${id}`)),
            catchError(this.handleError<EmployeeBasic>(`getEmployeeBasic id=${id}`))
        );
    }

    getEmployeePositions(id: number): Observable<EmployeePosition[]> {
        const url = `${this.employeePositionUrl}/?id=${id}`;
        // tslint:disable-next-line:no-non-null-assertion
        return this.http.get<EmployeePosition[]>(url).pipe(
            tap(_ => this.log(`fetched EmployeePosition id=${id}`)),
            catchError(this.handleError<EmployeePosition[]>(`getEmployeePosition id=${id}`))
        );
    }

    getEmployeePosition(id: number): Observable<EmployeePosition> {
        const url = `${this.employeePositionUrl}/${id}`;
        // tslint:disable-next-line:no-non-null-assertion
        return this.http.get<EmployeePosition>(url).pipe(
            tap(_ => this.log(`fetched EmployeePosition id=${id}`)),
            catchError(this.handleError<EmployeePosition>(`getEmployeePosition id=${id}`))
        );
    }

    getEmployeeEducations(id: number): Observable<EmployeeEducation[]> {
        const url = `${this.employeeEducationUrl}/?id=${id}`;
        // tslint:disable-next-line:no-non-null-assertion
        return this.http.get<EmployeeEducation[]>(url).pipe(
            tap(_ => this.log(`fetched EmployeeEducation id=${id}`)),
            catchError(this.handleError<EmployeeEducation[]>(`getEmployeeEducation id=${id}`))
        );
    }

    getEmployeeEducation(id: number): Observable<EmployeeEducation> {
        const url = `${this.employeeEducationUrl}/${id}`;
        // tslint:disable-next-line:no-non-null-assertion
        return this.http.get<EmployeeEducation>(url).pipe(
            tap(_ => this.log(`fetched EmployeeEducation id=${id}`)),
            catchError(this.handleError<EmployeeEducation>(`getEmployeeEducation id=${id}`))
        );
    }

    getEmployeeExperiences(id: number): Observable<EmployeeExperience[]> {
        const url = `${this.employeeExperienceUrl}/?id=${id}`;
        // tslint:disable-next-line:no-non-null-assertion
        return this.http.get<EmployeeExperience[]>(url).pipe(
            tap(_ => this.log(`fetched EmployeeExperience id=${id}`)),
            catchError(this.handleError<EmployeeExperience[]>(`getEmployeeExperience id=${id}`))
        );
    }

    getEmployeeExperience(id: number): Observable<EmployeeExperience> {
        const url = `${this.employeeExperienceUrl}/${id}`;
        // tslint:disable-next-line:no-non-null-assertion
        return this.http.get<EmployeeExperience>(url).pipe(
            tap(_ => this.log(`fetched EmployeeExperience id=${id}`)),
            catchError(this.handleError<EmployeeExperience>(`getEmployeeExperience id=${id}`))
        );
    }

    getEmployeeContacts(id: number): Observable<EmployeeContact[]> {
        const url = `${this.employeeContactUrl}/?id=${id}`;
        // tslint:disable-next-line:no-non-null-assertion
        return this.http.get<EmployeeContact[]>(url).pipe(
            tap(_ => this.log(`fetched EmployeeContact id=${id}`)),
            catchError(this.handleError<EmployeeContact[]>(`getEmployeeContact id=${id}`))
        );
    }

    getEmployeeContact(id: number): Observable<EmployeeContact> {
        const url = `${this.employeeContactUrl}/${id}`;
        // tslint:disable-next-line:no-non-null-assertion
        return this.http.get<EmployeeContact>(url).pipe(
            tap(_ => this.log(`fetched EmployeeContact id=${id}`)),
            catchError(this.handleError<EmployeeContact>(`getEmployeeContact id=${id}`))
        );
    }

    /** PUT: update the Basic on the server */
    updateEmployeeBasic(employeeBasic: EmployeeBasic): Observable<any> {
        return this.http.put(this.employeeBasicUrl, employeeBasic, this.httpOptions).pipe(
            tap(_ => this.log(`updated EmployeeBasic id=${employeeBasic.id}`)),
            catchError(this.handleError<any>('updateEmployeeBasic'))
        );
    }

    /** PUT: update the Position on the server */
    updateEmployeePosition(employeePosition: EmployeePosition): Observable<any> {
        return this.http.put(this.employeePositionUrl, employeePosition, this.httpOptions).pipe(
            tap(_ => this.log(`updated employeePosition id=${employeePosition.id}`)),
            catchError(this.handleError<any>('updateemployeePosition'))
        );
    }

    /** PUT: update the Education on the server */
    updateEmployeeEducation(employeeEducation: EmployeeEducation): Observable<any> {
        return this.http.put(this.employeeEducationUrl, employeeEducation, this.httpOptions).pipe(
            tap(_ => this.log(`updated employeeEducation id=${employeeEducation.id}`)),
            catchError(this.handleError<any>('updateemployeeEducation'))
        );
    }

    /** PUT: update the Experience on the server */
    updateEmployeeExperience(employeeExperience: EmployeeExperience): Observable<any> {
        return this.http.put(this.employeeExperienceUrl, employeeExperience, this.httpOptions).pipe(
            tap(_ => this.log(`updated employeeExperience id=${employeeExperience.id}`)),
            catchError(this.handleError<any>('updateemployeeExperience'))
        );
    }

    /** PUT: update the Contact on the server */
    updateEmployeeContact(employeeContact: EmployeeContact): Observable<any> {
        return this.http.put(this.employeeContactUrl, employeeContact, this.httpOptions).pipe(
            tap(_ => this.log(`updated employeeContact id=${employeeContact.id}`)),
            catchError(this.handleError<any>('updateemployeeContact'))
        );
    }

    /** POST: add a new Basic to the server */
    addBasic(employeeBasic: EmployeeBasic): Observable<EmployeeBasic> {
        return this.http
            .post<EmployeeBasic>(this.employeeBasicUrl, employeeBasic, this.httpOptions)
            .pipe(
                tap((newemployeeBasic: EmployeeBasic) =>
                    this.log(`added basic w/ id=${newemployeeBasic.id}`)
                ),
                catchError(this.handleError<EmployeeBasic>('addBasic'))
            );
    }

    /** POST: add a new Position to the server */
    addPosition(employeePosition: EmployeePosition): Observable<EmployeePosition> {
        return this.http
            .post<EmployeePosition>(this.employeePositionUrl, employeePosition, this.httpOptions)
            .pipe(
                tap((newemployeePosition: EmployeePosition) =>
                    this.log(`added Position w/ id=${newemployeePosition.id}`)
                ),
                catchError(this.handleError<EmployeePosition>('addPosition'))
            );
    }

    /** POST: add a new Education to the server */
    addEducation(employeeEducation: EmployeeEducation): Observable<EmployeeEducation> {
        return this.http
            .post<EmployeeEducation>(this.employeeEducationUrl, employeeEducation, this.httpOptions)
            .pipe(
                tap((newemployeeEducation: EmployeeEducation) =>
                    this.log(`added Education w/ id=${newemployeeEducation.id}`)
                ),
                catchError(this.handleError<EmployeeEducation>('addEducation'))
            );
    }

    /** POST: add a new Experience to the server */
    addExperience(employeeExperience: EmployeeExperience): Observable<EmployeeExperience> {
        return this.http
            .post<EmployeeExperience>(
                this.employeeExperienceUrl,
                employeeExperience,
                this.httpOptions
            )
            .pipe(
                tap((newemployeeExperience: EmployeeExperience) =>
                    this.log(`added Experience w/ id=${newemployeeExperience.id}`)
                ),
                catchError(this.handleError<EmployeeExperience>('addExperience'))
            );
    }

    /** POST: add a new Contact to the server */
    addContact(employeeContact: EmployeeContact): Observable<EmployeeContact> {
        return this.http
            .post<EmployeeContact>(this.employeeContactUrl, employeeContact, this.httpOptions)
            .pipe(
                tap((newemployeeContact: EmployeeContact) =>
                    this.log(`added Contact w/ id=${newemployeeContact.id}`)
                ),
                catchError(this.handleError<EmployeeContact>('addContact'))
            );
    }

    /** DELETE: delete the Basic from the server */
    deleteBasic(employeeBasic: EmployeeBasic | number): Observable<EmployeeBasic> {
        const id = typeof employeeBasic === 'number' ? employeeBasic : employeeBasic.id;
        const url = `${this.employeeBasicUrl}/${id}`;

        return this.http.delete<EmployeeBasic>(url, this.httpOptions).pipe(
            tap(_ => this.log(`deleted basic id=${id}`)),
            catchError(this.handleError<EmployeeBasic>('deleteBasic'))
        );
    }

    /** DELETE: delete the Position from the server */
    deletePosition(employeePosition: EmployeePosition | number): Observable<EmployeePosition> {
        const id = typeof employeePosition === 'number' ? employeePosition : employeePosition.id;
        const url = `${this.employeePositionUrl}/${id}`;

        return this.http.delete<EmployeePosition>(url, this.httpOptions).pipe(
            tap(_ => this.log(`deleted Position id=${id}`)),
            catchError(this.handleError<EmployeePosition>('deletePosition'))
        );
    }

    /** DELETE: delete the Education from the server */
    deleteEducation(employeeEducation: EmployeeEducation | number): Observable<EmployeeEducation> {
        const id = typeof employeeEducation === 'number' ? employeeEducation : employeeEducation.id;
        const url = `${this.employeeEducationUrl}/${id}`;

        return this.http.delete<EmployeeEducation>(url, this.httpOptions).pipe(
            tap(_ => this.log(`deleted Education id=${id}`)),
            catchError(this.handleError<EmployeeEducation>('deleteEducation'))
        );
    }

    /** DELETE: delete the Experience from the server */
    deleteExperience(
        employeeExperience: EmployeeExperience | number
    ): Observable<EmployeeExperience> {
        const id =
            typeof employeeExperience === 'number' ? employeeExperience : employeeExperience.id;
        const url = `${this.employeeExperienceUrl}/${id}`;

        return this.http.delete<EmployeeExperience>(url, this.httpOptions).pipe(
            tap(_ => this.log(`deleted Experience id=${id}`)),
            catchError(this.handleError<EmployeeExperience>('deleteExperience'))
        );
    }

    /** DELETE: delete the Contact from the server */
    deleteContact(employeeContact: EmployeeContact | number): Observable<EmployeeContact> {
        const id = typeof employeeContact === 'number' ? employeeContact : employeeContact.id;
        const url = `${this.employeeContactUrl}/${id}`;

        return this.http.delete<EmployeeContact>(url, this.httpOptions).pipe(
            tap(_ => this.log(`deleted Contact id=${id}`)),
            catchError(this.handleError<EmployeeContact>('deleteContact'))
        );
    }

    searchEmployees(term: string): Observable<EmployeeBasic[]> {
        if (!term.trim()) {
            return of([]);
        }
        return this.http.get<EmployeeBasic[]>(`${this.employeeBasicUrl}/?name=${term}`).pipe(
            tap(x =>
                x.length
                    ? this.log(`found employee matching "${term}`)
                    : this.log(`no employee matching "${term}"`)
            ),
            catchError(this.handleError<EmployeeBasic[]>('searchEmployees', []))
        );
    }
    // tslint:disable-next-line:typedef
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
