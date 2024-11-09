"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
const common_1 = require("@nestjs/common");
const admin_guard_1 = require("../guards/admin.guard");
const jwt_guard_1 = require("../guards/jwt.guard");
function Auth(role) {
    return (0, common_1.applyDecorators)(role === 'Admin'
        ? (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, admin_guard_1.OnlyAdminGuard)
        : (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard));
}
//# sourceMappingURL=auth.decorators.js.map