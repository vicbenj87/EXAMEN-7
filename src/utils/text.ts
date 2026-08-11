// Utilidades de normalización de texto para comparar respuestas del usuario

export function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

export function splitCommaList(value: string): string[] {
  return value
    .split(/[,;/]| y /gi)
    .map((v) => normalize(v))
    .filter(Boolean);
}

export function textMatches(input: string, accepted: string[]): boolean {
  const normalizedInput = normalize(input);
  if (!normalizedInput) return false;
  return accepted.some((option) => {
    const normalizedOption = normalize(option);
    return (
      normalizedInput === normalizedOption ||
      normalizedInput.includes(normalizedOption) ||
      normalizedOption.includes(normalizedInput)
    );
  });
}
