const getBubbleSort = (array) => {
    const animations = [];
    if (array.length <= 1) return array;
  
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          animations.push([j, j + 1]); // Swap colors
          animations.push([j, j + 1]); // Swap back
          animations.push([j, array[j + 1]]); // Set height
          let temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        } else {
          animations.push([j, j]); // No change
          animations.push([j, j]);
          animations.push([j, array[j]]);
        }
      }
    }
  
    animations.push([array.length - 1, array.length - 1]);
    animations.push([array.length - 1, array.length - 1]);
    animations.push([array.length - 1, array[array.length - 1]]);
  
    return animations;
  };
  
  export default getBubbleSort;
  