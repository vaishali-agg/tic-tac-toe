import React from 'react';
import '../index.css';
import Board from './Board';
import { calculateWinner } from '../utils/util';

class Game extends React.Component {

    state = {
        history: [
            {
                squares: Array(9).fill(null)
            }
        ],
        stepNumber: 0,
        xIsNext: true
    };

    handleClick = (i) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1].squares.slice();

        if (calculateWinner(current) || current[i])
            return;

        current[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{ squares: current }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jump = (step) => {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 == 0
        });
    }

    render() {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1].squares;
        const winner = calculateWinner(current);
        let status;

        if (winner)
            status = (winner) + ' won!';
        else
            status = 'Next turn: ' + (this.state.xIsNext ? 'X' : 'O');

        const moves = history.map((step, move) => {
            return (<li key={move}>
                <button
                    onClick={() => this.jump(move)}>
                    {move ? 'Go to step ' + move : 'Go to game start'}
                </button>
            </li>)
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current}
                        onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;