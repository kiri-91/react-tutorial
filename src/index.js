import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// SquareクラスをReact.Componentクラスから作成する。
// 1マスの描画
// 制御されたコンポーネント
// class Square extends React.Component {
// 	// stateをもたせる
// 	// constructor(props) {
// 	// 	super(props);
// 	// 	this.state = {
// 	// 		value: null,
// 	// 	};
// 	// }


// 	// 状態によってUIを更新する, react要素を返す
// 	render() {
// 		// JSXを返す
// 		return (
// 			<button 
// 				className='square' 
// 				onClick={() => {
// 					this.props.onClick();
// 				}}
// 			>
// 				{/* {this.props.value} */}
// 				{ this.props.value }
// 			</button>
// 		);
// 	}
// }

// 関数コンポーネント
// stateを持たないコンポーネントは楽にかける
function Square(props) {
	return (
		<button className='square' onClick={props.onClick}>
			{props.value}
		</button>
	)
}

//ボードの描画
class Board extends React.Component {

	// どのマス目に何が入っているのかを管理
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		squares: Array(9).fill(null),
	// 		xIsNext: true,
	// 	};
	// }

	// handleClick(i) {
	// 	const squares = this.state.squares.slice();
	// 	// ゲームの決着がすでについている場合や、
	// 	// クリックされたマス目がすでに埋まっている場合は
	// 	// return
	// 	if (calculateWinner(squares) || squares[i]) {
	// 		return;
	// 	}
	// 	squares[i] = this.state.xIsNext ? 'X' : 'O';
	// 	this.setState({
	// 		squares: squares,
	// 		xIsNext: !this.state.xIsNext
	// 	});
	// }

	// Squareコンポーネントを返す
	renderSquare(i) {
		return (
			<Square 
				value={ this.props.squares[i] }
				onClick = {() => this.props.onClick(i)}
			/>
		);
	}

	render() {
		// const winner = calculateWinner(this.state.squares);
		// let status;
		// if (winner) {
		// 	status = 'Winner: ' + winner;
		// } else {
		// 	status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
		// }

		return (
			// <div /> == React.createElement('div')
			<div>
				<div className='board-row'>
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className='board-row'>
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className='board-row'>
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

// ボードと、プレースホルダーの描画
class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			stepNumber: 0,
			xIsNext: true,
		};
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1)
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		// ゲームの決着がすでについている場合や、
		// クリックされたマス目がすでに埋まっている場合は
		// return
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				squares: squares,
			}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,
		});
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = calculateWinner(current.squares);

		const moves = history.map((step, move) => {
			const desc = move ?
				'Go to move #' + move :
				'Go to game start';
			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>{desc}</button>
				</li>
			)
		})

		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}

		return (
			<div className='game'>
				<div className='game-board'>
					<Board 
						squares = {current.squares}
						onClick={(i) => this.handleClick(i) }
					/>
				</div>
				<div className='game-info'>
					<div>{status}</div>
					<ol>{moves}</ol>
				</div>
			</div>
		);
	}
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

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