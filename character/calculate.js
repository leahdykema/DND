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
// Map class names to hit die types
const classHitDiceMap = {
    Barbarian: 'd12',
    Fighter: 'd10',
    Paladin: 'd10',
    Ranger: 'd10',
    Bard: 'd8',
    Cleric: 'd8',
    Druid: 'd8',
    Monk: 'd8',
    Rogue: 'd8',
    Warlock: 'd8',
    Artificer: 'd8',
    BloodHunter: 'd10',
    Sorcerer: 'd6',
    Wizard: 'd6'
};
const xpInput = document.getElementById('xpInput');
const charLevel = document.getElementById('charLevel');
const proficiencyBonus = document.getElementById('proficiencyBonus');
// Set XP input to 0 initially
xpInput.value = 0;
updateLevelFromXP(0);
// Proficiency bonus lookup
function getProficiencyBonus(level) {
    if (level >= 17) return 6;
    if (level >= 13) return 5;
    if (level >= 9) return 4;
    if (level >= 5) return 3;
    return 2;
}
// Update level and proficiency bonus based on XP
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
    if (proficiencyBonus) {
        const bonus = getProficiencyBonus(level);
        proficiencyBonus.value = `+${bonus}`;
    }
}
function updateHitDice() {
    const className = charClass.value;
    const level = parseInt(charLevel.value, 10) || 1;
    const diceType = classHitDiceMap[className] || 'd8';
    const hitDiceTypeSpan = document.getElementById('hitDiceType');
    const hitDiceInput = document.getElementById('hitDice');
    if (hitDiceTypeSpan) hitDiceTypeSpan.textContent = diceType;
    if (hitDiceInput) hitDiceInput.value = level;
}
function updatePassivePerception() {
    const wis = parseInt(document.getElementById('wis')?.value, 10) || 10;
    const wisMod = Math.floor((wis - 10) / 2);
    const passivePerception = 10 + wisMod;
    const passiveInput = document.getElementById('passivePerception');
    if (passiveInput) passiveInput.value = passivePerception;
}
// Adjust XP only by 100
function adjustXP(amount) {
    let current = parseInt(xpInput.value, 10) || 0;
    const min = parseInt(xpInput.min);
    const max = parseInt(xpInput.max);
    const newValue = Math.min(Math.max(current + amount, min), max);
    xpInput.value = newValue;
    updateLevelFromXP(newValue);
}
// Adjust for both XP and ability scores
function adjust(id, change) {
    const input = document.getElementById(id);
    let value = parseInt(input.value, 10) || 0;
    const min = parseInt(input.min || '0', 10);
    const max = parseInt(input.max || '9999999', 10);
    // Determine step size
    const step = id === 'xpInput' ? 100 : 1;
    value += change * step;
    value = Math.max(min, Math.min(max, value));
    input.value = value;
    // Update level if it's the XP field
    if (id === 'xpInput') {
        updateLevelFromXP(value);
    }
    // Check if this is an ability score
    const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    if (abilities.includes(id)) {
        const modifier = Math.floor((value - 10) / 2);
        const modDisplay = document.getElementById(`${id}-mod`);
        modDisplay.textContent = (modifier >= 0 ? '+' : '') + modifier;
        if (id === 'wis') updatePassivePerception();
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
    if (statId === 'dex') {
        const initiativeField = document.getElementById('initiative');
        if (initiativeField) {
            initiativeField.value = modifier;
        }
    }
}
function getModifier(score) {
    return Math.floor((score - 10) / 2);
}
function updateSavingThrows() {
    const proficiency = parseInt(
        (document.getElementById('proficiencyBonus')?.value || '2').replace('+', ''),
        10
    );
    const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    abilities.forEach(ability => {
        const score = parseInt(document.getElementById(ability)?.value || 10);
        const mod = getModifier(score);
        const isProficient = document.getElementById(`${ability}SaveProf`)?.checked;
        const saveValue = mod + (isProficient ? proficiency : 0);
        const formatted = (saveValue >= 0 ? '+' : '') + saveValue;
        const saveInput = document.getElementById(`${ability}-2`);
        if (saveInput) {
            saveInput.value = formatted;
        }
    });
}
// Initialize modifiers on page load
window.addEventListener('DOMContentLoaded', () => {
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(stat => {
        updateModifier(stat);
    });
    updateLevelFromXP(parseInt(xpInput.value, 10) || 0); // Ensure bonus is set
});
['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(ability => {
    const input = document.getElementById(ability);
    const checkbox = document.getElementById(`${ability}SaveProf`);

    if (input) {
        input.addEventListener('input', updateSavingThrows);
    }
    if (checkbox) {
        checkbox.addEventListener('change', updateSavingThrows);
    }
});
// Also update on page load and when proficiency changes
document.getElementById('proficiencyBonus')?.addEventListener('input', updateSavingThrows);
window.addEventListener('DOMContentLoaded', updateSavingThrows);
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
            if (matchingGroup.children.length > 0) {
                charClass2.value = matchingGroup.children[0].value;
            }
        } else {
            charClass2Row.style.display = 'none';
        }
    } else {
        charClass2Row.style.display = 'none';
    }
    updateSubclass3Visibility();
}
function updateSubclass3Visibility() {
    const selectedSubclass2 = charClass2.value;
    const matchingGroup = charClass3.allOptGroups.find(group => group.label === selectedSubclass2);
    charClass3.innerHTML = '';
    if (matchingGroup) {
        charClass3.appendChild(matchingGroup);
        charClass3Row.style.display = '';
        if (matchingGroup.children.length > 0) {
            charClass3.value = matchingGroup.children[0].value;
        }
    } else {
        charClass3Row.style.display = 'none';
    }
}
function getModifier(score) {
    return Math.floor((score - 10) / 2);
}
// Event listeners
xpInput.addEventListener('input', () => {
    const xp = parseInt(xpInput.value, 10) || 0;
    updateLevelFromXP(xp);
    updateHitDice();
});
charClass.addEventListener('change', () => {
    updateSubclass2Visibility();
    updateHitDice();
});
window.addEventListener('DOMContentLoaded', () => {
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(stat => {
        updateModifier(stat);
    });
    updateLevelFromXP(parseInt(xpInput.value, 10) || 0);
    updateHitDice();
    updatePassivePerception();
    updateSavingThrows();
});
charClass.addEventListener('change', updateSubclass2Visibility);
charLevel.addEventListener('input', updateSubclass2Visibility);
charClass2.addEventListener('change', updateSubclass3Visibility);
updateSubclass2Visibility();
updateSavingThrows();
