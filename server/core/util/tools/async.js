export const asyncForEach = async (array, callback, props) => {
  let result = [];
  for (let index = 0; index < array.length; index++) {
    result.push(await callback(array[index], props, index, array));
  }

  return result;
};
