export function getHeapSortAnimations(array) {
    const arguments = [];
    heapSort(array, arguments);
    return arguments;
  }
  
  function heaping(arr, index, length, animations) {
    var max_index = index;
    var rightIndex = 2 * index + 2;
    var leftIndex = 2 * index + 1;
      
    if (rightIndex < length && arr[rightIndex] > arr[max_index]) {
      //repeat operations twice 
      animations.push([rightIndex, max_index]);
      animations.push([rightIndex, max_index]);
      animations.push([0, arr[0]]);
      animations.push([0, arr[0]]);
      max_index = rightIndex; 
    }
    if (leftIndex < length && arr[leftIndex] > arr[max_index]) {
      //repeat operations twice 
      animations.push([leftIndex, max_index]);
      animations.push([leftIndex, max_index]);
      animations.push([0, arr[0]]);
      animations.push([0, arr[0]]);
      max_index = leftIndex; 
    }
    
    if (max_index !== index) {
      swaping(arr, index, max_index, animations);
      heaping(arr, max_index, length, animations); 
    }
  }

function heapSort(array, animation) {
    var length = array.length;
    for (var i = Math.floor(length / 2); i >= 0; i--) {
      heaping(array, i, length, animation);
    }
  
    for (i = length - 1; i > 0; i--) {
      swaping(array, 0, i, animation);
      length--;
      heaping(array, 0, length, animation);
    }
  }
  
function swaping(arr, firstIndex, lastIndex, animation) {
    animation.push([firstIndex, lastIndex]);
    animation.push([firstIndex, lastIndex]);
    animation.push([firstIndex, arr[lastIndex]]);
    animation.push([lastIndex, arr[firstIndex]]);
    var curr = arr[firstIndex];
    arr[firstIndex] = arr[lastIndex];
    arr[lastIndex] = curr;
  }
