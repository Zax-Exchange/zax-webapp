type Env = "development" | "stage" | "production";

export const getEnv = (): Env => {
  const url = window.location.host;
  if (url === "app.zaxexchange.com") {
    return "production";
  } else if (url === "stg.app.zaxexchange.com") {
    return "stage"
  }
  return "development"
}