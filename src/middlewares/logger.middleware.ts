import {
  cyan,
  format,
  green,
  red,
  Request,
  Response,
  yellow,
} from "../../deps.ts";
const X_RESPONSE_TIME = "X-Response-Time";
const User_Agent = "User-Agent";

/** The standard logging function that processes and logs requests. */
const logger = async (
  { response, request }: { response: Response; request: Request },
  next: () => Promise<unknown>,
) => {
  await next();
  const responseTime = response.headers.get(X_RESPONSE_TIME);
  const User = request.headers.get(User_Agent);
  const status: number = response.status;
  const log_string = `[${
    format(new Date(Date.now()), "MM-dd-yyyy hh:mm:ss.SSS")
  }  Oak::logger] ${request.ip} "${request.method} ${request.url.pathname}" ${
    String(status)
  } ${User} ${responseTime}`;
  status >= 500
    ? console.log(`${red(log_string)}`) // red
    : status >= 400
    ? console.log(`${yellow(log_string)}`) // yellow
    : status >= 300
    ? console.log(`${cyan(log_string)}`) // cyan
    : status >= 200
    ? console.log(`${green(log_string)}`) // green
    : console.log(`${red(log_string)}`);
};

/** Response time calculator that also adds response time header. */
const responseTime = async (
  { response }: { response: Response },
  next: () => Promise<unknown>,
) => {
  const start = Date.now();
  await next();
  const ms: number = Date.now() - start;
  response.headers.set(X_RESPONSE_TIME, `${ms}ms`);
};

export default { logger, responseTime };
