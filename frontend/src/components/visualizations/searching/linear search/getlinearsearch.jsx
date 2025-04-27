const getLinearSearch = (array, target) => {
    const animations = [];
  
    for (let i = 0; i < array.length; i++) {
      animations.push(i);
      if (array[i] === target) break;
    }
  
    return animations;
  };
  
  export default getLinearSearch;
  