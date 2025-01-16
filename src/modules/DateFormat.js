const date = new Date();

export function getFullDate() {
  return date.toISOString().split('T')[0];
}