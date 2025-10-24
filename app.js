// 主页 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 核心功能优先加载
    loadPlayers();
    loadSettings();
    initNavigation();
    initAdminAccess();
    initResetShortcut(); // 初始化重置快捷键
    
    // 动画和交互功能延迟加载
    requestAnimationFrame(() => {
        initScrollAnimations();
        initParticles();
        initHeroAnimations();
        initScrollProgress();
        initBackToTop();
        initKeyboardNavigation();
        initCustomCursor();
        initParticleNetwork();
        initWaveGlitchEffect(); // 初始化常驻波浪Glitch效果
        initStatCounters(); // 初始化数据统计动画
    });
});

// 初始化管理员访问（双击页脚）
function initAdminAccess() {
    const footer = document.getElementById('footer');
    let clickCount = 0;
    let clickTimer;
    
    footer.addEventListener('click', function() {
        clickCount++;
        
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 500);
        
        if (clickCount === 2) {
            // 双击检测
            clickCount = 0;
            window.location.href = 'admin.html';
        }
    });
}

// 初始化重置快捷键（Ctrl+Shift+R 重新加载默认数据）
function initResetShortcut() {
    document.addEventListener('keydown', function(e) {
        // Ctrl+Shift+R 重置数据
        if (e.ctrlKey && e.shiftKey && e.key === 'R') {
            e.preventDefault();
            if (confirm('确定要重新加载默认陪玩师数据吗？这将清除所有自定义数据！')) {
                localStorage.removeItem('players');
                localStorage.removeItem('settings');
                alert('✅ 数据已重置！页面即将刷新...');
                setTimeout(() => {
                    location.reload();
                }, 500);
            }
        }
    });
    
    // 添加一个隐藏的重置按钮（三击页脚文字）
    const footerText = document.querySelector('.footer-bottom p');
    if (footerText) {
        let clickCount = 0;
        let clickTimer;
        
        footerText.addEventListener('click', function(e) {
            clickCount++;
            
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 800);
            
            if (clickCount === 3) {
                clickCount = 0;
                if (confirm('🔄 检测到三连击！\n\n是否重新加载默认陪玩师数据？')) {
                    localStorage.removeItem('players');
                    localStorage.removeItem('settings');
                    alert('✅ 数据已重置！页面即将刷新...');
                    setTimeout(() => {
                        location.reload();
                    }, 500);
                }
            }
        });
    }
}

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 性能优化：节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}


// 初始化滚动进度条
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    
    // 使用节流优化滚动事件
    const updateProgress = throttle(function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrollPercent + '%';
        }
    }, 16); // 约60fps
    
    window.addEventListener('scroll', updateProgress);
}

// 初始化滚动到底部按钮
function initBackToTop() {
    const scrollBtn = document.getElementById('scroll-to-bottom');
    
    if (scrollBtn) {
        // 监听滚动事件
        window.addEventListener('scroll', function() {
            // 判断是否接近底部（距离底部200px以内）
            const scrolledToBottom = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 200;
            
            if (window.pageYOffset > 300 && !scrolledToBottom) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        // 点击滚动到底部
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        });
    }
}

// 初始化键盘导航
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC键回到顶部
        if (e.key === 'Escape') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // 数字键快速导航
        if (e.key >= '1' && e.key <= '3') {
            const sections = ['#home', '#players', '#contact'];
            const targetSection = sections[parseInt(e.key) - 1];
            const targetElement = document.querySelector(targetSection);
            
            if (targetElement) {
                const offset = 80;
                const targetPosition = targetElement.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
        
        // 空格键暂停/恢复动画
        if (e.key === ' ') {
            e.preventDefault();
            toggleAnimations();
        }
    });
}

// 切换动画播放/暂停
function toggleAnimations() {
    const style = document.createElement('style');
    style.id = 'animation-toggle';
    
    if (document.getElementById('animation-toggle')) {
        document.getElementById('animation-toggle').remove();
    } else {
        style.textContent = `
            *, *::before, *::after {
                animation-play-state: paused !important;
            }
        `;
        document.head.appendChild(style);
    }
}



// 初始化导航栏
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item:not(.nav-admin)');
    const navbar = document.querySelector('.navbar');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // 移除所有 active 类
                    navItems.forEach(nav => nav.classList.remove('active'));
                    // 添加 active 到当前项
                    this.classList.add('active');
                    
                    // 平滑滚动
                    const offset = 80; // 导航栏高度
                    const targetPosition = targetElement.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // 滚动时更新导航栏激活状态和样式（使用节流优化）
    const updateNavbar = throttle(function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        // 添加滚动后的样式
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    }, 16);
    
    window.addEventListener('scroll', updateNavbar);
}

// 初始化滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察所有玩家卡片
    setTimeout(() => {
        const cards = document.querySelectorAll('.player-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.08}s`;
            observer.observe(card);
        });
    }, 100);
    
    // 设备卡片滚动聚焦动画
    initEquipmentAnimation();
}

// 设备展示区滚动动画
function initEquipmentAnimation() {
    const equipmentCards = document.querySelectorAll('.equipment-card');
    
    if (equipmentCards.length === 0) return;
    
    const equipmentObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 添加 in-view 类触发动画
                setTimeout(() => {
                    entry.target.classList.add('in-view');
                }, index * 120); // 依次出现，更流畅
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -30px 0px'
    });
    
    equipmentCards.forEach(card => {
        equipmentObserver.observe(card);
    });
}

// 加载陪玩师数据
function loadPlayers() {
    const players = getPlayers();
    const playersGrid = document.getElementById('playersGrid');
    
    if (!playersGrid) return;
    
    if (players.length === 0) {
        playersGrid.innerHTML = `
            <div class="empty-state">
                <p>✨ 暂无陪玩师信息</p>
                <p style="margin-top: 20px; font-size: 0.9em;">请前往管理后台添加陪玩师</p>
            </div>
        `;
        return;
    }
    
    playersGrid.innerHTML = players.map(player => `
        <div class="player-card ${player.isHot ? 'hot-player' : ''}" data-player-id="${player.id}">
            <div class="mouse-follower"></div>
            <!-- 照片轮播区域 -->
            <div class="player-photos">
                <div class="photo-main" onclick="openPhotoGallery('${player.id}')" style="cursor: pointer;">
                    <img src="${player.image || 'https://via.placeholder.com/350x320?text=陪玩师'}" 
                         alt="${player.name}" 
                         class="player-image"
                         onerror="this.src='https://via.placeholder.com/350x320?text=陪玩师'">
                    <div class="photo-overlay">
                        <div class="photo-count">${(player.photos || []).length + 1} 张照片</div>
                        <button class="photo-gallery-btn" onclick="event.stopPropagation(); openPhotoGallery('${player.id}')">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M2 6C2 4.89543 2.89543 4 4 4H16C17.1046 4 18 4.89543 18 6V14C18 15.1046 17.1046 16 16 16H4C2.89543 16 2 15.1046 2 14V6Z" stroke="currentColor" stroke-width="2"/>
                                <path d="M6 8C6.55228 8 7 7.55228 7 7C7 6.44772 6.55228 6 6 6C5.44772 6 5 6.44772 5 7C5 7.55228 5.44772 8 6 8Z" stroke="currentColor" stroke-width="2"/>
                                <path d="M2 12L6 8L10 12L14 8L18 12" stroke="currentColor" stroke-width="2"/>
                            </svg>
                            查看照片
                        </button>
                    </div>
                </div>
                
                <!-- 评分和价格标签 -->
                <div class="player-badges">
                    ${player.rating ? `<div class="rating-badge">⭐ ${player.rating}</div>` : ''}
                    ${player.price ? `<div class="price-badge">${player.price}</div>` : ''}
                    ${player.orders ? `<div class="orders-badge">${player.orders}单</div>` : ''}
                </div>
            </div>
            
            <div class="player-info">
                <div class="player-header">
                    <h3 class="player-name">${player.name}</h3>
                    <div class="player-status online">在线</div>
                </div>
                
                <!-- 专长标签 -->
                ${player.specialty && player.specialty.length > 0 ? `
                <div class="specialty-tags">
                    ${player.specialty.map(specialty => `<span class="specialty-tag">${specialty}</span>`).join('')}
                </div>
                ` : ''}
                
                <div class="info-item">
                    <span class="info-label">🎮 可接端游</span>
                    <div class="games-list">
                        ${player.games.map(game => `<span class="tag">${game}</span>`).join('')}
                    </div>
                </div>
                
                <div class="info-item">
                    <span class="info-label">⏰ 可接时间</span>
                    <div class="info-content">${player.time}</div>
                </div>
                
                <div class="info-item">
                    <span class="info-label">💬 自我介绍</span>
                    <div class="info-content">${player.intro}</div>
                </div>
                
                <div class="info-item">
                    <span class="info-label">✨ 偶遇可接业务</span>
                    <div class="services-list">
                        ${player.services.map(service => `<span class="tag">${service}</span>`).join('')}
                    </div>
                </div>
                
                <!-- 行动按钮 -->
                <div class="player-actions">
                    <button class="action-btn primary" onclick="contactPlayer('${player.id}')">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                            <path d="M2 3H6C7.10457 3 8 3.89543 8 5V15C8 16.1046 7.10457 17 6 17H2C0.895431 17 0 16.1046 0 15V5C0 3.89543 0.895431 3 2 3Z" stroke="currentColor" stroke-width="2"/>
                            <path d="M8 7H18C19.1046 7 20 7.89543 20 9V19C20 20.1046 19.1046 21 18 21H8V7Z" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        立即预约
                    </button>
                    <button class="action-btn secondary" onclick="openPhotoGallery('${player.id}')">
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                            <path d="M2 6C2 4.89543 2.89543 4 4 4H16C17.1046 4 18 4.89543 18 6V14C18 15.1046 17.1046 16 16 16H4C2.89543 16 2 15.1046 2 14V6Z" stroke="currentColor" stroke-width="2"/>
                            <path d="M6 8C6.55228 8 7 7.55228 7 7C7 6.44772 6.55228 6 6 6C5.44772 6 5 6.44772 5 7C5 7.55228 5.44772 8 6 8Z" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        查看照片
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // 重新初始化滚动动画
    initScrollAnimations();
    
    // 添加卡片鼠标跟随效果
    setTimeout(() => {
        const cards = document.querySelectorAll('.player-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const mouseFollower = card.querySelector('.mouse-follower');
                if (mouseFollower) {
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    mouseFollower.style.left = x + 'px';
                    mouseFollower.style.top = y + 'px';
                }
            });
            
            // 添加visible class触发入场动画
            setTimeout(() => {
                card.classList.add('visible');
            }, Math.random() * 500);
        });
    }, 100);
}

// 加载设置（二维码）
function loadSettings() {
    const settings = getSettings();
    const qrCodeImg = document.querySelector('.qr-code');
    
    if (qrCodeImg && settings.qrCodeUrl) {
        qrCodeImg.src = settings.qrCodeUrl;
        qrCodeImg.onerror = function() {
            this.src = 'https://via.placeholder.com/220x220?text=QR+Code';
        };
    }
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

// 打开照片画廊
function openPhotoGallery(playerId) {
    const players = getPlayers();
    const player = players.find(p => p.id === playerId);
    
    if (!player) return;
    
    const photos = [player.image, ...(player.photos || [])].filter(url => url);
    
    if (photos.length === 0) {
        alert('暂无照片');
        return;
    }
    
    // 隐藏自定义光标
    const customCursor = document.querySelector('.custom-cursor');
    const cursorTrail = document.querySelector('.cursor-trail');
    if (customCursor) customCursor.style.display = 'none';
    if (cursorTrail) cursorTrail.style.display = 'none';
    
    // 创建画廊模态框
    const gallery = document.createElement('div');
    gallery.className = 'photo-gallery-modal';
    gallery.innerHTML = `
        <div class="gallery-overlay" onclick="closePhotoGallery()"></div>
        <div class="gallery-content">
            <div class="gallery-header">
                <h3>${player.name} 的照片</h3>
                <button class="gallery-close" onclick="closePhotoGallery()">×</button>
            </div>
            <div class="gallery-main">
                <div class="gallery-image-container" id="gallery-image-container">
                    <img id="gallery-main-image" src="${photos[0]}" alt="${player.name}">
                    <div class="gallery-counter">1 / ${photos.length}</div>
                </div>
                <button class="gallery-nav prev" onclick="prevPhoto()">‹</button>
                <button class="gallery-nav next" onclick="nextPhoto()">›</button>
            </div>
            <div class="gallery-thumbnails">
                ${photos.map((photo, index) => `
                    <img src="${photo}" alt="照片 ${index + 1}" 
                         class="thumbnail ${index === 0 ? 'active' : ''}" 
                         onclick="showPhoto(${index})">
                `).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(gallery);
    document.body.style.overflow = 'hidden';
    
    // 存储当前画廊状态
    window.currentGallery = {
        photos: photos,
        currentIndex: 0,
        playerName: player.name
    };
    
    // 添加触摸手势支持
    addSwipeGestures(gallery);
    
    // 添加图片加载监听
    addImageLoadListener();
}

// 添加触摸手势支持
function addSwipeGestures(element) {
    let touchStartX = 0;
    let touchEndX = 0;
    
    element.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    element.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // 向右滑动 - 下一张
                nextPhoto();
            } else {
                // 向左滑动 - 上一张
                prevPhoto();
            }
        }
    }
}

// 添加图片加载监听
function addImageLoadListener() {
    const img = document.getElementById('gallery-main-image');
    const container = document.getElementById('gallery-image-container');
    
    if (!img || !container) return;
    
    img.addEventListener('loadstart', function() {
        container.classList.add('loading');
    });
    
    img.addEventListener('load', function() {
        container.classList.remove('loading');
    });
    
    img.addEventListener('error', function() {
        container.classList.remove('loading');
    });
}

// 关闭照片画廊
function closePhotoGallery() {
    const gallery = document.querySelector('.photo-gallery-modal');
    if (gallery) {
        // 恢复自定义光标
        const customCursor = document.querySelector('.custom-cursor');
        const cursorTrail = document.querySelector('.cursor-trail');
        if (customCursor) customCursor.style.display = '';
        if (cursorTrail) cursorTrail.style.display = '';
        
        gallery.remove();
        document.body.style.overflow = '';
        window.currentGallery = null;
    }
}

// 显示指定照片
function showPhoto(index) {
    if (!window.currentGallery) return;
    
    const mainImage = document.getElementById('gallery-main-image');
    const container = document.getElementById('gallery-image-container');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const counter = document.querySelector('.gallery-counter');
    
    if (mainImage && window.currentGallery.photos[index]) {
        const currentIndex = window.currentGallery.currentIndex;
        const isNext = index > currentIndex;
        
        // 移除之前的动画类
        container.classList.remove('slide-next', 'slide-prev');
        
        // 添加滑动动画类
        if (index !== currentIndex) {
            container.classList.add(isNext ? 'slide-next' : 'slide-prev');
        }
        
        // 更新图片
        mainImage.src = window.currentGallery.photos[index];
        window.currentGallery.currentIndex = index;
        
        // 更新计数器
        if (counter) {
            counter.textContent = `${index + 1} / ${window.currentGallery.photos.length}`;
        }
        
        // 更新缩略图状态并滚动到可见区域
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
            if (i === index) {
                thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        });
    }
}

// 上一张照片
function prevPhoto() {
    if (!window.currentGallery) return;
    
    const prevIndex = window.currentGallery.currentIndex > 0 
        ? window.currentGallery.currentIndex - 1 
        : window.currentGallery.photos.length - 1;
    
    showPhoto(prevIndex);
}

// 下一张照片
function nextPhoto() {
    if (!window.currentGallery) return;
    
    const nextIndex = window.currentGallery.currentIndex < window.currentGallery.photos.length - 1 
        ? window.currentGallery.currentIndex + 1 
        : 0;
    
    showPhoto(nextIndex);
}

// 联系陪玩师 - 简化版
function contactPlayer(playerId) {
    const players = getPlayers();
    const player = players.find(p => p.id === playerId);
    
    if (!player) return;
    
    // 创建简化联系模态框
    const contactModal = document.createElement('div');
    contactModal.className = 'contact-modal';
    contactModal.innerHTML = `
        <div class="modal-overlay" onclick="closeContactModal()"></div>
        <div class="modal-content contact-simple">
            <div class="modal-header">
                <h3>✨ 联系 ${player.name}</h3>
                <button class="modal-close" onclick="closeContactModal()">×</button>
            </div>
            <div class="modal-body">
                <div class="player-summary">
                    <img src="${player.image}" alt="${player.name}" class="player-avatar">
                    <div class="summary-info">
                        <h4>${player.name}</h4>
                        <p class="price-text">${player.price || '价格面议'}</p>
                    </div>
                </div>
                <div class="contact-methods">
                    <p class="contact-prompt">📱 扫码添加微信好友即可开始</p>
                    <div class="qr-code-container">
                        <img src="${getSettings().qrCodeUrl || 'qrcode-sekai.png'}" 
                             alt="联系二维码" class="contact-qr">
                    </div>
                    <div class="quick-tip">
                        <p>💬 添加好友后，直接说明想约"${player.name}"陪玩即可！</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(contactModal);
    document.body.style.overflow = 'hidden';
}

// 关闭联系模态框
function closeContactModal() {
    const modal = document.querySelector('.contact-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// 键盘事件处理
document.addEventListener('keydown', function(e) {
    if (window.currentGallery) {
        if (e.key === 'Escape') {
            closePhotoGallery();
        } else if (e.key === 'ArrowLeft') {
            prevPhoto();
        } else if (e.key === 'ArrowRight') {
            nextPhoto();
        }
    }
});

// 初始化粒子效果
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    // 创建20个粒子
    for (let i = 0; i < 20; i++) {
        createParticle(container, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // 随机位置
    const startX = Math.random() * 100;
    particle.style.left = startX + '%';
    particle.style.bottom = '0';
    
    // 随机延迟
    const delay = Math.random() * 6;
    particle.style.animationDelay = delay + 's';
    
    // 随机颜色（更多色彩）
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff6600'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;
    particle.style.boxShadow = `0 0 20px ${color}, 0 0 40px ${color}`;
    
    // 随机大小
    const size = 3 + Math.random() * 5;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    container.appendChild(particle);
    
    // 粒子完成动画后重新创建
    particle.addEventListener('animationiteration', function() {
        particle.style.left = Math.random() * 100 + '%';
        const newColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = newColor;
        particle.style.boxShadow = `0 0 20px ${newColor}, 0 0 40px ${newColor}`;
    });
}

// 初始化Hero区域动画
function initHeroAnimations() {
    const heroSection = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-content');
    if (!heroSection) return;
    
    // 鼠标移动视差效果（使用节流优化）
    const handleMouseMove = throttle(function(e) {
        const cards = document.querySelectorAll('.floating-card');
        const circles = document.querySelectorAll('.light-circle');
        
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Hero内容3D倾斜
        if (heroContent) {
            const rotateX = (mouseY - 0.5) * 10;
            const rotateY = (mouseX - 0.5) * -10;
            heroContent.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
        
        cards.forEach((card, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            card.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        circles.forEach((circle, index) => {
            const speed = (index + 1) * 10;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            circle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        });
    }, 16);
    
    heroSection.addEventListener('mousemove', handleMouseMove);
    
    // 滚动时按钮跳动提示
    const heroBtn = document.querySelector('.hero-btn');
    if (heroBtn) {
        let scrollTimeout;
        // 使用节流优化滚动事件
        const handleScroll = throttle(function() {
            clearTimeout(scrollTimeout);
            if (window.scrollY < 100) {
                scrollTimeout = setTimeout(() => {
                    heroBtn.style.animation = 'bounce 0.5s ease';
                    setTimeout(() => {
                        heroBtn.style.animation = '';
                    }, 500);
                }, 3000);
            }
        }, 100);
        
        window.addEventListener('scroll', handleScroll);
    }
}

// 按钮跳动动画
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

// 初始化自定义光标
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const trail = document.querySelector('.cursor-trail');
    
    if (!cursor || !trail) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let trailX = 0, trailY = 0;
    
    // 鼠标移动事件
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // 平滑跟随动画
    function animateCursor() {
        // 光标平滑跟随
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // 拖尾延迟跟随
        trailX += (mouseX - trailX) * 0.05;
        trailY += (mouseY - trailY) * 0.05;
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // 悬停时放大光标
    const hoverElements = document.querySelectorAll('a, button, .player-card, .nav-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            trail.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            trail.classList.remove('active');
        });
    });
}

// 初始化粒子连线网络
function initParticleNetwork() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // 粒子数组
    const particles = [];
    const particleCount = 50;
    
    // 创建粒子
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // 边界反弹
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, ${0.5})`;
            ctx.fill();
        }
    }
    
    // 初始化粒子
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // 绘制连线
    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const opacity = (150 - distance) / 150 * 0.3;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawLines();
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // 窗口大小改变时重置画布
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// 🌊 初始化常驻波浪Glitch效果
function initWaveGlitchEffect() {
    console.log('🌊 常驻波浪Glitch效果已启动');
    
    // 可选：添加键盘控制来调节波浪强度
    let waveIntensity = 5; // 默认强度 (0-10)
    
    document.addEventListener('keydown', function(e) {
        // 按 W 键增加波浪强度
        if (e.key.toLowerCase() === 'w') {
            waveIntensity = Math.min(10, waveIntensity + 1);
            updateWaveIntensity(waveIntensity);
            showNotification(`波浪强度: ${waveIntensity}/10`);
        }
        // 按 Q 键减少波浪强度
        else if (e.key.toLowerCase() === 'q') {
            waveIntensity = Math.max(0, waveIntensity - 1);
            updateWaveIntensity(waveIntensity);
            showNotification(`波浪强度: ${waveIntensity}/10`);
        }
        // 按 R 键重置为默认强度
        else if (e.key.toLowerCase() === 'r') {
            waveIntensity = 5;
            updateWaveIntensity(waveIntensity);
            showNotification('波浪强度已重置');
        }
    });
    
    // 初始化默认强度
    updateWaveIntensity(waveIntensity);
}

// 更新波浪强度
function updateWaveIntensity(intensity) {
    const scanlineOverlay = document.querySelector('.scanline-overlay');
    
    if (scanlineOverlay) {
        // 根据强度调整扫描线不透明度
        const opacity = intensity / 100; // 0.00 到 0.10
        scanlineOverlay.style.opacity = opacity;
    }
    
    // 可选：调整动画速度
    const root = document.documentElement;
    const speed = Math.max(0.5, 2 - (intensity / 10)); // 强度越高，速度越快
    root.style.setProperty('--wave-speed', `${speed}s`);
}

// 显示通知
function showNotification(message) {
    // 移除旧通知
    const oldNotif = document.querySelector('.glitch-notification');
    if (oldNotif) oldNotif.remove();
    
    const notification = document.createElement('div');
    notification.className = 'glitch-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: rgba(0, 255, 255, 0.9);
        color: #000;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // 3秒后移除
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// 添加通知动画样式
const notifStyle = document.createElement('style');
notifStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notifStyle);

// 📊 初始化数据统计动画
function initStatCounters() {
    const statCards = document.querySelectorAll('.stat-card');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValue = entry.target.querySelector('.stat-value');
                if (statValue && !statValue.classList.contains('counted')) {
                    animateCounter(statValue);
                    statValue.classList.add('counted');
                }
            }
        });
    }, observerOptions);
    
    statCards.forEach(card => observer.observe(card));
}

// 数字递增动画
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2秒
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

