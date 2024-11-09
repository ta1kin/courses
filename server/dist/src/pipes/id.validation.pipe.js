"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
class IdValidationPipe {
    transform(val, meta) {
        if (meta.type !== 'param')
            return val;
        if (!(0, uuid_1.validate)(val))
            throw new common_1.BadRequestException('Неверный формат ID');
        return val;
    }
}
exports.IdValidationPipe = IdValidationPipe;
//# sourceMappingURL=id.validation.pipe.js.map