import getProfileJWT from "./getProfileJWT";

export default async function  getProfileContext() { 
    const { JWT } = await getProfileJWT();
    return { req: { headers: { authorization: `Bearer ${JWT}` }, }, };
}