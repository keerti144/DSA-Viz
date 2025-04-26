const getMergeSort = (array) => {
    const animations = [];
    if (array.length <= 1) return array;
  
    const mergeSortHelper = (array, left, right) => {
      if (left === right) return;
      const mid = Math.floor((left + right) / 2);
      mergeSortHelper(array, left, mid);
      mergeSortHelper(array, mid + 1, right);
      merge(array, left, mid, right);
    };
  
    const merge = (array, left, mid, right) => {
      const tempArray = [];
      let i = left;
      let j = mid + 1;
      let k = left;
  
      while (i <= mid && j <= right) {
        animations.push([i, j]); // Compare
        if (array[i] <= array[j]) {
          tempArray[k] = array[i];
          i++;
        } else {
          tempArray[k] = array[j];
          j++;
        }
        k++;
      }
  
      while (i <= mid) {
        tempArray[k] = array[i];
        i++;
        k++;
      }
  
      while (j <= right) {
        tempArray[k] = array[j];
        j++;
        k++;
      }
  
      for (let i = left; i <= right; i++) {
        array[i] = tempArray[i];
        animations.push([i, array[i]]); // Set height
      }
    };
  
    mergeSortHelper(array, 0, array.length - 1);
  
    return animations;
  };
  
  export default getMergeSort;
  