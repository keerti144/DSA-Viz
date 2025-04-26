const getInsertionSort = (array) => {
    const animations = [];
    if (array.length <= 1) return array;
  
    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;
  
      // Push the indices being compared and then swapped
      while (j >= 0 && array[j] > key) {
        animations.push([j, j + 1]);  // Compare
        animations.push([j, j + 1]);  // Swap back
        animations.push([j, array[j]]); // Swap values
  
        array[j + 1] = array[j];
        j = j - 1;
      }
      array[j + 1] = key;
      animations.push([j + 1, key]); // Set height
    }
  
    return animations;
  };
  
  export default getInsertionSort;
  