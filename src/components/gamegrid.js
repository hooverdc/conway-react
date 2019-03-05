import React from 'react';

import GameCell from './gamecell';

import './gamegrid.css';

class GameGrid extends React.Component {

    render() {

        const grid = this.props.cells;

        let newGrid = grid.map(row => {
            return row.map(cell => {
                return <GameCell alive={cell}></GameCell>
            });
        });

        return (
            <div className="game-grid">
                {newGrid}
            </div>
        )
    }
    
}

export default GameGrid;