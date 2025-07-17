const xpToLevel = [
    0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000,
    85000, 100000, 120000, 140000, 165000, 195000,
    225000, 265000, 305000, 355000
];

const xpInput = document.getElementById('xpInput');
const charLevel = document.getElementById('charLevel');

// Set XP input to 0 initially
xpInput.value = 0;
updateLevelFromXP(0);

// Listen for XP input manually typed
xpInput.addEventListener('input', () => {
    const xp = parseInt(xpInput.value, 10) || 0;
    updateLevelFromXP(xp);
});

// Adjust XP only by 100
function adjustXP(amount) {
    let current = parseInt(xpInput.value, 10) || 0;
    const min = parseInt(xpInput.min);
    const max = parseInt(xpInput.max);
    const newValue = Math.min(Math.max(current + amount, min), max);
    xpInput.value = newValue;
    updateLevelFromXP(newValue);
}

// Update level based on XP
function updateLevelFromXP(xp) {
    let level = 1;
    for (let i = 0; i < xpToLevel.length; i++) {
        if (xp >= xpToLevel[i]) {
            level = i + 1;
        } else {
            break;
        }
    }
    charLevel.value = level;
}

// Adjust for both XP and ability scores
function adjust(id, change) {
    const input = document.getElementById(id);
    const isXP = id === 'xpInput';
    const step = isXP ? 100 : 1;

    const current = parseInt(input.value, 10) || 0;
    const min = parseInt(input.min);
    const max = parseInt(input.max);
    const newValue = Math.min(Math.max(current + change * step, min), max);

    input.value = newValue;

    // XP: update level
    if (isXP) {
        updateLevelFromXP(newValue);
    }

    // Ability score: update modifier
    if (input.classList.contains('ability-score') || isAbilityScore(id)) {
        updateModifier(id);
    }
}

// Detect ability scores by ID
function isAbilityScore(id) {
    return ['str', 'dex', 'con', 'int', 'wis', 'cha'].includes(id);
}

// Modifier logic
function updateModifier(statId) {
    const input = document.getElementById(statId);
    const modDiv = document.getElementById(`${statId}-mod`);
    const score = parseInt(input.value, 10) || 0;
    const modifier = Math.floor((score - 10) / 2);
    modDiv.textContent = (modifier >= 0 ? "+" : "") + modifier;
}

// Initialize modifiers on page load
window.addEventListener('DOMContentLoaded', () => {
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(stat => {
        updateModifier(stat);
    });
});
