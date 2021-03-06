import React from 'react'
import CommonVar from './CommonVar';
import Board from './Board'

class Game extends React.Component {
    constructor(props){
        super(props);
        this.common = new CommonVar();
        this.state = {
            history: [{
                squares: Array(this.common.TOTAL_SQUARE).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true
        };
        this.handleClick = this.handleClick.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
        this.restart = this.restart.bind(this);
    }
    handleClick(i){
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
          }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }
    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0
        })
    }
    restart(){
        this.setState({
            history: [{
                squares: Array(this.common.TOTAL_SQUARE).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true
        })
    }
    render(){
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        let winner = calculateWinner(current.squares);

        const move = history.map((step, move) => {
            const desc = move ? 
            'Go to move #' + move :
            'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)} style={{minWidth: '100px'}}>{desc}</button>
                </li>
            )
        })
        let status = '';
        if(winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }   
        return(
            <div className="game">
                <div className="game-board">
                    <Board onClick={(i) => this.handleClick(i)} squares={current.squares}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{move}</ol>
                </div>
                <div>
                    <button onClick={this.restart} style={{minWidth: '100px', borderRadius: '8px'}}>Restart</button>
                </div>
            </div>
        )
    };
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

export default Game;