(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/forms', 'rxjs', 'rxjs/operators'], factory) :
    (factory((global.ngxerrors = {}),global.core,global.forms,global.rxjs,global.operators));
}(this, (function (exports,core,forms,rxjs,operators) { 'use strict';

    var toArray = function (value) {
        return Array.isArray(value) ? value : [value];
    };

    var __decorate = (window && window.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (window && window.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
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
            this.subject$ = new rxjs.BehaviorSubject(null);
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
            core.Input('ngxErrors'),
            __metadata("design:type", String)
        ], NgxErrorsDirective.prototype, "controlName", void 0);
        NgxErrorsDirective = __decorate([
            core.Directive({
                selector: '[ngxErrors]',
                exportAs: 'ngxErrors'
            }),
            __metadata("design:paramtypes", [forms.FormGroupDirective])
        ], NgxErrorsDirective);
        return NgxErrorsDirective;
    }());

    var __decorate$1 = (window && window.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$1 = (window && window.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (window && window.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
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
            this._states$ = new rxjs.Subject();
            this.states$ = this._states$.asObservable().pipe(operators.distinctUntilChanged());
            var errors = this.ngxErrors.subject$.pipe(operators.filter(Boolean), operators.filter(function (obj) { return !!~_this.errorNames.indexOf(obj.errorName); }));
            var states = this.states$.pipe(operators.map(function (states) { return _this.rules.every(function (rule) { return !!~states.indexOf(rule); }); }));
            this.subscription = rxjs.combineLatest(states, errors).subscribe(function (_a) {
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
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Object),
            __metadata$1("design:paramtypes", [Object])
        ], NgxErrorDirective.prototype, "ngxError", null);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Object),
            __metadata$1("design:paramtypes", [Object])
        ], NgxErrorDirective.prototype, "when", null);
        __decorate$1([
            core.Input(),
            __metadata$1("design:type", Boolean),
            __metadata$1("design:paramtypes", [Boolean])
        ], NgxErrorDirective.prototype, "forceCheck", null);
        __decorate$1([
            core.HostBinding('hidden'),
            __metadata$1("design:type", Boolean)
        ], NgxErrorDirective.prototype, "hidden", void 0);
        NgxErrorDirective = __decorate$1([
            core.Directive({
                selector: '[ngxError]'
            }),
            __param(0, core.Inject(core.forwardRef(function () { return NgxErrorsDirective; }))),
            __metadata$1("design:paramtypes", [NgxErrorsDirective])
        ], NgxErrorDirective);
        return NgxErrorDirective;
    }());

    var __decorate$2 = (window && window.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var dependencies = [NgxErrorsDirective, NgxErrorDirective];
    var NgxErrorsModule = /** @class */ (function () {
        function NgxErrorsModule() {
        }
        NgxErrorsModule = __decorate$2([
            core.NgModule({
                declarations: dependencies.slice(),
                exports: dependencies.slice()
            })
        ], NgxErrorsModule);
        return NgxErrorsModule;
    }());

    exports.NgxErrorDirective = NgxErrorDirective;
    exports.NgxErrorsDirective = NgxErrorsDirective;
    exports.NgxErrorsModule = NgxErrorsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=maf-dosi.ngxerrors.umd.js.map
