export const headers: object = {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": "Content-Type,x-requested-with",
    "Access-Control-Allow-Methods": "POST,GET,OPTIONS",
    "Access-Control-Allow-Origin": `https://${process.env.DOMAIN}/`,
    "X-Frame-Options": "SAMEORIGIN",
    "X-Requested-With": "*",
    "X-Xss-Protection": "1; mode=block",
};
