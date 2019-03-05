import React from 'react';

import GameGrid from './gamegrid';

import './game.css';

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cells: this.makeBoard(),
            interval: 100,
            running: false
        }
    }

    makeBoard = () => {

        const boardSize = 100;
        let newBoard = [];

        for (let y = 0; y < boardSize; y++) {

            newBoard[y] = [];

            for (let x = 0; x < boardSize; x++) {
                newBoard[y][x] = false;
            }
        }

        return newBoard;
    }

    randomBoard = () => {

        let newGrid = this.state.cells;

        for (let y = 0; y < newGrid.length; y++) {
            for (let x = 0; x < newGrid[y].length; x++) {
                newGrid[y][x] = Math.random() >= 0.75;
            }
        }

        this.setState({
            cells:newGrid
        })

    }

    stopGame = () => {
        window.clearTimeout(this.handleTimeout);
    }

    startGame = () => {
        this.runTick();
    }

    runTick = () => {

        const prevGrid = this.state.cells;

        let newGrid = this.processGrid(prevGrid);

        this.setState({ cells: newGrid });

        this.handleTimeout = window.setTimeout(() => {
            this.startGame()
        }, this.state.interval
        );
    }

    processGrid = (grid) => {

        const dirs = [
            [1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]
        ];

        let size = 100;

        const oldGrid = grid;

        let newGrid = []

        // grid is always square!

        for (let y = 0; y < size; y++) {

            newGrid[y] = []

            for (let x = 0; x < size; x++) {

                let cnt = 0;

                for (let d = 0; d < dirs.length; d++) {

                    let yDir = dirs[d][0];
                    let xDir = dirs[d][1];

                    if (y + yDir < 0 || y + yDir >= size || x + xDir < 0 || x + xDir >= size) {
                        cnt = cnt + 0;
                    } else {
                        cnt = cnt + oldGrid[y + yDir][x + xDir];
                    }

                }

                if (oldGrid[y][x] === true) {
                    if (cnt < 2) {
                        newGrid[y][x] = false;
                    }

                    if (cnt === 2 || cnt === 3) {
                        newGrid[y][x] = true;
                    }

                    if (cnt > 3) {
                        newGrid[y][x] = false;
                    }

                }

                if (oldGrid[y][x] === false) {

                    if (cnt === 3) {
                        newGrid[y][x] = true;
                    } else {
                        newGrid[y][x] = false;
                    }

                }
            }
        }

        console.log(newGrid);

        return newGrid;
    }

    render() {
        return (
            <div>
                <GameGrid cells={this.state.cells}></GameGrid>
                <div className="controls">
                    <button onClick={this.randomBoard}>Random</button>
                    <button onClick={this.startGame}>Start</button>
                    <button onClick={this.stopGame}>Stop</button>
                </div>
            </div>
        )
    }
}

export default Game;