import {
  Directive,
  DoCheck,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {combineLatest, Observable, Subject, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';
import {ErrorOptions} from './ngxerrors';
import {NgxErrorsDirective} from './ngxerrors.directive';
import {toArray} from './utils/toArray';

@Directive({
  selector: '[ngxError]'
})
export class NgxErrorDirective implements OnInit, OnDestroy, DoCheck {
  @Input()
  set ngxError(value: ErrorOptions) {
    this.errorNames = toArray(value);
  }

  @Input()
  set when(value: ErrorOptions) {
    this.rules = toArray(value);
  }

  @Input()
  set forceCheck(value: boolean) {
    this.forceRule = value;
  }

  @HostBinding('hidden') public hidden: boolean = true;

  private rules: string[] = [];
  private errorNames: string[] = [];
  private subscription: Subscription;
  private _states$: Subject<string[]>;
  private states$: Observable<string[]>;
  private forceRule: boolean;

  constructor(
    @Inject(forwardRef(() => NgxErrorsDirective))
    private ngxErrors: NgxErrorsDirective
  ) {}

  ngOnInit() {
    this._states$ = new Subject<string[]>();
    this.states$ = this._states$.asObservable().pipe(distinctUntilChanged());

    const errors = this.ngxErrors.subject$.pipe(
      filter(Boolean),
      filter(obj => !!~this.errorNames.indexOf(obj.errorName))
    );

    const states = this.states$.pipe(
      map(states => this.rules.every(rule => !!~states.indexOf(rule)))
    );

    this.subscription = combineLatest(states, errors).subscribe(
      ([states, errors]) => {
        this.hidden = !(states && errors.control.hasError(errors.errorName));
      }
    );
  }

  ngDoCheck() {
    this._states$.next(
      this.rules.filter(rule => (this.ngxErrors.control as any)[rule] || this.forceRule)
    );
  }

  ngOnDestroy() {
    this._states$.complete();
    this.subscription.unsubscribe();
  }
}
