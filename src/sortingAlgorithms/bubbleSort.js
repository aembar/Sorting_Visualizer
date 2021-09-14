//Loop through the array, shifting the largest element to the end each time
export function getBubbleSortAnimations(arr) {
    const animate = [];
    bubbleSort(arr, animate);
    return animate;
  }
  
  function bubbleSort(arr, animation) {
    let finish = arr.length - 1;
    while (finish >= 1) {
      for (let i = 0; i < finish; i++) {
        if (arr[i] > arr[i + 1]) {
          animation.push([i, i + 1]);
          animation.push([i, i + 1]);
          animation.push([i, arr[i + 1]]);
          animation.push([i + 1, arr[i]]);
          let curr = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = curr;
        }
      }
      finish--;
    }
  }
