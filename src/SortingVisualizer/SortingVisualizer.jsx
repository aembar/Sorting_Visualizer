import React from 'react';
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import {getQuickSortAnimations} from '../sortingAlgorithms/quickSort.js';
import { getHeapSortAnimations } from "../sortingAlgorithms/heapSort.js";
import { getBubbleSortAnimations } from "../sortingAlgorithms/bubbleSort.js";
import { Button } from "../Button"
import { Button2 } from "../Button2"




import './SortingVisualizer.css';
import { MenuItems } from "./MenuItems"
import styled, { css } from 'styled-components';
import { findAllByDisplayValue } from '@testing-library/react';

 var ANIMATION_SPEED_MS = 3;

 var NUMBER_OF_ARRAY_BARS = 180;

 var currentsizenum = 1;

 var RESTORE_TIME = 0;


const PRIMARY_COLOR = "rgb(0, 255, 191)";

const DISABLED_BUTTON = "Currently Disabled"
const ENABLED_BUTTON = {
    n8: "Increase speed to 18ms and decrease number of bars to an eighth of original size.",
    n4: "Increase speed to 15ms and decrease number of bars to a quarter of the original size.",
    n2: "Increase speed to 10ms and decrease number of bars to half the original size.",
    n: "Default speed of 5ms and original size of the number of bars.",
    n5: "Decrease speed to 4ms and 1.25x number of bars."
}

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "red";

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            
        };
      }
      disableSortButtons() {
        document.getElementById('smallest').setAttribute("disabled","disabled");
        document.getElementById('smallest').title = DISABLED_BUTTON;
     
        document.getElementById('smaller').setAttribute("disabled","disabled");
        document.getElementById('smaller').title = DISABLED_BUTTON;

        document.getElementById('small').setAttribute("disabled","disabled");
        document.getElementById('small').title = DISABLED_BUTTON;

        document.getElementById('original').setAttribute("disabled","disabled");
        document.getElementById('original').title = DISABLED_BUTTON;

        document.getElementById('more').setAttribute("disabled","disabled");
        document.getElementById('more').title = DISABLED_BUTTON;
    }
    restoreStoreButtons() {
      document.getElementById('smallest').removeAttribute("disabled");
      document.getElementById('smallest').title = ENABLED_BUTTON.n8;
   
      document.getElementById('smaller').removeAttribute("disabled");
      document.getElementById('smaller').title = ENABLED_BUTTON.n4;

      document.getElementById('small').removeAttribute("disabled");
      document.getElementById('small').title = ENABLED_BUTTON.n2;

      document.getElementById('original').removeAttribute("disabled");
      document.getElementById('original').title = ENABLED_BUTTON.n;

      document.getElementById('more').removeAttribute("disabled");
      document.getElementById('more').title = ENABLED_BUTTON.n5;
    }


    speedAndBars = x => {
      if (x === 1) {
        this.genRandomArray(180, 1); // n
        //this.restoreStoreButtons();
      } else if (x === 2) {
       this.genRandomArray(225, 2); // 1.25n 
       //this.restoreStoreButtons();
      }  else if (x === -1) {
        this.genRandomArray(90, -1); // 0.5n
       // this.restoreStoreButtons();
      } else if (x === -2) {
        this.genRandomArray(22, -2); // 0.125n
       // this.restoreStoreButtons();
      }else if (x === -3) {
        this.genRandomArray(45, -3); // 0.25n
       // this.restoreStoreButtons();
      }
    };

   /* resetColor = () => {
      const arrayBars = document.getElementsByClassName("array-bar");
      for (let i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
      }
    };*/

    genRandomArray = (numberOfArrayBars, number) => {
      // console.log("height ", window.innerHeight);
      // console.log("width ", window.innerWidth);
      // if (window.innerWidth >= 1400) {
      //   numberOfArrayBars -= 20;
      // }
      
      NUMBER_OF_ARRAY_BARS = numberOfArrayBars;

      if (number === 1) {
        let array = [];
        for (let i = 0; i < numberOfArrayBars; i++) {
          array.push(randomIntFromInterval(10, 645));
        }
        document.querySelector(".n").style.backgroundColor = "red";
        document.querySelector(".nby8").style.backgroundColor = "mintcream";
        document.querySelector(".nby2").style.backgroundColor = "mintcream";
        document.querySelector(".nby4").style.backgroundColor = "mintcream";
        document.querySelector(".n5by4").style.backgroundColor = "mintcream";
        ANIMATION_SPEED_MS = 5;
        this.setState({ array });
        //if we have called arrayBars with className 'array-bar', we wouldn't get the current clicked speed/bar button but the previous selection as setState is an asynchrnous so it doesn't update instantly, so we created seperate function for handling async function and get current state of the arrayBars
        this.updateBarsState(4);
      } else if (number === 2) {
        let array = [];
        for (let i = 0; i < numberOfArrayBars; i++) {
          array.push(randomIntFromInterval(5, 645));
        }
        document.querySelector(".n").style.backgroundColor = "mintcream";
        document.querySelector(".nby8").style.backgroundColor = "mintcream";
        document.querySelector(".nby2").style.backgroundColor = "mintcream";
        document.querySelector(".nby4").style.backgroundColor = "mintcream";
        document.querySelector(".n5by4").style.backgroundColor = "red";
        ANIMATION_SPEED_MS = 4;
        this.setState({ array });
        this.updateBarsState(3.5);
      } else if (number === -1) {
        let array = [];
        for (let i = 0; i < numberOfArrayBars; i++) {
          array.push(randomIntFromInterval(5, 645));
        }
  
       document.querySelector(".n").style.backgroundColor = "mintcream";
       document.querySelector(".nby8").style.backgroundColor = "mintcream";
       document.querySelector(".nby2").style.backgroundColor = "red";
       document.querySelector(".nby4").style.backgroundColor = "mintcream";
       document.querySelector(".n5by4").style.backgroundColor = "mintcream";

        ANIMATION_SPEED_MS = 10;
        this.setState({ array });
        this.updateBarsState(9.5);
      } else if (number === -2) {
        let array = [];
        for (let i = 0; i < numberOfArrayBars; i++) {
          array.push(randomIntFromInterval(5, 645));
        }
        document.querySelector(".n").style.backgroundColor = "mintcream";
        document.querySelector(".nby8").style.backgroundColor = "red";
        document.querySelector(".nby2").style.backgroundColor = "mintcream";
        document.querySelector(".nby4").style.backgroundColor = "mintcream";
        document.querySelector(".n5by4").style.backgroundColor = "mintcream";
        ANIMATION_SPEED_MS = 18;
        this.setState({array });
        this.updateBarsState(30);
      }
      else if (number === -3) {
        let array = [];
        for (let i = 0; i < numberOfArrayBars; i++) {
          array.push(randomIntFromInterval(5, 645));
        }
        document.querySelector(".n").style.backgroundColor = "mintcream";
        document.querySelector(".nby8").style.backgroundColor = "mintcream";
        document.querySelector(".nby4").style.backgroundColor = "red";
        document.querySelector(".nby2").style.backgroundColor = "mintcream";
        document.querySelector(".n5by4").style.backgroundColor = "mintcream";
        ANIMATION_SPEED_MS = 18;
        this.setState({array });
        this.updateBarsState(20);
      }
      //this.resetColor();
    };

    updateBarsState = width => {
      // this.setState({ array: array });
      let arrayBars = [];
      async function something() {
        const a = new Promise((res, rej) => {
          const arrayBars = document.getElementsByClassName("array-bar");
          res(arrayBars);
        });
        const newArrayBars = await a;
        arrayBars = newArrayBars;
        for (let k = 0; k < arrayBars.length; k++) {
          arrayBars[k].style.width = `${width}px`;
        }
        // console.log(newArrayBars.length);
        // console.log(arrayBars.length);
      }
      something();
    };


    componentDidMount() {
        this.setColors();
        this.resetArray();
    }

    setColors(){
      document.querySelector(".n").style.backgroundColor = "red";
      document.querySelector(".nby8").style.backgroundColor = "mintcream";
      document.querySelector(".nby2").style.backgroundColor = "mintcream";
      document.querySelector(".nby4").style.backgroundColor = "mintcream";
      document.querySelector(".n5by4").style.backgroundColor = "mintcream";
    }

    resetArray(){
      
        const array = [];
        for(let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5,645));
        }
        this.setState({array});
    }

    mergeSort() {
       // this.disableSortButtons();
        const animations = getMergeSortAnimations(this.state.array);
        const buttons = document.getElementsByClassName("btn");
        for (let k = 0; k < buttons.length; k++) {
             buttons[k].disabled = true;
       }
       /*const buttons2 = document.getElementsByClassName("btn-group");
       for (let i = 0; i < buttons2.length; i++) {
            buttons2[i].disabled = true;
      }*/
       
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
        const arrayBars1 = document.getElementsByClassName("array-bar");
        ANIMATION_SPEED_MS = 4;
        for (let i = 0; i < arrayBars1.length; i++) {
          setTimeout(() => {
            arrayBars1[i].style.backgroundColor = "lightgreen";
            //re-enabling all the buttons
            for (let k = 0; k < buttons.length; k++) {
              buttons[k].disabled = false;
            }
            /*for (let i = 0; i < buttons2.length; i++) {
              buttons2[i].disabled = false;
            }*/
           // this.restoreStoreButtons();
          }, ANIMATION_SPEED_MS * animations.length + 1 + i * 10);
          setTimeout(() => {
               arrayBars1[i].style.backgroundColor = PRIMARY_COLOR;
          }, ANIMATION_SPEED_MS * animations.length + 1 + i * 11);
      }
    }
    quickSort() {
      //this.disableSortButtons();
      
        const animations = getQuickSortAnimations(this.state.array);
        const buttons = document.getElementsByClassName("btn");
        for (let k = 0; k < buttons.length; k++) {
             buttons[k].disabled = true;
        }
     /* const buttons2 = document.getElementsByClassName("btn-group");
       for (let i = 0; i < buttons2.length; i++) {
            buttons2[i].disabled = true;
      }*/
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName("array-bar");
          const isColorChange = i % 4 <= 1;
          //const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            //const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS * 2 );
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS * 2);
          }
      }
      const arrayBars1 = document.getElementsByClassName("array-bar");
        for (let i = 0; i < arrayBars1.length; i++) {
          setTimeout(() => {
            arrayBars1[i].style.backgroundColor = "lightgreen";
            //re-enabling all the buttons
            for (let k = 0; k < buttons.length; k++) {
              buttons[k].disabled = false;
            }
            /*for (let i = 0; i < buttons2.length; i++) {
              buttons2[i].disabled = false;
            }*/
           // this.restoreStoreButtons();
          }, ANIMATION_SPEED_MS * 2 * animations.length + 1 + i * 10);
          setTimeout(() => {
            arrayBars1[i].style.backgroundColor = PRIMARY_COLOR;
       }, ANIMATION_SPEED_MS  * 2 * animations.length + 1 + i * 11);
    }
  }

    heapSort() {
    //  this.disableSortButtons();
      const buttons = document.getElementsByClassName("btn");
        for (let k = 0; k < buttons.length; k++) {
             buttons[k].disabled = true;
       }
      /* const buttons2 = document.getElementsByClassName("btn-group");
       for (let i = 0; i < buttons2.length; i++) {
            buttons2[i].disabled = true;
      }*/
        const animations = getHeapSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const colorChange = i % 4 <= 1;
          const arrayBars = document.getElementsByClassName("array-bar");
          if (colorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
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
      const arrayBars1 = document.getElementsByClassName("array-bar");
        for (let i = 0; i < arrayBars1.length; i++) {
          setTimeout(() => {
           arrayBars1[i].style.backgroundColor = "lightgreen";
            //re-enabling all the buttons
            for (let k = 0; k < buttons.length; k++) {
              buttons[k].disabled = false;
            }
            /*for (let i = 0; i < buttons2.length; i++) {
              buttons2[i].disabled = false;
            }*/
            //this.restoreStoreButtons();
          }, ANIMATION_SPEED_MS * animations.length + 1 + i * 10);
          setTimeout(() => {
            arrayBars1[i].style.backgroundColor = PRIMARY_COLOR;
       }, ANIMATION_SPEED_MS * animations.length + 1 + i * 11);
        }
        
    }

    bubbleSort() {
   //   this.disableSortButtons();
      const animations = getBubbleSortAnimations(this.state.array);
      const buttons = document.getElementsByClassName("btn");
        for (let k = 0; k < buttons.length; k++) {
             buttons[k].disabled = true;
       }
       const buttons2 = document.getElementsByClassName("btn-group");
       for (let i = 0; i < buttons2.length; i++) {
           buttons2[i].disabled = true;
       }
      for (let i = 0; i < animations.length; i++) {
        const colorChange = i % 4 <= 1;
        const arrayBars = document.getElementsByClassName("array-bar");
        if (colorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
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

    const arrayBars1 = document.getElementsByClassName("array-bar");
        for (let i = 0; i < arrayBars1.length; i++) {
          setTimeout(() => {
           arrayBars1[i].style.backgroundColor = "lightgreen";
            //re-enabling all the buttons
            for (let k = 0; k < buttons.length; k++) {
              buttons[k].disabled = false;
            }
            /*for (let i = 0; i < buttons2.length; i++) {
              buttons2[i].disabled = false;
            }*/
            //this.restoreStoreButtons();
          }, ANIMATION_SPEED_MS * animations.length + 1 + i * 10);
          setTimeout(() => {
            arrayBars1[i].style.backgroundColor = PRIMARY_COLOR;
       }, ANIMATION_SPEED_MS * animations.length + 1 + i * 12);
        }
    }

    render(){
        const {array} = this.state;
        return (
            <>
             <nav className="NavbarItems">
                <h1 className="navbar-logo">SortingVisualizer<i class="fab fa-react"></i></h1>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <div class="btn-toolbar">
                <Button onClick={() => this.resetArray()} style={{float: 'right'}}> New Array</Button>
                <Button onClick={() => this.mergeSort()} style={{float: 'right'}}> Merge Sort </Button>
                <Button onClick={() => this.quickSort()} style={{float: 'right'}}> Quick Sort </Button>
                <Button onClick={() => this.heapSort()} style={{float: 'right'}}> Heap Sort </Button>
                <Button onClick={() => this.bubbleSort()} style={{float: 'right'}}> Bubble Sort </Button>
                </div>
                <div
                  className="btn-toolbar"
                  role="toolbar"
                  aria-label="Toolbar with button groups"
                >
            
            <div
              className="btn-group mr-2 buttons"
              role="group"
              aria-label="First group"
            >
              
              <a href='' class=' btn2 btn--primary btn--outline'>Speed/Size:</a>
        
              <button1  color="mintcream"
                backgroundColor = "mintcream"
                type="button"
                id = 'smallest'
                className="btn btn--primary nby8"
                title="Increase speed to 18ms and decrease number of bars to an eighth of original size."
                onClick={() => this.speedAndBars(-2)}
              >
                n/8
              </button1>
              <button1 color="mintcream"
                backgroundColor = "mintcream"
                type='smaller'
                id = "0.25n"
                className="btn btn--primary nby4"
                title="Increase speed to 15ms and decrease number of bars to a quarter of the original size."
                onClick={ () => this.speedAndBars(-3)}
              >
                n/4
              </button1>
              <button1 color="mintcream"
                backgroundColor = "mintcream"
                type="button"
                id = 'small'
                className="btn btn--primary nby2"
                title="Increase speed to 10ms and decrease number of bars to half the original size."
                onClick={ () => this.speedAndBars(-1)}
              >
                n/2
              </button1>
              <button1 color="mintcream"
                backgroundColor = "mintcream"
                type="button"
                id = 'original'
                className="btn btn--primary n"
                title="Default speed of 5ms and original size(180 bars). "
                onClick={() => this.speedAndBars(1)}
              >
                n
              </button1>
              <button1 color="mintcream"
                backgroundColor = "mintcream"
                type="button"
                id = 'more'
                className="btn btn--primary n5by4"
                title="Decrease speed to 4ms and 1.25x number of bars. "
                onClick={ () => this.speedAndBars(2)}
              >
                5n/4
              </button1>
            </div>
          </div>

          <div>

          </div>

                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
              
                
            </nav>

              <div className="array-container">
                {array.map((value, idx) =>  (
                  <div 
                  className="array-bar" 
                  key={idx}
                  style={{height: `${value}px`}}></div>
                ))}
              </div>

              <td valign="bottom"><div class = "header-bottom" > </div></td>
            </>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/*
const button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  align-items: top;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  &:hover {
    background-color: #445b65;
    color: white;
 }
`;*/