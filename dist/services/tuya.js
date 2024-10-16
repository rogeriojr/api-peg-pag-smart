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
exports.controlDevice = void 0;
const axios_1 = __importDefault(require("axios"));
const clientId = 'pxatjt7e5f3cs7dvpwxj';
const clientSecret = '532035cf3f2f43cd9edc35bdd9208b4b';
const endpoint = 'https://openapi.tuyaus.com/v1.0/token';
const getToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(endpoint, {
        params: {
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
        },
    });
    return response.data;
});
const controlDevice = (deviceId, command) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenData = yield getToken();
    // const accessToken = tokenData.result.access_token;
    console.log("tokenData >", tokenData);
    // const response = await axios.post(`https://openapi.tuyaus.com/v1.0/devices/${deviceId}/commands`, {
    //     commands: [{
    //         code: 'switch_1', // Certifique-se de que 'switch_1' é o Data Point correto para controlar a trava
    //         value: command,
    //     }]
    // }, {
    //     headers: {
    //         'Authorization': `Bearer ${accessToken}`,
    //     }
    // });
    // return response.data;
    return { success: true };
});
exports.controlDevice = controlDevice;
