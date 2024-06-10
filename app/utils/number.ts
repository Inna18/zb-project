import Comment from '../service/useCommentApi';

export const numberWithCommas = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const calcCount = (list: Comment[]) => {
  if (!list || list.length <= 0) return [];
  let tempCountArr = [];
  for (let i = 5; i >= 1; i--) {
    let num = list.filter((comment) => comment.rating === i).length;
    tempCountArr.push({ value: i, count: num });
  }
  return tempCountArr;
};

export const calcAverage = (list: Comment[]) => {
  if (!list || list.length <= 0) return 0;
  let calc =
    list.reduce((sum, value) => {
      return sum + value.rating!;
    }, 0) / list.length;
  return calc;
};
