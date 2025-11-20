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
    const royaltyProgramTable = document.getElementById('royalty-program-table');
    const monthlyBonanzaTable = document.getElementById('monthly-bonanza-table');
    const associateProgramTable = document.getElementById('associate-program-table');
    const scbProjectionTable = document.getElementById('scb-projection-table');
    
    // Income Plans Configuration - ALL 8 PLANS
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
        royaltyProgram: [
            { holding: 100, contribution: 1, pool1: 0.5, pool2: 0.5 },
            { holding: 500, contribution: 5, pool1: 2.5, pool2: 2.5 },
            { holding: 1000, contribution: 10, pool1: 5, pool2: 5 },
            { holding: 5000, contribution: 50, pool1: 25, pool2: 25 },
            { holding: 10000, contribution: 100, pool1: 50, pool2: 50 },
            { holding: 50000, contribution: 500, pool1: 250, pool2: 250 },
            { holding: 100000, contribution: 1000, pool1: 500, pool2: 500 }
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
        associateProgram: [
            { userHold: 100, associateGet: 10 },
            { userHold: 500, associateGet: 50 },
            { userHold: 1000, associateGet: 100 },
            { userHold: 2000, associateGet: 200 },
            { userHold: 5000, associateGet: 500 },
            { userHold: 10000, associateGet: 1000 }
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
        
        // Set last update time
        updateLastUpdateTime();
    }
    
    // Initialize Income Tables - ALL 8 PLANS
    function initializeIncomeTables() {
        updateICOBonusTable();
        updateDirectReferralTable();
        updateTeamReferralTable();
        updateAwardRewardTable();
        updateRoyaltyProgramTable();
        updateMonthlyBonanzaTable();
        updateAssociateProgramTable();
        updateSCBProjectionTable();
    }
    
    // Update all income tables with current prices
    function updateIncomeTables() {
        updateICOBonusTable();
        updateDirectReferralTable();
        updateTeamReferralTable();
        updateAwardRewardTable();
        updateRoyaltyProgramTable();
        updateMonthlyBonanzaTable();
        updateAssociateProgramTable();
        updateSCBProjectionTable();
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
    
    // Update Royalty Program Table - TABLE REMOVED
    function updateRoyaltyProgramTable() {
        if (!royaltyProgramTable) return;
        royaltyProgramTable.innerHTML = '';
        // Table data completely removed - no rows will be created
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
    
    // Update Associate Program Table - NEW 7TH INCOME PLAN
    function updateAssociateProgramTable() {
        if (!associateProgramTable) return;
        associateProgramTable.innerHTML = '';
        
        incomePlans.associateProgram.forEach(plan => {
            const userHoldValueUSD = plan.userHold * currentPrice;
            const userHoldValueINR = userHoldValueUSD * USD_TO_INR_RATE;
            
            const associateGetValueUSD = plan.associateGet * currentPrice;
            const associateGetValueINR = associateGetValueUSD * USD_TO_INR_RATE;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${plan.userHold.toLocaleString()} SIG6</td>
                <td class="value-usd">${formatPrice(userHoldValueUSD)}</td>
                <td class="value-inr">${formatINRPrice(userHoldValueINR)}</td>
                <td>${plan.associateGet.toLocaleString()} SIG6</td>
                <td class="value-usd">${formatPrice(associateGetValueUSD)}</td>
                <td class="value-inr">${formatINRPrice(associateGetValueINR)}</td>
            `;
            associateProgramTable.appendChild(row);
        });
    }
    
    // Update SCB Projection Table - NEW 8TH INCOME PLAN
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
            return `₹${price.toFixed(2)}`;
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