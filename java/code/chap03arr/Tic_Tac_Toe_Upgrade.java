package chap03arr;

import java.util.Scanner;

public class Tic_Tac_Toe_Upgrade {

    public static void main(String[] args) {

        char[][] board = new char[3][3];
        int x, y;
        Scanner sc = new Scanner(System.in);

        // 보드 초기화
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                board[i][j] = ' ';
            }
        }

        while (true) {

            // 보드 출력
            for (int i = 0; i < 3; i++) {
                System.out.println(" " + board[i][0] + " | " + board[i][1] + " | " + board[i][2]);
                if (i != 2) System.out.println("---|---|---");
            }

            // 사용자 입력
            System.out.print("좌표 입력 (0~2 0~2): ");
            x = sc.nextInt();
            y = sc.nextInt();

            // 입력값 검사
            if (x < 0 || x > 2 || y < 0 || y > 2) {
                System.out.println("잘못된 좌표입니다.");
                continue;
            }

            if (board[x][y] != ' ') {
                System.out.println("이미 놓인 자리입니다.");
                continue;
            }

            board[x][y] = 'X';

            // X 승리 체크
            if (checkWin(board, 'X')) {
                printBoard(board);
                System.out.println("플레이어(X) 승리!");
                break;
            }

            // 보드 꽉 찼는지 체크
            if (isFull(board)) {
                printBoard(board);
                System.out.println("무승부!");
                break;
            }

            // 컴퓨터(O) 자동 배치
            boolean placed = false;
            for (int i = 0; i < 3 && !placed; i++) {
                for (int j = 0; j < 3; j++) {
                    if (board[i][j] == ' ') {
                        board[i][j] = 'O';
                        placed = true;
                        break;
                    }
                }
            }

            // O 승리 체크
            if (checkWin(board, 'O')) {
                printBoard(board);
                System.out.println("컴퓨터(O) 승리!");
                break;
            }

            // 보드 꽉 찼는지 체크
            if (isFull(board)) {
                printBoard(board);
                System.out.println("무승부!");
                break;
            }
        }

        sc.close();
    }

    // 보드 출력 함수
    public static void printBoard(char[][] board) {
        for (int i = 0; i < 3; i++) {
            System.out.println(" " + board[i][0] + " | " + board[i][1] + " | " + board[i][2]);
            if (i != 2) System.out.println("---|---|---");
        }
    }

    // 승리 체크 함수
    public static boolean checkWin(char[][] b, char player) {

        // 가로, 세로
        for (int i = 0; i < 3; i++) {
            if (b[i][0] == player && b[i][1] == player && b[i][2] == player)
                return true;
            if (b[0][i] == player && b[1][i] == player && b[2][i] == player)
                return true;
        }

        // 대각선
        if (b[0][0] == player && b[1][1] == player && b[2][2] == player)
            return true;
        if (b[0][2] == player && b[1][1] == player && b[2][0] == player)
            return true;

        return false;
    }

    // 보드 꽉 찼는지 체크
    public static boolean isFull(char[][] b) {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (b[i][j] == ' ')
                    return false;
            }
        }
        return true;
    }
}