const xpToLevel = [
    0,      // Level 1
    300,    // Level 2
    900,    // Level 3
    2700,   // Level 4
    6500,   // Level 5
    14000,  // Level 6
    23000,  // Level 7
    34000,  // Level 8
    48000,  // Level 9
    64000,  // Level 10
    85000,  // Level 11
    100000, // Level 12
    120000, // Level 13
    140000, // Level 14
    165000, // Level 15
    195000, // Level 16
    225000, // Level 17
    265000, // Level 18
    305000, // Level 19
    355000  // Level 20
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
// Classes
const charClass = document.getElementById('charClass');
const charClass2 = document.getElementById('charClass2');
const charClass3 = document.getElementById('charClass3');
const charClass2Row = document.getElementById('charClass2-row');
const charClass3Row = document.getElementById('charClass3-row');
// Cache optgroups
if (!charClass2.allOptGroups) {
    charClass2.allOptGroups = Array.from(charClass2.children).filter(el => el.tagName === 'OPTGROUP');
}
if (!charClass3.allOptGroups) {
    charClass3.allOptGroups = Array.from(charClass3.children).filter(el => el.tagName === 'OPTGROUP');
}
function updateSubclass2Visibility() {
    const selectedClass = charClass.value;
    const level = parseInt(charLevel.value, 10);
    if (level >= 3 && selectedClass) {
        const matchingGroup = charClass2.allOptGroups.find(group => group.label === selectedClass);
        charClass2.innerHTML = '';
        if (matchingGroup) {
            charClass2.appendChild(matchingGroup);
            charClass2Row.style.display = '';
            // Auto-select first option
            if (matchingGroup.children.length > 0) {
                charClass2.value = matchingGroup.children[0].value;
            }
        } else {
            charClass2Row.style.display = 'none';
        }
    } else {
        charClass2Row.style.display = 'none';
    }
    updateSubclass3Visibility(); // cascade update
}
function updateSubclass3Visibility() {
    const selectedSubclass2 = charClass2.value;
    const matchingGroup = charClass3.allOptGroups.find(group => group.label === selectedSubclass2);
    charClass3.innerHTML = '';
    if (matchingGroup) {
        charClass3.appendChild(matchingGroup);
        charClass3Row.style.display = '';
        // Auto-select first option
        if (matchingGroup.children.length > 0) {
            charClass3.value = matchingGroup.children[0].value;
        }
    } else {
        charClass3Row.style.display = 'none';
    }
}
// Event listeners
charClass.addEventListener('change', updateSubclass2Visibility);
charLevel.addEventListener('input', updateSubclass2Visibility);
charClass2.addEventListener('change', updateSubclass3Visibility);
updateSubclass2Visibility();
