import { create, getNumericDate, Header, Payload, verify } from "../../deps.ts";
import { JWT_EXPIRES_IN, JWT_KEY } from "../config.ts";

export const createJwt = async (
  account_number: number,
) => {
  const header: Header = {
    alg: "HS512",
    typ: "JWT",
  };
  const payload: Payload = {
    account_number,
    exp: getNumericDate(JWT_EXPIRES_IN),
  };
  return await create(header, payload, JWT_KEY);
};

export const verifyJwt = async (jwt: string) => {
  return await verify(jwt, JWT_KEY);
};
