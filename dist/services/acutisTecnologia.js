"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.access = void 0;
const axios_1 = __importDefault(require("axios"));
const access = (deviceId, status) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield axios_1.default.post('http://tuya.acutistecnologia.com/access', {
        // deviceId: 'ebe2ff6900c7a53401ln3q'
        deviceId, status, accessKey: 'CTA_ACT_TCN_@2023'
    })).data;
});
exports.access = access;
