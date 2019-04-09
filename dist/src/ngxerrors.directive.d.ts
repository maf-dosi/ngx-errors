import { AfterViewInit, OnChanges, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ErrorDetails, ErrorOptions } from './ngxerrors';
export declare class NgxErrorsDirective implements OnChanges, OnDestroy, AfterViewInit {
    private form;
    private readonly controlName;
    subject$: BehaviorSubject<ErrorDetails>;
    control: AbstractControl;
    private ready;
    constructor(form: FormGroupDirective);
    readonly errors: import("@angular/forms/src/directives/validators").ValidationErrors;
    readonly hasErrors: boolean;
    hasError(name: string, conditions: ErrorOptions): boolean;
    isValid(name: string, conditions: ErrorOptions): boolean;
    getError(name: string): any;
    private checkPropState;
    private checkStatus;
    ngOnInit(): void;
    ngOnChanges(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
