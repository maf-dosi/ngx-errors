var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { toArray } from './utils/toArray';
var NgxErrorsDirective = /** @class */ (function () {
    function NgxErrorsDirective(form) {
        this.form = form;
        this.ready = false;
    }
    Object.defineProperty(NgxErrorsDirective.prototype, "errors", {
        get: function () {
            if (!this.ready)
                return;
            return this.control.errors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxErrorsDirective.prototype, "hasErrors", {
        get: function () {
            return !!this.errors;
        },
        enumerable: true,
        configurable: true
    });
    NgxErrorsDirective.prototype.hasError = function (name, conditions) {
        return this.checkPropState('invalid', name, conditions);
    };
    NgxErrorsDirective.prototype.isValid = function (name, conditions) {
        return this.checkPropState('valid', name, conditions);
    };
    NgxErrorsDirective.prototype.getError = function (name) {
        if (!this.ready)
            return;
        return this.control.getError(name);
    };
    NgxErrorsDirective.prototype.checkPropState = function (prop, name, conditions) {
        var _this = this;
        if (!this.ready)
            return;
        var controlPropsState = !conditions ||
            toArray(conditions).every(function (condition) { return _this.control[condition]; });
        if (name.charAt(0) === '*') {
            return this.control[prop] && controlPropsState;
        }
        return prop === 'valid'
            ? !this.control.hasError(name)
            : this.control.hasError(name) && controlPropsState;
    };
    NgxErrorsDirective.prototype.checkStatus = function () {
        var control = this.control;
        var errors = control.errors;
        this.ready = true;
        if (!errors)
            return;
        for (var errorName in errors) {
            this.subject$.next({ control: control, errorName: errorName });
        }
    };
    NgxErrorsDirective.prototype.ngOnInit = function () {
        this.subject$ = new BehaviorSubject(null);
    };
    NgxErrorsDirective.prototype.ngOnChanges = function () {
        this.control = this.form.control.get(this.controlName);
    };
    NgxErrorsDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.checkStatus();
            _this.control.statusChanges.subscribe(_this.checkStatus.bind(_this), function () { return console.log('error'); }, function () { return console.log('completed'); });
        });
    };
    NgxErrorsDirective.prototype.ngOnDestroy = function () {
        this.subject$.complete();
    };
    __decorate([
        Input('ngxErrors'),
        __metadata("design:type", String)
    ], NgxErrorsDirective.prototype, "controlName", void 0);
    NgxErrorsDirective = __decorate([
        Directive({
            selector: '[ngxErrors]',
            exportAs: 'ngxErrors'
        }),
        __metadata("design:paramtypes", [FormGroupDirective])
    ], NgxErrorsDirective);
    return NgxErrorsDirective;
}());
export { NgxErrorsDirective };
//# sourceMappingURL=ngxerrors.directive.js.map