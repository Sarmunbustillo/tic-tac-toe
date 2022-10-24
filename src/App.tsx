import { Component, createSignal, For } from 'solid-js';

// find returns a value or undefined

const WINNING_COMBS = [
    [1, 2, 3], // top row
    [4, 5, 6], // middle row
    [7, 8, 9], // bottom row
    [1, 4, 7], // left column
    [2, 5, 8], // middle column
    [3, 6, 9], // right column
    [1, 5, 9], // descending diagonal
    [3, 5, 7], // ascending diagonal
];
type Player = 'X' | 'O';
const App: Component = () => {
    const [board, setBoard] = createSignal<Player[]>(new Array(9).fill(null));
    const [turn, setTurn] = createSignal<Player>('X');
    const [winner, setWinner] = createSignal(false);

    const checkWinner = () => {
        const boardState = board();
        const winner = WINNING_COMBS.find((comb) => {
            const [a, b, c] = comb;
            return (
                boardState[a - 1] &&
                boardState[a - 1] === boardState[b - 1] &&
                boardState[a - 1] === boardState[c - 1]
            );
        });
        if (winner) {
            setWinner(true);
        }
    };

    return (
        <div>
            <h1>Tic Tac Toe</h1>
            {winner() ? (
                <h2>Winner: {turn()}</h2>
            ) : (
                <h2>Turn: {turn() === 'X' ? 'O' : 'X'}</h2>
            )}

            <div
                class="board"
                style={{
                    filter: winner() ? 'blur(10px)' : '',
                    'pointer-events': winner() ? 'none' : 'all',
                }}
            >
                <For each={board()}>
                    {(value, index) => (
                        <div
                            class="square"
                            onclick={() => {
                                const newBoard = board().slice();
                                newBoard[index()] = turn() === 'X' ? 'O' : 'X';
                                setBoard(newBoard);
                                turn() === 'X' ? setTurn('O') : setTurn('X');
                                checkWinner();
                            }}
                            style={{
                                'pointer-events':
                                    value !== null ? 'none' : 'all',
                            }}
                        >
                            {value}
                        </div>
                    )}
                </For>
            </div>
        </div>
    );
};

export default App;
