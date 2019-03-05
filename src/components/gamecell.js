import React from 'react';

import './gamecell.css';

class GameCell extends React.Component {

    render() {
        return(
            <div className={`grid__cell ${this.props.alive ? "alive" : ""}`}></div>
        )
    }

}

export default GameCell;