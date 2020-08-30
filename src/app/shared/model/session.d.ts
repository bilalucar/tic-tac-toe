declare namespace Session {
  type PlayerType = 'X' | 'O';
  type Status = 'STARTING' | 'READY' | 'FINISHED';

  export interface SessionModel {
    firstPlayer: string;
    firstPlayerType: PlayerType;
    secondPlayer: string;
    secondPlayerType: PlayerType;
    isNext: PlayerType;
    squares: string[];
    status: Status;
    winner: string;
    winnerSquares: number[];
  }
}
