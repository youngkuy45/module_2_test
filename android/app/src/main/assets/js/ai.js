// AI 가이드 알고리즘

class GameAI {
    constructor() {
        this.directions = ['up', 'right', 'down', 'left'];
    }

    // 보드 평가 함수
    evaluateBoard(board) {
        let score = 0;

        // 1. 빈 타일 개수 (많을수록 좋음)
        const emptyTiles = this.countEmptyTiles(board);
        score += emptyTiles * 100;

        // 2. 큰 숫자가 모서리에 있는지 확인
        const maxTile = this.getMaxTile(board);
        if (board[0][0] === maxTile || board[0][3] === maxTile ||
            board[3][0] === maxTile || board[3][3] === maxTile) {
            score += 5000;
        }

        // 3. 정렬 점수 (인접한 타일이 비슷한 값일수록 좋음)
        score += this.getSmoothness(board) * 10;

        // 4. 단조성 (한 방향으로 정렬되어 있을수록 좋음)
        score += this.getMonotonicity(board) * 50;

        return score;
    }

    // 빈 타일 개수 세기
    countEmptyTiles(board) {
        let count = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 0) count++;
            }
        }
        return count;
    }

    // 최대 타일 값 찾기
    getMaxTile(board) {
        let max = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] > max) max = board[i][j];
            }
        }
        return max;
    }

    // 부드러움 점수 (인접 타일의 값 차이)
    getSmoothness(board) {
        let smoothness = 0;

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] !== 0) {
                    const value = Math.log2(board[i][j]);

                    // 오른쪽 타일과 비교
                    if (j < 3 && board[i][j + 1] !== 0) {
                        smoothness -= Math.abs(value - Math.log2(board[i][j + 1]));
                    }

                    // 아래 타일과 비교
                    if (i < 3 && board[i + 1][j] !== 0) {
                        smoothness -= Math.abs(value - Math.log2(board[i + 1][j]));
                    }
                }
            }
        }

        return smoothness;
    }

    // 단조성 점수
    getMonotonicity(board) {
        let totals = [0, 0, 0, 0]; // up, right, down, left

        // 가로 방향 확인
        for (let i = 0; i < 4; i++) {
            let current = 0;
            let next = current + 1;
            while (next < 4) {
                while (next < 4 && board[i][next] === 0) next++;
                if (next >= 4) break;

                let currentValue = board[i][current] !== 0 ? Math.log2(board[i][current]) : 0;
                let nextValue = board[i][next] !== 0 ? Math.log2(board[i][next]) : 0;

                if (currentValue > nextValue) {
                    totals[1] += nextValue - currentValue;
                } else {
                    totals[3] += currentValue - nextValue;
                }

                current = next;
                next++;
            }
        }

        // 세로 방향 확인
        for (let j = 0; j < 4; j++) {
            let current = 0;
            let next = current + 1;
            while (next < 4) {
                while (next < 4 && board[next][j] === 0) next++;
                if (next >= 4) break;

                let currentValue = board[current][j] !== 0 ? Math.log2(board[current][j]) : 0;
                let nextValue = board[next][j] !== 0 ? Math.log2(board[next][j]) : 0;

                if (currentValue > nextValue) {
                    totals[2] += nextValue - currentValue;
                } else {
                    totals[0] += currentValue - nextValue;
                }

                current = next;
                next++;
            }
        }

        return Math.max(totals[0], totals[1]) + Math.max(totals[2], totals[3]);
    }

    // 보드 복사
    copyBoard(board) {
        return board.map(row => [...row]);
    }

    // 특정 방향으로 이동 시뮬레이션
    simulateMove(board, direction) {
        const newBoard = this.copyBoard(board);
        let moved = false;

        if (direction === 'up') {
            for (let j = 0; j < 4; j++) {
                const column = [];
                for (let i = 0; i < 4; i++) {
                    if (newBoard[i][j] !== 0) column.push(newBoard[i][j]);
                }
                const merged = this.mergeArray(column);
                for (let i = 0; i < 4; i++) {
                    const newValue = merged[i] || 0;
                    if (newBoard[i][j] !== newValue) moved = true;
                    newBoard[i][j] = newValue;
                }
            }
        } else if (direction === 'down') {
            for (let j = 0; j < 4; j++) {
                const column = [];
                for (let i = 3; i >= 0; i--) {
                    if (newBoard[i][j] !== 0) column.push(newBoard[i][j]);
                }
                const merged = this.mergeArray(column);
                for (let i = 3; i >= 0; i--) {
                    const newValue = merged[3 - i] || 0;
                    if (newBoard[i][j] !== newValue) moved = true;
                    newBoard[i][j] = newValue;
                }
            }
        } else if (direction === 'left') {
            for (let i = 0; i < 4; i++) {
                const row = [];
                for (let j = 0; j < 4; j++) {
                    if (newBoard[i][j] !== 0) row.push(newBoard[i][j]);
                }
                const merged = this.mergeArray(row);
                for (let j = 0; j < 4; j++) {
                    const newValue = merged[j] || 0;
                    if (newBoard[i][j] !== newValue) moved = true;
                    newBoard[i][j] = newValue;
                }
            }
        } else if (direction === 'right') {
            for (let i = 0; i < 4; i++) {
                const row = [];
                for (let j = 3; j >= 0; j--) {
                    if (newBoard[i][j] !== 0) row.push(newBoard[i][j]);
                }
                const merged = this.mergeArray(row);
                for (let j = 3; j >= 0; j--) {
                    const newValue = merged[3 - j] || 0;
                    if (newBoard[i][j] !== newValue) moved = true;
                    newBoard[i][j] = newValue;
                }
            }
        }

        return { board: newBoard, moved };
    }

    // 배열 합치기
    mergeArray(arr) {
        const result = [];
        let i = 0;

        while (i < arr.length) {
            if (i < arr.length - 1 && arr[i] === arr[i + 1]) {
                result.push(arr[i] * 2);
                i += 2;
            } else {
                result.push(arr[i]);
                i++;
            }
        }

        return result;
    }

    // 최적의 움직임 찾기
    getBestMove(board) {
        let bestMove = null;
        let bestScore = -Infinity;

        for (const direction of this.directions) {
            const { board: newBoard, moved } = this.simulateMove(board, direction);

            if (!moved) continue;

            const score = this.evaluateBoard(newBoard);

            if (score > bestScore) {
                bestScore = score;
                bestMove = direction;
            }
        }

        return bestMove;
    }

    // 방향을 한글로 변환
    getDirectionText(direction) {
        const directionMap = {
            'up': '↑ 위',
            'down': '↓ 아래',
            'left': '← 왼쪽',
            'right': '→ 오른쪽'
        };
        return directionMap[direction] || '없음';
    }
}
