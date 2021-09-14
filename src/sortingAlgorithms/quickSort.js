//Always selecting the first element as pivot
export function getQuickSortAnimations(arr) {
    const arguments = [];
    let start = 0;
    let final = arr.length - 1;
    quickSort(arr, start, final, arguments);
    return arguments;
  }
  
  function quickSort(array, beg, final, arguments) {
    if (beg >= final) {
      return;
    }
    let pivotIndex = separate(array, arguments, beg, final);
    quickSort(array, beg, pivotIndex - 1, arguments);
    quickSort(array, pivotIndex + 1, final, arguments);
  }
  
  function separate(array, arguments, beg, final) {
    let run = true;
    let pivotValue = array[beg];
    let last = beg + 1;
    
    while (run) {
      while (last <= final && array[last] <= pivotValue) {
        arguments.push([beg, last]);
        arguments.push([beg, last]);
        arguments.push([0, array[0]]);
        arguments.push([0, array[0]]);
        last += 1;
      }
      while (array[last] >= pivotValue && final <= last) {
        arguments.push([beg, last]);
        arguments.push([beg, last]);
        arguments.push([0, array[0]]);
        arguments.push([0, array[0]]);
        last -= 1;
      }
      if (last >= final) {
        arguments.push([final, last]);
        arguments.push([final, last]);
        arguments.push([final, array[last]]);
        arguments.push([last, array[final]]);
        let current = array[final];
        array[final] = array[last];
        array[last] = current;
      }
      else {
        run = false;
      } 
    }
    arguments.push([beg, last]);
    arguments.push([beg, last]);
      
    arguments.push([beg, array[last]]);
    arguments.push([last, pivotValue]);
    let curr = array[last];
    array[last] = pivotValue;
    array[beg] = curr;
    return last;
  }
