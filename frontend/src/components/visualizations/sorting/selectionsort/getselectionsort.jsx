const getSelectionSort = (array) => {
    const animations = [];
    for (let i = 0; i < array.length - 1; i++) {
      let minIdx = i;
  
      for (let j = i + 1; j < array.length; j++) {
        animations.push([minIdx, j]); // Compare
        if (array[j] < array[minIdx]) {
          minIdx = j;
        }
      }
  
      if (minIdx !== i) {
        animations.push([i, minIdx]); // Swap
        const temp = array[i];
        array[i] = array[minIdx];
        array[minIdx] = temp;
      }
    }
  
    return animations;
  };
  
  export default getSelectionSort;
  