import dayjs from "dayjs";

export function getFileType(v: string): [string, string] {
  const arr = v.split(".");

  if (arr.length > 1) {
    const suffix = arr[arr.length - 1] || "";
    arr.pop();
    return [arr.join("."), `.${suffix}`];
  }
  return [v, ""];
}

export const RULES: Rule[] = [
  {
    ruleName: "保留整数",
    rule: (val: number) => {
      if (val) return val.toFixed(0);
      return val;
    },
  },
  {
    ruleName: "保留一位小数",
    rule: (val: number) => {
      if (val) return val.toFixed(1);
      return val;
    },
  },
  {
    ruleName: "保留两位小数",
    rule: (val: number) => {
      if (val) return val.toFixed(2);
      return val;
    },
  },
  {
    ruleName: "日期：2023/03/01",
    rule: (val: string) => {
      if (val) return dayjs(val)?.format("YYYY/MM/DD");
      return val;
    },
  },
  {
    ruleName: "日期：2023-03-01",
    rule: (val: string) => {
      if (val) return dayjs(val)?.format("YYYY-MM-DD");
      return val;
    },
  },
  {
    ruleName: "日期：2023/03/01 13:30",
    rule: (val: string) => {
      if (val) return dayjs(val)?.format("YYYY/MM/DD HH:mm");
      return val;
    },
  },
  {
    ruleName: "日期：2023-03-01 13:30",
    rule: (val: string) => {
      if (val) return dayjs(val)?.format("YYYY-MM-DD HH:mm");
      return val;
    },
  },
];
