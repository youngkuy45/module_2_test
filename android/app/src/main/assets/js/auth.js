// 사용자 인증 관리

// 초기 관리자 계정 설정
function initializeAdmin() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const adminExists = users.some(user => user.username === 'admin');

    if (!adminExists) {
        users.push({
            username: 'admin',
            password: 'admin123',
            isAdmin: true,
            highScore: 0
        });
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// 페이지 로드 시 관리자 계정 초기화
initializeAdmin();

// 로그인 폼 표시
function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
}

// 회원가입 폼 표시
function showRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

// 회원가입 처리
function handleRegister(event) {
    event.preventDefault();

    const username = document.getElementById('registerUsername').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    // 유효성 검사
    if (username.length < 3) {
        alert('사용자명은 최소 3자 이상이어야 합니다.');
        return;
    }

    if (password.length < 6) {
        alert('비밀번호는 최소 6자 이상이어야 합니다.');
        return;
    }

    if (password !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    // 기존 사용자 확인
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        alert('이미 존재하는 사용자명입니다.');
        return;
    }

    // 새 사용자 추가
    users.push({
        username: username,
        password: password,
        isAdmin: false,
        highScore: 0
    });

    localStorage.setItem('users', JSON.stringify(users));
    alert('회원가입이 완료되었습니다!');
    showLogin();

    // 폼 초기화
    document.getElementById('registerUsername').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('registerConfirmPassword').value = '';
}

// 로그인 처리
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        alert('사용자명 또는 비밀번호가 올바르지 않습니다.');
        return;
    }

    // 현재 사용자 세션 저장
    localStorage.setItem('currentUser', JSON.stringify(user));

    // 게임 페이지로 이동
    window.location.href = 'game.html';
}
