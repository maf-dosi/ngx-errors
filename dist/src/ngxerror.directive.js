var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Directive, forwardRef, HostBinding, Inject, Input } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { NgxErrorsDirective } from './ngxerrors.directive';
import { toArray } from './utils/toArray';
var NgxErrorDirective = /** @class */ (function () {
    function NgxErrorDirective(ngxErrors) {
        this.ngxErrors = ngxErrors;
        this.hidden = true;
        this.rules = [];
        this.errorNames = [];
    }
    Object.defineProperty(NgxErrorDirective.prototype, "ngxError", {
        set: function (value) {
            this.errorNames = toArray(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxErrorDirective.prototype, "when", {
        set: function (value) {
            this.rules = toArray(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxErrorDirective.prototype, "forceCheck", {
        set: function (value) {
            this.forceRule = value;
        },
        enumerable: true,
        configurable: true
    });
    NgxErrorDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._states$ = new Subject();
        this.states$ = this._states$.asObservable().pipe(distinctUntilChanged());
        var errors = this.ngxErrors.subject$.pipe(filter(Boolean), filter(function (obj) { return !!~_this.errorNames.indexOf(obj.errorName); }));
        var states = this.states$.pipe(map(function (states) { return _this.rules.every(function (rule) { return !!~states.indexOf(rule); }); }));
        this.subscription = combineLatest(states, errors).subscribe(function (_a) {
            var states = _a[0], errors = _a[1];
            _this.hidden = !(states && errors.control.hasError(errors.errorName));
        });
    };
    NgxErrorDirective.prototype.ngDoCheck = function () {
        var _this = this;
        this._states$.next(this.rules.filter(function (rule) { return _this.ngxErrors.control[rule] || _this.forceRule; }));
    };
    NgxErrorDirective.prototype.ngOnDestroy = function () {
        this._states$.complete();
        this.subscription.unsubscribe();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NgxErrorDirective.prototype, "ngxError", null);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NgxErrorDirective.prototype, "when", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NgxErrorDirective.prototype, "forceCheck", null);
    __decorate([
        HostBinding('hidden'),
        __metadata("design:type", Boolean)
    ], NgxErrorDirective.prototype, "hidden", void 0);
    NgxErrorDirective = __decorate([
        Directive({
            selector: '[ngxError]'
        }),
        __param(0, Inject(forwardRef(function () { return NgxErrorsDirective; }))),
        __metadata("design:paramtypes", [NgxErrorsDirective])
    ], NgxErrorDirective);
    return NgxErrorDirective;
}());
export { NgxErrorDirective };
//# sourceMappingURL=ngxerror.directive.js.map