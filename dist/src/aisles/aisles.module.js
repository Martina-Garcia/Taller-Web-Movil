"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AislesModule = void 0;
const common_1 = require("@nestjs/common");
const aisles_service_1 = require("./aisles.service");
const aisles_controller_1 = require("./aisles.controller");
let AislesModule = class AislesModule {
};
exports.AislesModule = AislesModule;
exports.AislesModule = AislesModule = __decorate([
    (0, common_1.Module)({
        controllers: [aisles_controller_1.AislesController],
        providers: [aisles_service_1.AislesService],
    })
], AislesModule);
//# sourceMappingURL=aisles.module.js.map