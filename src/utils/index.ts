export function getFileType(v: string): [string, string] {
  const arr = v.split(".");

  if (arr.length > 1) {
    const suffix = arr[arr.length - 1] || "";
    arr.pop();
    return [arr.join("."), `.${suffix}`];
  }
  return [v, ""];
}
