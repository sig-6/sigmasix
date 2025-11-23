// sigma-rate.js
document.addEventListener('DOMContentLoaded', function() {
    // API Configuration
    const API_KEY = 'CG-BWkKK1td7kRcZjpQtcP1GAU8';
    const CONTRACT_ADDRESS = '0xf3e9c6111c79cf857e6bb89988abdf1680aa8c79';
    const COIN_ID = 'polygon-pos';
    const USD_TO_INR_RATE = 86.9; // USD to INR conversion rate
    
    // DOM Elements
    const currentPriceElement = document.getElementById('current-price');
    const inrPriceElement = document.getElementById('inr-price');
    const launchPriceElement = document.getElementById('launch-price');
    const allTimeHighElement = document.getElementById('all-time-high');
    const marketCapElement = document.getElementById('market-cap');
    const holdersElement = document.getElementById('holders');
    const lastUpdateElement = document.getElementById('last-update');
    const copyButton = document.getElementById('copy-btn');
    
    // Income Tables
    const icoBonusTable = document.getElementById('ico-bonus-table');
    const directReferralTable = document.getElementById('direct-referral-table');
    const teamReferralTable = document.getElementById('team-referral-table');
    const awardRewardTable = document.getElementById('award-reward-table');
    const monthlyBonanzaTable = document.getElementById('monthly-bonanza-table');
    const scbProjectionTable = document.getElementById('scb-projection-table');
    
    // SCB Monthly INR Element
    const scbMonthlyINRElement = document.getElementById('scb-monthly-inr');
    
    // Income Plans Configuration
    const incomePlans = {
        icoBonus: [
            { hold: 100, get: 10 },
            { hold: 1000, get: 100 },
            { hold: 10000, get: 1000 },
            { hold: 100000, get: 10000 }
        ],
        directReferral: [
            { hold: 100, get: 10 },
            { hold: 1000, get: 100 },
            { hold: 10000, get: 1000 },
            { hold: 100000, get: 10000 }
        ],
        teamReferral: [
            { hold: 500, directPercent: 4, teamPercent: 0.2, levels: 50 },
            { hold: 1000, directPercent: 4, teamPercent: 0.2, levels: 50 },
            { hold: 1500, directPercent: 4, teamPercent: 0.2, levels: 50 },
            { hold: 2000, directPercent: 4, teamPercent: 0.2, levels: 50 },
            { hold: 2500, directPercent: 4, teamPercent: 0.2, levels: 50 }
        ],
        awardReward: [
            { teamHold: 100000, getSigma: 500, levelSigma: 50, levels: 10 },
            { teamHold: 300000, getSigma: 1000, levelSigma: 100, levels: 10 },
            { teamHold: 600000, getSigma: 1500, levelSigma: 150, levels: 10 },
            { teamHold: 1000000, getSigma: 2000, levelSigma: 200, levels: 10 },
            { teamHold: 1500000, getSigma: 2500, levelSigma: 250, levels: 10 },
            { teamHold: 2100000, getSigma: 3000, levelSigma: 300, levels: 10 },
            { teamHold: 2800000, getSigma: 3500, levelSigma: 350, levels: 10 },
            { teamHold: 3600000, getSigma: 4000, levelSigma: 400, levels: 10 },
            { teamHold: 4500000, getSigma: 4500, levelSigma: 450, levels: 10 },
            { teamHold: 5500000, getSigma: 5000, levelSigma: 500, levels: 10 }
        ],
        monthlyBonanza: [
            { selfHold: 500, directHold: 500, teamHold: 500, getSigma: 150 },
            { selfHold: 1000, directHold: 1000, teamHold: 1000, getSigma: 300 },
            { selfHold: 2500, directHold: 2500, teamHold: 2500, getSigma: 750 },
            { selfHold: 5000, directHold: 5000, teamHold: 5000, getSigma: 1500 },
            { selfHold: 10000, directHold: 10000, teamHold: 10000, getSigma: 3000 },
            { selfHold: 25000, directHold: 25000, teamHold: 25000, getSigma: 7500 },
            { selfHold: 50000, directHold: 50000, teamHold: 50000, getSigma: 15000 }
        ],
        scbProjection: [
            { targetPriceINR: 50 },
            { targetPriceINR: 100 },
            { targetPriceINR: 500 },
            { targetPriceINR: 1000 }
        ]
    };
    
    // State Variables
    let currentPrice = 0;
    
    // Initialize the application
    init();
    
    function init() {
        // Initialize Matrix background
        initMatrixBackground();
        
        // Initialize Blockchain Animation
        initBlockchainAnimation();
        
        // Set up copy button
        setupCopyButton();
        
        // Extract initial price from HTML
        extractInitialPrice();
        
        // Initialize income tables
        initializeIncomeTables();
        
        // Initialize SCB monthly INR value
        updateSCBMonthlyINR();
        
        // Set last update time
        updateLastUpdateTime();
    }
    
    // Initialize Income Tables
    function initializeIncomeTables() {
        updateICOBonusTable();
        updateDirectReferralTable();
        updateTeamReferralTable();
        updateAwardRewardTable();
        updateMonthlyBonanzaTable();
        updateSCBProjectionTable();
    }
    
    // Update all income tables with current prices
    function updateIncomeTables() {
        updateICOBonusTable();
        updateDirectReferralTable();
        updateTeamReferralTable();
        updateAwardRewardTable();
        updateMonthlyBonanzaTable();
        updateSCBProjectionTable();
        updateSCBMonthlyINR();
    }
    
    // Update ICO Bonus Table
    function updateICOBonusTable() {
        if (!icoBonusTable) return;
        icoBonusTable.innerHTML = '';
        
        incomePlans.icoBonus.forEach(plan => {
            const holdValueUSD = plan.hold * currentPrice;
            const holdValueINR = holdValueUSD * USD_TO_INR_RATE;
            const getValueUSD = plan.get * currentPrice;
            const getValueINR = getValueUSD * USD_TO_INR_RATE;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${plan.hold.toLocaleString()} SIG6</td>
                <td class="value-usd">${formatPrice(holdValueUSD)}</td>
                <td class="value-inr">${formatINRPrice(holdValueINR)}</td>
                <td>${plan.get.toLocaleString()} SIG6</td>
                <td class="value-usd">${formatPrice(getValueUSD)}</td>
                <td class="value-inr">${formatINRPrice(getValueINR)}</td>
            `;
            icoBonusTable.appendChild(row);
        });
    }
    
    // Update Direct Referral Table
    function updateDirectReferralTable() {
        if (!directReferralTable) return;
        directReferralTable.innerHTML = '';
        
        incomePlans.directReferral.forEach(plan => {
            const holdValueUSD = plan.hold * currentPrice;
            const holdValueINR = holdValueUSD * USD_TO_INR_RATE;
            const getValueUSD = plan.get * currentPrice;
            const getValueINR = getValueUSD * USD_TO_INR_RATE;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${plan.hold.toLocaleString()} SIG6</td>
                <td class="value-usd">${formatPrice(holdValueUSD)}</td>
                <td class="value-inr">${formatINRPrice(holdValueINR)}</td>
                <td>${plan.get.toLocaleString()} SIG6</td>
                <td class="value-usd">${formatPrice(getValueUSD)}</td>
                <td class="value-inr">${formatINRPrice(getValueINR)}</td>
            `;
            directReferralTable.appendChild(row);
        });
    }
    
    // Update Team Referral Table - Per Level Amount
    function updateTeamReferralTable() {
        if (!teamReferralTable) return;
        teamReferralTable.innerHTML = '';
        
        incomePlans.teamReferral.forEach(plan => {
            // Direct Benefit (4%)
            const directBenefitSigma = (plan.hold * plan.directPercent) / 100;
            const directBenefitUSD = directBenefitSigma * currentPrice;
            const directBenefitINR = directBenefitUSD * USD_TO_INR_RATE;
            
            // Team Benefit PER LEVEL (0.2% per level)
            const teamBenefitPerLevelSigma = (plan.hold * plan.teamPercent) / 100;
            const teamBenefitPerLevelUSD = teamBenefitPerLevelSigma * currentPrice;
            const teamBenefitPerLevelINR = teamBenefitPerLevelUSD * USD_TO_INR_RATE;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${plan.hold.toLocaleString()} SIG6</td>
                <td>${directBenefitSigma.toFixed(1)} SIG6</td>
                <td class="value-usd">${formatPrice(directBenefitUSD)}</td>
                <td class="value-inr">${formatINRPrice(directBenefitINR)}</td>
                <td>${teamBenefitPerLevelSigma.toFixed(1)} SIG6</td>
                <td class="value-usd">${formatPrice(teamBenefitPerLevelUSD)}</td>
                <td class="value-inr">${formatINRPrice(teamBenefitPerLevelINR)}</td>
            `;
            teamReferralTable.appendChild(row);
        });
    }
    
    // Update Award & Reward Table
    function updateAwardRewardTable() {
        if (!awardRewardTable) return;
        awardRewardTable.innerHTML = '';
        
        incomePlans.awardReward.forEach(plan => {
            const teamHoldValueUSD = plan.teamHold * currentPrice;
            const teamHoldValueINR = teamHoldValueUSD * USD_TO_INR_RATE;
            
            const getSigmaValueUSD = plan.getSigma * currentPrice;
            const getSigmaValueINR = getSigmaValueUSD * USD_TO_INR_RATE;
            
            const levelSigmaValueUSD = plan.levelSigma * currentPrice;
            const levelSigmaValueINR = levelSigmaValueUSD * USD_TO_INR_RATE;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${plan.teamHold.toLocaleString()} SIG6</td>
                <td class="value-usd">${formatPrice(teamHoldValueUSD)}</td>
                <td class="value-inr">${formatINRPrice(teamHoldValueINR)}</td>
                <td>${plan.getSigma.toLocaleString()} SIG6</td>
                <td class="value-usd">${formatPrice(getSigmaValueUSD)}</td>
                <td class="value-inr">${formatINRPrice(getSigmaValueINR)}</td>
                <td>${plan.levelSigma.toLocaleString()} SIG6</td>
                <td class="value-usd">${formatPrice(levelSigmaValueUSD)}</td>
                <td class="value-inr">${formatINRPrice(levelSigmaValueINR)}</td>
            `;
            awardRewardTable.appendChild(row);
        });
    }
    
    // Update Monthly Bonanza Table - ONLY FIRST ROW
    function updateMonthlyBonanzaTable() {
        if (!monthlyBonanzaTable) return;
        monthlyBonanzaTable.innerHTML = '';
        
        // Take only the first row from incomePlans.monthlyBonanza
        const plan = incomePlans.monthlyBonanza[0];
        
        const selfHoldValueUSD = plan.selfHold * currentPrice;
        const selfHoldValueINR = selfHoldValueUSD * USD_TO_INR_RATE;
        
        const directHoldValueUSD = plan.directHold * currentPrice;
        const directHoldValueINR = directHoldValueUSD * USD_TO_INR_RATE;
        
        const teamHoldValueUSD = plan.teamHold * currentPrice;
        const teamHoldValueINR = teamHoldValueUSD * USD_TO_INR_RATE;
        
        const getSigmaValueUSD = plan.getSigma * currentPrice;
        const getSigmaValueINR = getSigmaValueUSD * USD_TO_INR_RATE;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${plan.selfHold.toLocaleString()} SIG6</td>
            <td class="value-usd">${formatPrice(selfHoldValueUSD)}</td>
            <td class="value-inr">${formatINRPrice(selfHoldValueINR)}</td>
            <td>${plan.directHold.toLocaleString()} SIG6</td>
            <td class="value-usd">${formatPrice(directHoldValueUSD)}</td>
            <td class="value-inr">${formatINRPrice(directHoldValueINR)}</td>
            <td>${plan.teamHold.toLocaleString()} SIG6</td>
            <td class="value-usd">${formatPrice(teamHoldValueUSD)}</td>
            <td class="value-inr">${formatINRPrice(teamHoldValueINR)}</td>
            <td>${plan.getSigma.toLocaleString()} SIG6</td>
            <td class="value-usd">${formatPrice(getSigmaValueUSD)}</td>
            <td class="value-inr">${formatINRPrice(getSigmaValueINR)}</td>
        `;
        monthlyBonanzaTable.appendChild(row);
    }
    
    // Update SCB Projection Table
    function updateSCBProjectionTable() {
        if (!scbProjectionTable) return;
        scbProjectionTable.innerHTML = '';
        
        const totalSigma = 3600; // After 36 months
        
        incomePlans.scbProjection.forEach(plan => {
            // Calculate USD price based on current exchange rate
            const targetPriceUSD = plan.targetPriceINR / USD_TO_INR_RATE;
            const valueINR = totalSigma * plan.targetPriceINR;
            const valueUSD = totalSigma * targetPriceUSD;
            
            // Only calculate growth multiple if currentPrice is available
            const growthMultiple = currentPrice > 0 ? (plan.targetPriceINR / (currentPrice * USD_TO_INR_RATE)).toFixed(1) : 'N/A';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>₹${plan.targetPriceINR.toLocaleString()} ($${targetPriceUSD.toFixed(2)})</td>
                <td class="value-inr">₹${plan.targetPriceINR.toLocaleString()}</td>
                <td class="value-usd">$${targetPriceUSD.toFixed(2)}</td>
                <td class="value-inr">₹${valueINR.toLocaleString()}</td>
                <td class="value-usd">$${valueUSD.toLocaleString()}</td>
                <td><span class="growth-badge">${growthMultiple}x</span></td>
            `;
            scbProjectionTable.appendChild(row);
        });
    }
    
    // Update SCB Monthly INR Value
    function updateSCBMonthlyINR() {
        const monthlySigma = 100;
        const monthlyValueUSD = monthlySigma * currentPrice;
        const monthlyValueINR = monthlyValueUSD * USD_TO_INR_RATE;
        
        if (scbMonthlyINRElement) {
            scbMonthlyINRElement.textContent = `₹${monthlyValueINR.toLocaleString('en-IN', {maximumFractionDigits: 0})}`;
        }
    }
    
    // Extract initial price from HTML
    function extractInitialPrice() {
        const initialPriceText = currentPriceElement.textContent;
        const priceValue = initialPriceText.replace('$', '');
        currentPrice = parseFloat(priceValue);
        
        if (isNaN(currentPrice)) {
            currentPrice = 0.156500;
        }
        
        const initialInrPrice = currentPrice * USD_TO_INR_RATE;
        inrPriceElement.textContent = formatINRPrice(initialInrPrice);
    }
    
    // Matrix Background Animation
    function initMatrixBackground() {
        const canvas = document.getElementById('matrixCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const chars = "01Σ6SIGMA";
        const charArray = chars.split("");
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
        }
        
        function draw() {
            ctx.fillStyle = "rgba(10, 11, 29, 0.04)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.font = `${fontSize}px 'Orbitron'`;
            
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                const opacity = Math.random();
                
                if (opacity > 0.8) {
                    ctx.fillStyle = `rgba(0, 229, 255, ${opacity})`;
                } else if (opacity > 0.5) {
                    ctx.fillStyle = `rgba(108, 66, 245, ${opacity})`;
                } else {
                    ctx.fillStyle = `rgba(160, 168, 195, ${opacity})`;
                }
                
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                drops[i]++;
            }
        }
        
        setInterval(draw, 33);
        
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    // Blockchain Animation
    function initBlockchainAnimation() {
        const animationContainer = document.querySelector('.crypto-background');
        if (!animationContainer) return;
        
        const nodes = [];
        const connections = [];
        
        // Create blockchain nodes
        for (let i = 0; i < 15; i++) {
            const node = document.createElement('div');
            node.className = 'blockchain-node';
            node.style.left = `${Math.random() * 100}%`;
            node.style.top = `${Math.random() * 100}%`;
            node.style.animationDelay = `${Math.random() * 2}s`;
            animationContainer.appendChild(node);
            nodes.push(node);
        }
        
        // Create connections between nodes
        for (let i = 0; i < nodes.length - 1; i++) {
            if (Math.random() > 0.3) { // 70% chance to connect
                createConnection(nodes[i], nodes[i + 1]);
            }
        }
        
        function createConnection(node1, node2) {
            const connection = document.createElement('div');
            connection.className = 'blockchain-connection';
            
            const rect1 = node1.getBoundingClientRect();
            const rect2 = node2.getBoundingClientRect();
            
            const x1 = parseFloat(node1.style.left);
            const y1 = parseFloat(node1.style.top);
            const x2 = parseFloat(node2.style.left);
            const y2 = parseFloat(node2.style.top);
            
            const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
            
            connection.style.width = `${length}%`;
            connection.style.left = `${x1}%`;
            connection.style.top = `${y1}%`;
            connection.style.transform = `rotate(${angle}deg)`;
            connection.style.transformOrigin = '0 0';
            connection.style.animationDelay = `${Math.random() * 2}s`;
            
            animationContainer.appendChild(connection);
            connections.push(connection);
        }
    }
    
    // Set up copy button functionality
    function setupCopyButton() {
        if (!copyButton) return;
        
        copyButton.addEventListener('click', function() {
            const address = document.querySelector('.contract-address').textContent;
            
            navigator.clipboard.writeText(address).then(function() {
                copyButton.classList.add('copied');
                copyButton.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                `;
                
                setTimeout(function() {
                    copyButton.classList.remove('copied');
                    copyButton.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                    `;
                }, 2000);
            }).catch(function(err) {
                console.error('Failed to copy: ', err);
            });
        });
    }
    
    // Update last update time
    function updateLastUpdateTime() {
        if (!lastUpdateElement) return;
        
        const now = new Date();
        lastUpdateElement.textContent = `Last update: ${now.toLocaleTimeString()}`;
    }
    
    // Utility functions for formatting
    function formatPrice(price) {
        if (price < 0.0001) {
            return `$${price.toFixed(8)}`;
        } else if (price < 1) {
            return `$${price.toFixed(6)}`;
        } else {
            return `$${price.toFixed(4)}`;
        }
    }
    
    function formatINRPrice(price) {
        if (price < 1) {
            return `₹${price.toFixed(4)}`;
        } else if (price < 10) {
            return `₹${price.toFixed(3)}`;
        } else if (price < 100) {
            return `₹${price.toFixed(2)}`;
        } else {
            return `₹${price.toLocaleString('en-IN', {maximumFractionDigits: 0})}`;
        }
    }
    
    function formatMarketCap(marketCap) {
        if (marketCap >= 1000000) {
            return `$${(marketCap / 1000000).toFixed(2)}M`;
        } else if (marketCap >= 1000) {
            return `$${(marketCap / 1000).toFixed(2)}K`;
        } else {
            return `$${marketCap.toFixed(2)}`;
        }
    }
});
// Success Story Animation Initialization
function initSuccessStoryAnimations() {
    // Growth bar animation
    const growthFill = document.querySelector('.growth-fill');
    if (growthFill) {
        // Reset and animate growth bar
        growthFill.style.width = '0%';
        setTimeout(() => {
            growthFill.style.width = '403.33%';
        }, 500);
    }
    
    // Particle animation
    createFloatingParticles();
}

function createFloatingParticles() {
    const particlesContainer = document.querySelector('.success-particles');
    if (!particlesContainer) return;
    
    // Clear existing particles
    particlesContainer.innerHTML = '';
    
    // Create more particles
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 6}s`;
        particlesContainer.appendChild(particle);
    }
}

// DOM Content Loaded mein add karo
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Initialize success story animations
    setTimeout(initSuccessStoryAnimations, 1000);
});

// Advanced Live Animation Functions
function initLiveAnimations() {
    initCryptoCanvas();
    initPriceChart();
    initLiveCounting();
    initTransactionFeed();
    initTimelineAnimation();
    init3DOrb();
}

function initCryptoCanvas() {
    const canvas = document.getElementById('cryptoCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const particles = [];
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: Math.random() > 0.5 ? 'rgba(0, 229, 255, 0.8)' : 'rgba(108, 66, 245, 0.8)'
        });
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(10, 11, 29, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Draw connections
            particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 229, 255, ${0.2 * (1 - distance/100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
}

function initPriceChart() {
    const canvas = document.getElementById('priceChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const data = [3.10, 4.50, 6.80, 8.20, 12.50, 15.60];
    const padding = 20;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;
    
    function drawChart() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw area
        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        
        data.forEach((value, index) => {
            const x = padding + (index / (data.length - 1)) * width;
            const y = canvas.height - padding - ((value - 3) / (16 - 3)) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(0, 255, 157, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 255, 157, 0.1)');
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw line
        ctx.beginPath();
        data.forEach((value, index) => {
            const x = padding + (index / (data.length - 1)) * width;
            const y = canvas.height - padding - ((value - 3) / (16 - 3)) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.strokeStyle = '#00ff9d';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw points
        data.forEach((value, index) => {
            const x = padding + (index / (data.length - 1)) * width;
            const y = canvas.height - padding - ((value - 3) / (16 - 3)) * height;
            
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#00ff9d';
            ctx.fill();
            ctx.strokeStyle = '#0a0b1d';
            ctx.lineWidth = 1;
            ctx.stroke();
        });
    }
    
    drawChart();
}

function initLiveCounting() {
    const counters = document.querySelectorAll('.live-count');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                if (counter.textContent.includes('₹')) {
                    counter.textContent = `₹${Math.floor(current).toLocaleString()}`;
                } else if (counter.textContent.includes('%')) {
                    counter.textContent = `${current.toFixed(2)}%`;
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (counter.textContent.includes('₹')) {
                    counter.textContent = `₹${target.toLocaleString()}`;
                } else if (counter.textContent.includes('%')) {
                    counter.textContent = `${target.toFixed(2)}%`;
                }
            }
        };
        
        // Start counter when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

function initTransactionFeed() {
    const feed = document.querySelector('.transaction-feed');
    if (!feed) return;
    
    const transactions = [
        "Sigma Purchase: 500 SIG6 @ ₹3.10",
        "Sigma Transfer: 200 SIG6 → Wallet",
        "Sigma Bonus: 50 SIG6 Added",
        "Sigma Purchase: 300 SIG6 @ ₹4.50",
        "Network Reward: 25 SIG6 Received",
        "Sigma Transfer: 150 SIG6 → Staking",
        "Sigma Purchase: 400 SIG6 @ ₹6.80",
        "Team Bonus: 75 SIG6 Added",
        "Sigma Transfer: 100 SIG6 → Wallet",
        "Sigma Purchase: 289 SIG6 @ ₹8.20"
    ];
    
    let index = 0;
    
    function addTransaction() {
        const transaction = document.createElement('div');
        transaction.className = 'transaction-item';
        transaction.style.cssText = `
            padding: 8px 12px;
            background: rgba(108, 66, 245, 0.1);
            border-radius: 8px;
            margin-bottom: 8px;
            font-size: 0.8rem;
            color: var(--text);
            border-left: 3px solid var(--secondary);
            animation: slideIn 0.5s ease-out;
        `;
        
        transaction.textContent = transactions[index];
        feed.insertBefore(transaction, feed.firstChild);
        
        // Remove old transactions
        if (feed.children.length > 4) {
            feed.removeChild(feed.lastChild);
        }
        
        index = (index + 1) % transactions.length;
    }
    
    // Add first transaction immediately
    addTransaction();
    
    // Add new transaction every 3 seconds
    setInterval(addTransaction, 3000);
}

function initTimelineAnimation() {
    const timelinePoints = document.querySelectorAll('.timeline-point');
    
    timelinePoints.forEach((point, index) => {
        setTimeout(() => {
            point.style.opacity = '1';
            point.style.transform = 'translateY(0)';
        }, index * 500);
    });
}

function init3DOrb() {
    const orb = document.querySelector('.crypto-orb-3d');
    if (!orb) return;
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
    });
    
    function updateOrb() {
        if (orb) {
            orb.style.transform = `translateY(-50%) rotateY(${mouseX * 30}deg) rotateX(${mouseY * -30}deg)`;
        }
        requestAnimationFrame(updateOrb);
    }
    
    updateOrb();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Initialize live animations with delay
    setTimeout(initLiveAnimations, 1000);
});
// ***************************************************************************************
