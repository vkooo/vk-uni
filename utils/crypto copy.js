import env from "../env";
import crypto from "crypto";
function formatRequestBody(data) {
    return JSON.stringify(data).replace(/\s+/g, "");
}
function generateXSk(data) {
	data += "vk666!*@#?.#@"
    return crypto
        .createHmac("sha256", env.cryptoSecret)
        .update(data)
        .digest("hex");
}

function getSignature(dataDict) {
    const formattedData = formatRequestBody(dataDict);
    return generateXSk(formattedData);
}

export default getSignature;