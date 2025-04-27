import env from "../env";
import { isEmpty, deepClone } from "./index";
import crypto from "crypto";

function formatRequestBody(data) {
	data = normalizeData(deepClone(data));
	data = sortObjectKeys(data);
    return JSON.stringify(data, replacer).replace(/\s+/g, "");
}

function replacer(key, value) {
    if (value === undefined) {
        return null;
    }
    return value;
}

function generateXSk(data) {
	data += "vk666!*@#?.#@";
	console.log(data);
    return crypto
        .createHmac("sha256", env.cryptoSecret)
        .update(data)
        .digest("hex");
}

function getSignature(dataDict) {
	console.log(dataDict);
    const formattedData = formatRequestBody(dataDict);
    return generateXSk(formattedData);
}

function normalizeData(obj) {
    if (obj === undefined) return null;
    if (obj === null) return null;
    if (typeof obj === 'boolean') return obj;
    if (Array.isArray(obj)) {
        return obj.map(item => normalizeData(item));
    }
    if (typeof obj === 'object') {
        const result = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key] = normalizeData(obj[key]);
            }
        }
        return result;
    }
    if (typeof obj === 'string') {
        const trimmed = obj.trim();
        if (trimmed === '') return '';
        if (!isNaN(trimmed)) {
            if (trimmed.length > 15) {
                return trimmed; // 超长数字保留字符串
            }
            return trimmed.includes('.') ? parseFloat(trimmed) : parseInt(trimmed, 10);
        }
        return obj;
    }
    return obj;
}

function sortObjectKeys(obj) {
    if (typeof obj !== "object" || obj === null) return obj;

    if (Array.isArray(obj)) {
        return obj.map((item) => sortObjectKeys(item));
    }

    const sortedKeys = Object.keys(obj).sort();
    const newObj = {};
    for (const key of sortedKeys) {
        newObj[key] = sortObjectKeys(obj[key]);
    }
    return newObj;
}

export default getSignature;