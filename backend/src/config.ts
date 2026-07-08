export const config = {
  databaseUrl: getRequiredEnv("DATABASE_URL"),
  port: getPort("PORT"),
};

function getRequiredEnv(name: string): string {
  const envValue = process.env[name]?.trim();

  if (!envValue) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return envValue;
}

function getPort(name: string): number {
  const envValue = process.env[name];

  // PORT is optional
  if (!envValue) {
    return 3000;
  }

  const port = Number(envValue);

  if (Number.isNaN(port)) {
    throw new Error(`Environment variable ${name} must be a number.`);
  }

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(
      `Environment variable ${name} must be an integer between 1 and 65535.`,
    );
  }

  return port;
}
