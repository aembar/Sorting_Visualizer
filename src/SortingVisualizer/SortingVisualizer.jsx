import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';

import './SortingVisualizer.css';
import styled, { css } from 'styled-components';

const ANIMATION_SPEED_MS = 3;

const NUMBER_OF_ARRAY_BARS = 310;

const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray(){
        const array = [];
        for(let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5,730));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }

    quickSort() {

        
    }

    heapSort() {}

    bubbleSort() {}

    render(){
        const {array} = this.state;
        return (
            <>
            <Button onClick={() => this.resetArray()} style={{float: 'top'}}>Generate New Array</Button>
            <Button onClick={() => this.mergeSort()} style={{float: 'top'}}> Merge Sort </Button>
            <Button onClick={() => this.quickSort()} style={{float: 'top'}}> Quick Sort </Button>
            <Button onClick={() => this.heapSort()} style={{float: 'top'}}> Heap Sort </Button>
            <Button onClick={() => this.bubbleSort()} style={{float: 'top'}}> Bubble Sort </Button>

            <div className="array-container">
              {array.map((value, idx) =>  (
                <div 
                className="array-bar" 
                key={idx}
                style={{height: `${value}px`}}></div>
              ))}
            </div>
            </>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  align-items: top;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
`;
