export function getMergeSortAnimations(arr) {
    const arguments = [];
    if (arr.length <= 1) return arr;
    const auxArray = arr.slice();
    var startIndex = 0 
    var endIndex = arr.length - 1
    mergeSort(arr, startIndex, endIndex, auxArray, arguments);
    return arguments;
  }
  
  function mergeSort(arr, startIndex, endIndex, auxArray, arguments,) {
    if (startIndex === endIndex) return;
    const midIndex = Math.floor((startIndex + endIndex) / 2);
    mergeSort(auxArray, startIndex, midIndex, arr, arguments);
    mergeSort(auxArray, midIndex + 1, endIndex, arr, arguments);
    Merge(arr, startIndex, midIndex, endIndex, auxArray, arguments);
  }
  
  function Merge(arr, startIndex, midIndex, endIndex, auxArray, arguments,) {
    let a = startIndex;
    let b = startIndex;
    let c = midIndex + 1;
    while (a <= midIndex && c <= endIndex) {
      arguments.push([a, c]);
      arguments.push([a, c]);
      if (auxArray[a] > auxArray[c]) {
        arguments.push([b, auxArray[c]]);
        arr[b++] = auxArray[c++];
      }
      else {
        arguments.push([b, auxArray[a]]);
        arr[b++] = auxArray[a++];
      } 
    }
    while (c <= midIndex) {
      arguments.push([c, c]);
      arguments.push([c, c]);
      arr[b++] = auxArray[c++];
      arguments.push([b, auxArray[c]]);
    }
    while (a <= midIndex) {
      arguments.push([a, a]);
      arguments.push([a, a]);
      arr[b++] = auxArray[a++];
      arguments.push([b, auxArray[a]]);
    }
    
  }
