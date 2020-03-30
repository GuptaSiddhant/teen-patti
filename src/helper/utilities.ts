export const getDimInREM = (px: number) => px / 16 + "rem";

export const arrayRotate = (
  arr: any[],
  reverse: boolean = false,
  times: number = 1
) => {
  for (let i = 0; i < times; i++)
    if (reverse) arr.unshift(arr.pop());
    else arr.push(arr.shift());
  return arr;
};
