export const classComb = (...className:string[]) => className.join(" ");

export const textLimit = (str:string, max_size:number = 250) => {
  if (str.length > max_size) return (str.slice(0, max_size) + "...");
  return str;
};
