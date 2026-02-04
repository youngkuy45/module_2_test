// 2048 게임 로직

let board = [];
let score = 0;
let currentUser = null;
let gameAI = null;
let autoGuideEnabled = false;
let autoGuideInterval = null;
let mergedTiles = []; // 합쳐진 타일 추적

// 페이지 로드 시 초기화
window.addEventListener('DOMContentLoaded', () => {
    // 로그인 확인
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
        window.location.href = 'index.html';
        return;
    }

    currentUser = JSON.parse(userStr);
    document.getElementById('currentUser').textContent = currentUser.username;

    // 관리자라면 AI 가이드 표시
    if (currentUser.isAdmin) {
        document.getElementById('aiGuide').style.display = 'block';
        gameAI = new GameAI();
    }

    // 최고 점수 표시
    updateBestScore();

    // 실시간 랭킹 표시
    updateLiveRanking();

    // 새 게임 시작
    newGame();

    // 키보드 이벤트 리스너
    document.addEventListener('keydown', handleKeyPress);
});

// 새 게임 시작
function newGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    score = 0;
    mergedTiles = [];
    updateScore();
    addRandomTile();
    addRandomTile();
    renderBoard(true);
    updateAISuggestion();
}

// 랜덤 타일 추가
function addRandomTile() {
    const emptyTiles = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                emptyTiles.push({ row: i, col: j });
            }
        }
    }

    if (emptyTiles.length > 0) {
        const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

// 보드 렌더링
function renderBoard(isNewGame = false) {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.dataset.position = `${i}-${j}`;

            if (board[i][j] !== 0) {
                tile.textContent = board[i][j];
                tile.classList.add(`tile-${board[i][j]}`);

                // 합쳐진 타일인지 확인
                const isMerged = mergedTiles.some(pos => pos.row === i && pos.col === j);
                if (isMerged && !isNewGame) {
                    tile.classList.add('merged-tile');
                }
            }

            gameBoard.appendChild(tile);
        }
    }

    // 합쳐진 타일 목록 초기화
    mergedTiles = [];
}

// 점수 업데이트
function updateScore() {
    document.getElementById('score').textContent = score;

    // 현재 점수가 최고 점수를 넘으면 실시간 랭킹 업데이트
    if (score > currentUser.highScore) {
        updateLiveRanking();
    }
}

// 최고 점수 업데이트
function updateBestScore() {
    document.getElementById('bestScore').textContent = currentUser.highScore;
}

// 키보드 입력 처리
function handleKeyPress(event) {
    const key = event.key;
    let moved = false;
    let direction = null;

    event.preventDefault();

    if (key === 'ArrowUp') {
        direction = 'up';
        moved = moveUp();
    } else if (key === 'ArrowDown') {
        direction = 'down';
        moved = moveDown();
    } else if (key === 'ArrowLeft') {
        direction = 'left';
        moved = moveLeft();
    } else if (key === 'ArrowRight') {
        direction = 'right';
        moved = moveRight();
    }

    if (moved && direction) {
        // 방향 애니메이션 표시
        showDirectionAnimation(direction);

        addRandomTile();
        renderBoard();
        updateScore();
        updateAISuggestion();

        if (isGameOver()) {
            endGame();
        }
    }
}

// 위로 이동
function moveUp() {
    let moved = false;

    for (let j = 0; j < 4; j++) {
        const column = [];
        for (let i = 0; i < 4; i++) {
            if (board[i][j] !== 0) {
                column.push(board[i][j]);
            }
        }

        const { result, mergedIndices } = mergeArray(column);

        for (let i = 0; i < 4; i++) {
            const newValue = result[i] || 0;
            if (board[i][j] !== newValue) {
                moved = true;
            }
            board[i][j] = newValue;

            // 합쳐진 타일 위치 저장
            if (mergedIndices.includes(i)) {
                mergedTiles.push({ row: i, col: j });
            }
        }
    }

    return moved;
}

// 아래로 이동
function moveDown() {
    let moved = false;

    for (let j = 0; j < 4; j++) {
        const column = [];
        for (let i = 3; i >= 0; i--) {
            if (board[i][j] !== 0) {
                column.push(board[i][j]);
            }
        }

        const { result, mergedIndices } = mergeArray(column);

        for (let i = 3; i >= 0; i--) {
            const newValue = result[3 - i] || 0;
            if (board[i][j] !== newValue) {
                moved = true;
            }
            board[i][j] = newValue;

            // 합쳐진 타일 위치 저장
            if (mergedIndices.includes(3 - i)) {
                mergedTiles.push({ row: i, col: j });
            }
        }
    }

    return moved;
}

// 왼쪽으로 이동
function moveLeft() {
    let moved = false;

    for (let i = 0; i < 4; i++) {
        const row = [];
        for (let j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                row.push(board[i][j]);
            }
        }

        const { result, mergedIndices } = mergeArray(row);

        for (let j = 0; j < 4; j++) {
            const newValue = result[j] || 0;
            if (board[i][j] !== newValue) {
                moved = true;
            }
            board[i][j] = newValue;

            // 합쳐진 타일 위치 저장
            if (mergedIndices.includes(j)) {
                mergedTiles.push({ row: i, col: j });
            }
        }
    }

    return moved;
}

// 오른쪽으로 이동
function moveRight() {
    let moved = false;

    for (let i = 0; i < 4; i++) {
        const row = [];
        for (let j = 3; j >= 0; j--) {
            if (board[i][j] !== 0) {
                row.push(board[i][j]);
            }
        }

        const { result, mergedIndices } = mergeArray(row);

        for (let j = 3; j >= 0; j--) {
            const newValue = result[3 - j] || 0;
            if (board[i][j] !== newValue) {
                moved = true;
            }
            board[i][j] = newValue;

            // 합쳐진 타일 위치 저장
            if (mergedIndices.includes(3 - j)) {
                mergedTiles.push({ row: i, col: j });
            }
        }
    }

    return moved;
}

// 배열 합치기
function mergeArray(arr) {
    const result = [];
    const mergedIndices = []; // 합쳐진 위치 추적
    let i = 0;
    let resultIndex = 0;

    while (i < arr.length) {
        if (i < arr.length - 1 && arr[i] === arr[i + 1]) {
            const mergedValue = arr[i] * 2;
            result.push(mergedValue);
            mergedIndices.push(resultIndex); // 합쳐진 위치 저장
            score += mergedValue;
            i += 2;
            resultIndex++;
        } else {
            result.push(arr[i]);
            i++;
            resultIndex++;
        }
    }

    return { result, mergedIndices };
}

// 게임 오버 확인
function isGameOver() {
    // 빈 칸이 있으면 게임 계속 가능
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (board[i][j] === 0) return false;
        }
    }

    // 합칠 수 있는 타일이 있는지 확인
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (j < 3 && board[i][j] === board[i][j + 1]) return false;
            if (i < 3 && board[i][j] === board[i + 1][j]) return false;
        }
    }

    return true;
}

// 게임 종료
function endGame() {
    // 최고 점수 업데이트
    if (score > currentUser.highScore) {
        currentUser.highScore = score;

        // 로컬 스토리지에서 사용자 목록 업데이트
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.username === currentUser.username);
        if (userIndex !== -1) {
            users[userIndex].highScore = score;
            localStorage.setItem('users', JSON.stringify(users));
        }

        // 현재 사용자 세션 업데이트
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        updateBestScore();
        updateLiveRanking();

        document.getElementById('highScoreMessage').textContent = '🎉 새로운 최고 점수입니다!';
    } else {
        document.getElementById('highScoreMessage').textContent = '';
    }

    // 실시간 랭킹 업데이트
    updateLiveRanking();

    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOverModal').style.display = 'flex';

    // 자동 가이드 중지
    if (autoGuideEnabled) {
        toggleAutoGuide();
        document.getElementById('autoGuide').checked = false;
    }
}

// 게임 오버 모달 닫기
function closeGameOver() {
    document.getElementById('gameOverModal').style.display = 'none';
}

// 랭킹 보기
function showRanking() {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // 점수로 정렬
    users.sort((a, b) => b.highScore - a.highScore);

    const rankingList = document.getElementById('rankingList');
    rankingList.innerHTML = '';

    if (users.length === 0 || users.every(u => u.highScore === 0)) {
        rankingList.innerHTML = '<p style="text-align: center; color: #999;">아직 기록된 점수가 없습니다.</p>';
    } else {
        users.forEach((user, index) => {
            if (user.highScore > 0) {
                const rankingItem = document.createElement('div');
                rankingItem.className = `ranking-item ${index < 3 ? 'rank-' + (index + 1) : ''}`;

                rankingItem.innerHTML = `
                    <span class="ranking-rank">${index + 1}</span>
                    <div class="ranking-info">
                        <div class="ranking-username">${user.username}${user.isAdmin ? ' 👑' : ''}</div>
                    </div>
                    <span class="ranking-score">${user.highScore.toLocaleString()}</span>
                `;

                rankingList.appendChild(rankingItem);
            }
        });
    }

    document.getElementById('rankingModal').style.display = 'flex';
}

// 랭킹 모달 닫기
function closeRanking() {
    document.getElementById('rankingModal').style.display = 'none';
}

// 게임 방법 보기
function showHelp() {
    document.getElementById('helpModal').style.display = 'flex';
}

// 게임 방법 모달 닫기
function closeHelp() {
    document.getElementById('helpModal').style.display = 'none';
}

// 로그아웃
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// AI 가이드 업데이트
function updateAISuggestion() {
    if (!gameAI || !currentUser.isAdmin) return;

    const bestMove = gameAI.getBestMove(board);
    const suggestionText = bestMove ? gameAI.getDirectionText(bestMove) : '없음';
    document.getElementById('aiSuggestion').textContent = suggestionText;
}

// 자동 가이드 토글
function toggleAutoGuide() {
    autoGuideEnabled = !autoGuideEnabled;

    if (autoGuideEnabled) {
        // 2초마다 최적의 수 실행
        autoGuideInterval = setInterval(() => {
            if (isGameOver()) {
                toggleAutoGuide();
                document.getElementById('autoGuide').checked = false;
                return;
            }

            const bestMove = gameAI.getBestMove(board);
            if (bestMove) {
                let moved = false;

                switch (bestMove) {
                    case 'up':
                        moved = moveUp();
                        break;
                    case 'down':
                        moved = moveDown();
                        break;
                    case 'left':
                        moved = moveLeft();
                        break;
                    case 'right':
                        moved = moveRight();
                        break;
                }

                if (moved) {
                    // 방향 애니메이션 표시
                    showDirectionAnimation(bestMove);

                    addRandomTile();
                    renderBoard();
                    updateScore();
                    updateAISuggestion();

                    if (isGameOver()) {
                        endGame();
                    }
                }
            }
        }, 500); // 0.5초마다 실행 (빠른 플레이)
    } else {
        if (autoGuideInterval) {
            clearInterval(autoGuideInterval);
            autoGuideInterval = null;
        }
    }
}

// 방향 애니메이션 표시
function showDirectionAnimation(direction) {
    const overlay = document.getElementById('directionOverlay');
    const arrow = overlay.querySelector('.direction-arrow');
    const gameBoard = document.getElementById('gameBoard');

    // 화살표 아이콘 설정
    const arrows = {
        'up': '↑',
        'down': '↓',
        'left': '←',
        'right': '→'
    };
    arrow.textContent = arrows[direction];

    // 보드 이동 애니메이션
    gameBoard.classList.remove('move-up', 'move-down', 'move-left', 'move-right');
    void gameBoard.offsetWidth; // 리플로우 강제 실행
    gameBoard.classList.add(`move-${direction}`);

    // 오버레이 표시
    overlay.classList.add('show');

    // 애니메이션 종료 후 클래스 제거
    setTimeout(() => {
        overlay.classList.remove('show');
        gameBoard.classList.remove(`move-${direction}`);
    }, 500);
}

// 실시간 랭킹 업데이트
function updateLiveRanking() {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // 현재 진행 중인 점수도 고려해서 임시 사용자 목록 생성
    const tempUsers = users.map(user => {
        if (user.username === currentUser.username) {
            return {
                ...user,
                highScore: Math.max(user.highScore, score)
            };
        }
        return user;
    });

    // 점수로 정렬
    tempUsers.sort((a, b) => b.highScore - a.highScore);

    const liveRankingList = document.getElementById('liveRankingList');
    liveRankingList.innerHTML = '';

    // 점수가 있는 사용자만 표시 (상위 10명)
    const topUsers = tempUsers.filter(u => u.highScore > 0).slice(0, 10);

    if (topUsers.length === 0) {
        liveRankingList.innerHTML = '<div class="empty-ranking">아직 기록된 점수가 없습니다</div>';
        return;
    }

    topUsers.forEach((user, index) => {
        const rankingItem = document.createElement('div');
        const rankClass = index < 3 ? ` rank-${index + 1}` : '';
        const currentUserClass = user.username === currentUser.username ? ' current-user' : '';

        rankingItem.className = `live-ranking-item${rankClass}${currentUserClass}`;

        let rankDisplay = index + 1;
        if (index === 0) rankDisplay = '🥇';
        else if (index === 1) rankDisplay = '🥈';
        else if (index === 2) rankDisplay = '🥉';

        rankingItem.innerHTML = `
            <span class="live-ranking-rank">${rankDisplay}</span>
            <div class="live-ranking-info">
                <div class="live-ranking-username">${user.username}${user.isAdmin ? ' 👑' : ''}${currentUserClass ? ' (나)' : ''}</div>
            </div>
            <span class="live-ranking-score">${user.highScore.toLocaleString()}</span>
        `;

        liveRankingList.appendChild(rankingItem);
    });
}
