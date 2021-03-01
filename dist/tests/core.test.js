var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
describe('jscore', () => {
    describe('initialization', () => {
        test('Dependency check fails', () => __awaiter(this, void 0, void 0, function* () {
        }));
        test('Invalid config fails', () => __awaiter(this, void 0, void 0, function* () {
        }));
    });
    describe('module management', () => {
        describe('start', () => {
            test('Errors gracefully on module failure', () => __awaiter(this, void 0, void 0, function* () {
            }));
        });
    });
    describe('lib management', () => {
        describe('start', () => {
            test('Errors gracefully on module failure', () => __awaiter(this, void 0, void 0, function* () {
            }));
        });
    });
    describe('store management', () => {
        describe('start', () => {
            test('Errors gracefully on module failure', () => __awaiter(this, void 0, void 0, function* () {
            }));
        });
    });
});
//# sourceMappingURL=core.test.js.map