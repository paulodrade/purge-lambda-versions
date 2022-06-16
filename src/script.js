"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.PLV = void 0;
var all_1 = require("aws-sdk/clients/all");
var PLV = /** @class */ (function () {
    function PLV(options) {
        if (options === void 0) { options = {}; }
        this.constructorOptions = {
            KEEP_VERSIONS: 10,
            AWS_REGION: 'us-east-1'
        };
        this.constructorOptions = __assign(__assign({}, this.constructorOptions), options);
        this.lambda = new all_1.Lambda({
            region: this.constructorOptions.AWS_REGION
        });
    }
    /**
     * Method to recursively get all versions by function name
     */
    PLV.prototype.listVersionsByFunction = function (functionName, versionsList, nextMarker) {
        if (versionsList === void 0) { versionsList = []; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.lambda.listVersionsByFunction({
                            FunctionName: functionName,
                            Marker: nextMarker || null
                        }, function (err, _a) {
                            var NextMarker = _a.NextMarker, Versions = _a.Versions;
                            return __awaiter(_this, void 0, void 0, function () {
                                var _i, Versions_1, version, e_1;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _b.trys.push([0, 3, , 4]);
                                            if (err) {
                                                throw err;
                                            }
                                            for (_i = 0, Versions_1 = Versions; _i < Versions_1.length; _i++) {
                                                version = Versions_1[_i];
                                                versionsList.push(version);
                                            }
                                            if (!NextMarker) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.listVersionsByFunction(functionName, versionsList, NextMarker)];
                                        case 1:
                                            _b.sent();
                                            _b.label = 2;
                                        case 2:
                                            resolve(versionsList);
                                            return [3 /*break*/, 4];
                                        case 3:
                                            e_1 = _b.sent();
                                            reject(e_1);
                                            return [3 /*break*/, 4];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            });
                        });
                    })];
            });
        });
    };
    /**
     * Method to recursively get all aliases by function name
     */
    PLV.prototype.listAliasesByFunction = function (functionName, aliasesList, nextMarker) {
        if (aliasesList === void 0) { aliasesList = []; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.lambda.listAliases({
                            FunctionName: functionName,
                            Marker: nextMarker || null
                        }, function (err, _a) {
                            var NextMarker = _a.NextMarker, Aliases = _a.Aliases;
                            return __awaiter(_this, void 0, void 0, function () {
                                var _i, Aliases_1, alias, e_2;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _b.trys.push([0, 3, , 4]);
                                            if (err) {
                                                throw err;
                                            }
                                            for (_i = 0, Aliases_1 = Aliases; _i < Aliases_1.length; _i++) {
                                                alias = Aliases_1[_i];
                                                aliasesList.push(alias.FunctionVersion);
                                            }
                                            if (!NextMarker) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.listAliasesByFunction(functionName, aliasesList, NextMarker)];
                                        case 1:
                                            _b.sent();
                                            _b.label = 2;
                                        case 2:
                                            resolve(aliasesList);
                                            return [3 /*break*/, 4];
                                        case 3:
                                            e_2 = _b.sent();
                                            reject(e_2);
                                            return [3 /*break*/, 4];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            });
                        });
                    })];
            });
        });
    };
    /**
     * Method to delete a version of a function
     */
    PLV.prototype.deleteFunctionVersion = function (functionName, version) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.lambda.deleteFunction({
                            FunctionName: functionName,
                            Qualifier: version
                        }, function (err, data) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(data);
                            }
                        });
                    })];
            });
        });
    };
    /**
     *
     */
    PLV.prototype.clearVersionsFunction = function (functionOpt) {
        return __awaiter(this, void 0, void 0, function () {
            var prefix, awsRegion, keepVersions, functionName, versions, aliases, sorted, deletingPromises, index, _i, sorted_1, version, e_3, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prefix = '---';
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        awsRegion = functionOpt.AWS_REGION || 'us-east-1';
                        console.log(prefix, '[PLV][USING REGION]', awsRegion);
                        keepVersions = functionOpt.KEEP_VERSIONS || 10;
                        console.log(prefix, '[PLV][KEEP VERSIONS]', keepVersions);
                        functionName = functionOpt.FUNCTION_NAME;
                        console.log(prefix, '[PLV][FUNCTION NAME]', functionName);
                        if (!functionName) {
                            throw new Error("The 'functionName' must be provided.");
                        }
                        return [4 /*yield*/, this.listVersionsByFunction(functionName)];
                    case 2:
                        versions = _a.sent();
                        // console.log(prefix, '[FUNCTION VERSIONS]', versions);
                        console.log(prefix, '[PLV][VERSIONS.LENGTH]', versions.length);
                        return [4 /*yield*/, this.listAliasesByFunction(functionName)];
                    case 3:
                        aliases = _a.sent();
                        // console.log(prefix, '[FUNCTION ALIASES]', aliases);
                        console.log(prefix, '[PLV][ALIASES.ENGTH]', aliases.length);
                        sorted = versions.sort(function (v1, v2) { return v1.LastModified < v2.LastModified ? 1 : v1.LastModified > v2.LastModified ? -1 : 0; });
                        deletingPromises = [];
                        index = 0;
                        console.log('-----------------------------------------------');
                        for (_i = 0, sorted_1 = sorted; _i < sorted_1.length; _i++) {
                            version = sorted_1[_i];
                            if (keepVersions > 0 || version.Version === '$LATEST' || aliases.indexOf(version.Version) >= 0) {
                                console.log(prefix + prefix, index, '[PLV][SKIPPING]', version.Version, { isAlias: aliases.indexOf(version.Version) >= 0 });
                                keepVersions--;
                            }
                            else {
                                console.log(prefix + prefix, index, '[PLV][DELETING]', version.Version);
                                deletingPromises.push(this.deleteFunctionVersion(functionName, version.Version));
                            }
                            index++;
                        }
                        console.log('-----------------------------------------------');
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, Promise.all(deletingPromises)];
                    case 5:
                        _a.sent();
                        console.log(prefix, '[PLV][DONE DELETING VERSIONS FOR FUNCTION]', functionName);
                        return [3 /*break*/, 7];
                    case 6:
                        e_3 = _a.sent();
                        console.error(prefix, '[PLV][ERROR DELETING VERSION]', e_3);
                        return [3 /*break*/, 7];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        e_4 = _a.sent();
                        console.error(prefix, '[PLV][CLEANING VERSIONS ERROR]', e_4);
                        throw e_4;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Method to start the cleaning of process
     */
    PLV.prototype.clearFunction = function (functionOpt) {
        return __awaiter(this, void 0, void 0, function () {
            var e_5, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        console.log('[PLV][STARTED CLEANING]');
                        console.log('###################################################################');
                        console.log('[PLV][CLEANING FUNCTION]', functionOpt.FUNCTION_NAME);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.clearVersionsFunction(functionOpt)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_5 = _a.sent();
                        throw e_5;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_6 = _a.sent();
                        console.error('[PLV][CLEANING STOPPED DUE ERROR]', e_6);
                        throw e_6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Method to deal with multiple functions
     */
    PLV.prototype.clearFunctions = function (functionsOpt) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, functionsOpt_1, functionOpt, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        console.log('[PLV][STARTED MULTIPLE CLEANING]');
                        console.log('###################################################################');
                        _i = 0, functionsOpt_1 = functionsOpt;
                        _a.label = 1;
                    case 1:
                        if (!(_i < functionsOpt_1.length)) return [3 /*break*/, 4];
                        functionOpt = functionsOpt_1[_i];
                        return [4 /*yield*/, this.clearFunction(functionOpt)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_7 = _a.sent();
                        throw e_7;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return PLV;
}());
exports.PLV = PLV;
