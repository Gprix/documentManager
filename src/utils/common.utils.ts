export const getEnv = (key: string) => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing environment variable: ${key}`);
  return value;
};

export const getLastFromPathname = (pathname: string) => {
  const splitted = pathname.split("/");
  return splitted[splitted.length - 1];
};
