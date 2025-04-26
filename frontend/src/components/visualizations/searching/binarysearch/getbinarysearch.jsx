const getBinarySearch = (array, target) => {
    const animations = [];
    let left = 0;
    let right = array.length - 1;
  
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      animations.push(mid);
  
      if (array[mid] === target) break;
      else if (array[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
  
    return animations;
  };
  
  export default getBinarySearch;
  