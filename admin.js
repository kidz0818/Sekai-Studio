// 管理后台 JavaScript
// 管理员密码（默认密码，建议修改）
const ADMIN_PASSWORD = 'admin123';

document.addEventListener('DOMContentLoaded', function() {
    // 检查是否已经验证过密码
    const isVerified = sessionStorage.getItem('adminVerified');
    
    if (!isVerified) {
        // 显示密码保护界面
        document.getElementById('passwordProtection').style.display = 'flex';
        document.getElementById('adminContent').style.display = 'none';
        
        // 回车键提交密码
        document.getElementById('adminPassword').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPassword();
            }
        });
    } else {
        // 已经验证，直接显示内容
        document.getElementById('passwordProtection').style.display = 'none';
        document.getElementById('adminContent').style.display = 'block';
        initAdminPanel();
    }
});

// 验证密码
function checkPassword() {
    const password = document.getElementById('adminPassword').value;
    const hint = document.querySelector('.password-hint');
    
    if (password === ADMIN_PASSWORD) {
        // 密码正确
        sessionStorage.setItem('adminVerified', 'true');
        document.getElementById('passwordProtection').style.display = 'none';
        document.getElementById('adminContent').style.display = 'block';
        initAdminPanel();
    } else {
        // 密码错误
        hint.textContent = '❌ 密码错误，请重试';
        hint.style.color = '#ff4444';
        document.getElementById('adminPassword').value = '';
        document.getElementById('adminPassword').focus();
    }
}

// 初始化管理面板
function initAdminPanel() {
    loadPlayersList();
    loadSettingsForm();
    
    // 表单提交事件
    document.getElementById('playerForm').addEventListener('submit', savePlayer);
    document.getElementById('settingsForm').addEventListener('submit', saveSettings);
}

// 保存陪玩师信息
function savePlayer(e) {
    e.preventDefault();
    
    const playerId = document.getElementById('playerId').value;
    const player = {
        id: playerId || Date.now().toString(),
        name: document.getElementById('playerName').value,
        image: document.getElementById('playerImage').value || 'https://via.placeholder.com/300x300?text=陪玩师',
        photos: document.getElementById('playerPhotos').value.split('\n').filter(url => url.trim()).slice(0, 5),
        price: document.getElementById('playerPrice').value,
        rating: parseFloat(document.getElementById('playerRating').value),
        orders: parseInt(document.getElementById('playerOrders').value),
        specialty: document.getElementById('playerSpecialty').value.split(',').map(s => s.trim()),
        games: document.getElementById('playerGames').value.split(',').map(g => g.trim()),
        time: document.getElementById('playerTime').value,
        intro: document.getElementById('playerIntro').value,
        services: document.getElementById('playerServices').value.split(',').map(s => s.trim())
    };
    
    let players = getPlayers();
    
    if (playerId) {
        // 编辑现有陪玩师
        const index = players.findIndex(p => p.id === playerId);
        if (index !== -1) {
            players[index] = player;
        }
    } else {
        // 添加新陪玩师
        players.push(player);
    }
    
    localStorage.setItem('players', JSON.stringify(players));
    
    showSuccessMessage('保存成功！');
    resetForm();
    loadPlayersList();
}

// 重置表单
function resetForm() {
    document.getElementById('playerForm').reset();
    document.getElementById('playerId').value = '';
}

// 加载陪玩师列表
function loadPlayersList() {
    const players = getPlayers();
    const playersList = document.getElementById('playersList');
    
    if (!playersList) return;
    
    if (players.length === 0) {
        playersList.innerHTML = `
            <div class="empty-state">
                <p>暂无陪玩师信息</p>
            </div>
        `;
        return;
    }
    
    playersList.innerHTML = players.map(player => `
        <div class="player-list-item">
            <div class="player-list-info">
                <h3>${player.name}</h3>
                <p>游戏: ${player.games.join(', ')}</p>
                <p>时间: ${player.time}</p>
            </div>
            <div class="player-list-actions">
                <button class="btn btn-edit" onclick="editPlayer('${player.id}')">编辑</button>
                <button class="btn btn-danger" onclick="deletePlayer('${player.id}')">删除</button>
            </div>
        </div>
    `).join('');
}

// 编辑陪玩师
function editPlayer(id) {
    const players = getPlayers();
    const player = players.find(p => p.id === id);
    
    if (!player) return;
    
    document.getElementById('playerId').value = player.id;
    document.getElementById('playerName').value = player.name;
    document.getElementById('playerImage').value = player.image;
    document.getElementById('playerPhotos').value = (player.photos || []).join('\n');
    document.getElementById('playerPrice').value = player.price || '';
    document.getElementById('playerRating').value = player.rating || '';
    document.getElementById('playerOrders').value = player.orders || '';
    document.getElementById('playerSpecialty').value = (player.specialty || []).join(', ');
    document.getElementById('playerGames').value = player.games.join(', ');
    document.getElementById('playerTime').value = player.time;
    document.getElementById('playerIntro').value = player.intro;
    document.getElementById('playerServices').value = player.services.join(', ');
    
    // 滚动到表单
    document.getElementById('playerForm').scrollIntoView({ behavior: 'smooth' });
}

// 删除陪玩师
function deletePlayer(id) {
    if (!confirm('确定要删除这个陪玩师吗？')) return;
    
    let players = getPlayers();
    players = players.filter(p => p.id !== id);
    localStorage.setItem('players', JSON.stringify(players));
    
    showSuccessMessage('删除成功！');
    loadPlayersList();
}

// 保存设置
function saveSettings(e) {
    e.preventDefault();
    
    const settings = {
        qrCodeUrl: document.getElementById('qrCodeUrl').value || 'https://via.placeholder.com/200x200?text=QR+Code'
    };
    
    localStorage.setItem('settings', JSON.stringify(settings));
    showSuccessMessage('设置保存成功！');
}

// 加载设置表单
function loadSettingsForm() {
    const settings = getSettings();
    if (settings.qrCodeUrl) {
        document.getElementById('qrCodeUrl').value = settings.qrCodeUrl;
    }
}

// 显示成功消息
function showSuccessMessage(message) {
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.textContent = message;
    
    const container = document.getElementById('adminContent');
    if (container) {
        container.insertBefore(messageDiv, container.firstChild);
    }
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// 从本地存储获取陪玩师数据
function getPlayers() {
    const players = localStorage.getItem('players');
    if (players) {
        return JSON.parse(players);
    }
    // 如果没有 localStorage 数据，使用默认数据（首次访问或部署后）
    if (typeof DEFAULT_PLAYERS !== 'undefined') {
        return DEFAULT_PLAYERS;
    }
    return [];
}

// 从本地存储获取设置
function getSettings() {
    const settings = localStorage.getItem('settings');
    if (settings) {
        return JSON.parse(settings);
    }
    // 如果没有 localStorage 数据，使用默认设置
    if (typeof DEFAULT_SETTINGS !== 'undefined') {
        return DEFAULT_SETTINGS;
    }
    return { qrCodeUrl: '' };
}

