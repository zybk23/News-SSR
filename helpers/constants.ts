export const baseApiUrl = "https://newsapi.org/v2";
export const apiKey = "c2ea8b306ade46959013772f6e5ca9bd";

export const INTERSECTION_THRESHOLD = 5;
export const LOAD_DELAY_MS = 100;

export const makeCapitalizeFirstLetter = (arr: any) => {
  const capitalizedArr: any = [];

  arr.forEach((x: any) => {
    const firstLetter = x.charAt(0);

    const firstLetterCap = firstLetter.toUpperCase();

    const remainingLetters = x.slice(1);

    const capitalizedWord = firstLetterCap + remainingLetters;
    capitalizedArr.push(capitalizedWord);
  });
  return capitalizedArr;
};

export const makeCapitalizeFirstLetterSingleItem = (item: string) => {
  const firstLetter = item.charAt(0);

  const firstLetterCap = firstLetter.toUpperCase();

  const remainingLetters = item.slice(1);

  const capitalizedWord = firstLetterCap + remainingLetters;
  return capitalizedWord;
};
