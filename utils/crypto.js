import env from "../env";
import { isEmpty } from "./index";
import crypto from "crypto";
function formatRequestBody(data) {
	data = convertToNumericRecursive(data)
	data = sortObjectKeys(data);
    return JSON.stringify(data).replace(/\s+/g, "");
}

function generateXSk(data) {
	data += "vk666!*@#?.#@"
	// console.log(data)
    return crypto
        .createHmac("sha256", env.cryptoSecret)
        .update(data)
        .digest("hex");
}

function getSignature(dataDict) {
    const formattedData = formatRequestBody(dataDict);
    return generateXSk(formattedData);
}

function convertToNumericRecursive(obj) {
    if(isEmpty(obj)) return "";
    if (Array.isArray(obj)) {
        return obj.map(value => convertToNumericRecursive(value));
    } else if (typeof obj === 'object' && obj !== null) {
        const newObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                newObj[key] = convertToNumericRecursive(obj[key]);
            }
        }
        return newObj;
    } else if (!isNaN(obj) && obj !== '') {
        // 对于大数字保持为字符串
        if (obj.toString().length > 15) {
            return obj.toString(); // 保持长数字为字符串
        }
        return obj.toString().includes('.') ? parseFloat(obj) : parseInt(obj);
    } else {
        return obj;
    }
}

/**
 * 对对象的键进行排序
 */
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