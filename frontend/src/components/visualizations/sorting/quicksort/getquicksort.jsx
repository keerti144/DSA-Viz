const getQuickSort = (array) => {
    const animations = [];
    if (array.length <= 1) return array;
  
    const quickSortHelper = (array, low, high) => {
      if (low < high) {
        const pi = partition(array, low, high);
        quickSortHelper(array, low, pi - 1);
        quickSortHelper(array, pi + 1, high);
      }
    };
  
    const partition = (array, low, high) => {
      const pivot = array[high];
      let i = low - 1;
  
      for (let j = low; j < high; j++) {
        animations.push([i, j]); // Compare
        if (array[j] < pivot) {
          i++;
          animations.push([i, j]); // Swap
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
      }
  
      animations.push([i + 1, high]); // Swap pivot
      const temp = array[i + 1];
      array[i + 1] = array[high];
      array[high] = temp;
  
      return i + 1;
    };
  
    quickSortHelper(array, 0, array.length - 1);
    return animations;
  };
  
  export default getQuickSort;
  