"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aliCloudDriveService_1 = require("./lib/aliCloudDriveService");
const ali = new aliCloudDriveService_1.default('');
ali.getList('root').then((res) => {
    console.log(res);
});
// ali.getUser();
//# sourceMappingURL=app.js.map