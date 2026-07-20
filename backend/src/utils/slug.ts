const alphabet =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const SLUG_LENGTH = 7;

export function generateSlug(): string {
  let slug = "";

  for (let i = 0; i < SLUG_LENGTH; i++) {
    const num = Math.floor(Math.random() * alphabet.length);
    slug += alphabet[num];
  }
  return slug;
}
