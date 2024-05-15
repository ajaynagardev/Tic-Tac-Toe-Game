import React from 'react';
import './tictactoe.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import swal from 'sweetalert';  
class TicTac extends React.Component {
    constructor() {
        super();
        this.state = {
            move: 'X',
            board: Array(9).fill(''),
            scores: JSON.parse(localStorage.getItem('scores_of_tic_tac_tae')) || { X: 0, O: 0 }
        };
    }
    checkDraw(board) {
        let count = 0;
        board.forEach(element => {
            if (element !== '') {
                count++;
            }
        });
        if (count >= 9) {
            return true;
        } else {
            return false;
        }
    }
    checkWin(board) {
        const conditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        let count = false;
        conditions.forEach(element => {
            if (board[element[0]] !== '' && board[element[1]] !== '' && board[element[2]] !== '') {
                if (board[element[0]] === board[element[1]] && board[element[1]] === board[element[2]]) {
                    count = true;
                }
            }
        });
        return count;
    }


    click = (n) => {
        let square = [...this.state.board];
        if (this.state.board[n] !== '') {
            // alert('Already Clicked');
            toast.warning("Already Clicked!", {
                position: "top-center"
              })
            // swal("Cancelled", "Imaginary file safe!");
            return;
        }
        square[n] = this.state.move;
        this.setState({ board: square });

        if (this.state.move === 'X') {
            // console.log("working X");
            this.setState({ move: 'O' });
        } else {
            // console.log("working O");
            this.setState({ move: 'X' });
        }

        if (this.checkWin(square)) {
            let winner = this.state.move === 'X' ? 'X' : 'O';
                setTimeout(()=>{
                    // alert(`Winner is ${winner}`);
                    toast.success(`Winner is ${winner}`)
                    // toast.info(`Winner is ${winner}`)
                },[100])
                setTimeout(()=>{
                    let scores = { ...this.state.scores };
                    scores[winner]++;
                    localStorage.setItem('scores_of_tic_tac_tae', JSON.stringify(scores));
                    square.fill('');
                    this.setState({ board: square, scores });
                },[2000])
        }

        if (this.checkDraw(square)) {
                setTimeout(()=>{
                    // alert("Match Draw")
                    toast.error("Match Draw");
                },[100])
                setTimeout(()=>{
                    square.fill("");
                    this.setState({board:square})
                },[2000])              
        }
    }
    render() {
        return (
            <>
                {/* <h1 className='text btn'>TIC TAC TOE <span className='new'>New</span></h1> */}
                <h1 className='text btn'>TIC TAC TOE</h1>
                <div className="scoreboard">
                    <p className='text'> Score =  X : {this.state.scores.X} || O : {this.state.scores.O}</p>
                    {/* <ToastContainer /> */}
                    <ToastContainer
                        position="top-center"
                        autoClose={900}
                        hideProgressBar={true}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="dark"
                        // theme="light"
                    />
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td onClick={() => { this.click(0) }}>{this.state.board[0]}</td>
                            <td onClick={() => { this.click(1) }}>{this.state.board[1]}</td>
                            <td onClick={() => { this.click(2) }}>{this.state.board[2]}</td>
                        </tr>
                        <tr>
                            <td onClick={() => { this.click(3) }}>{this.state.board[3]}</td>
                            <td onClick={() => { this.click(4) }}>{this.state.board[4]}</td>
                            <td onClick={() => { this.click(5) }}>{this.state.board[5]}</td>
                        </tr>
                        <tr>
                            <td onClick={() => { this.click(6) }}>{this.state.board[6]}</td>
                            <td onClick={() => { this.click(7) }}>{this.state.board[7]}</td>
                            <td onClick={() => { this.click(8) }}>{this.state.board[8]}</td>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    }
}
export default TicTac;