"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAisleDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_aisle_dto_1 = require("./create-aisle.dto");
class UpdateAisleDto extends (0, mapped_types_1.PartialType)(create_aisle_dto_1.CreateAisleDto) {
}
exports.UpdateAisleDto = UpdateAisleDto;
//# sourceMappingURL=update-aisle.dto.js.map