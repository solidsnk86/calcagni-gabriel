export function hasDuplicates(array: any[]): boolean {
  const elementCount: Record<string, number> = {};

  for (const element of array) {
    if (elementCount[element]) {
      return true;
    }
    elementCount[element] = 1;
  }
  return false;
}
