// XP to level table
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

// Class hit dice
const classHitDiceMap = {
    Barbarian: 'd12',
    Fighter: 'd10',
    Paladin: 'd10',
    Ranger: 'd10',
    BloodHunter: 'd10',
    Bard: 'd8',
    Cleric: 'd8',
    Druid: 'd8',
    Monk: 'd8',
    Rogue: 'd8',
    Warlock: 'd8',
    Artificer: 'd8',
    Sorcerer: 'd6',
    Wizard: 'd6'
};

// Skills
const skillMap = {
    acrobatics:        { ability: 'dex', checkbox: 'acroSaveProf', expertise: 'acroExpertise' },
    animalHandling:    { ability: 'wis', checkbox: 'aniHanSaveProf', expertise: 'aniHanExpertise' },
    arcana:            { ability: 'int', checkbox: 'arcaSaveProf', expertise: 'arcaExpertise' },
    athletics:         { ability: 'str', checkbox: 'athlSaveProf', expertise: 'athlExpertise' },
    deception:         { ability: 'cha', checkbox: 'deceSaveProf', expertise: 'deceExpertise' },
    history:           { ability: 'int', checkbox: 'histSaveProf', expertise: 'histExpertise' },
    insight:           { ability: 'wis', checkbox: 'insiSaveProf', expertise: 'insiExpertise' },
    intimidation:      { ability: 'cha', checkbox: 'intiSaveProf', expertise: 'intiExpertise' },
    investigation:     { ability: 'int', checkbox: 'inveSaveProf', expertise: 'inveExpertise' },
    medicine:          { ability: 'wis', checkbox: 'mediSaveProf', expertise: 'mediExpertise' },
    nature:            { ability: 'int', checkbox: 'natuSaveProf', expertise: 'natuExpertise' },
    perception:        { ability: 'wis', checkbox: 'percSaveProf', expertise: 'percExpertise' },
    performance:       { ability: 'cha', checkbox: 'perfSaveProf', expertise: 'perfExpertise' },
    persuasion:        { ability: 'cha', checkbox: 'persSaveProf', expertise: 'persExpertise' },
    religion:          { ability: 'int', checkbox: 'reliSaveProf', expertise: 'reliExpertise' },
    sleightHand:       { ability: 'dex', checkbox: 'sleHanSaveProf', expertise: 'sleightHandExpertise' },
    stealth:           { ability: 'dex', checkbox: 'steaSaveProf', expertise: 'steaExpertise' },
    survival:          { ability: 'wis', checkbox: 'survSaveProf', expertise: 'survExpertise' }
};

const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
const xpInput = document.getElementById('xpInput');
const charLevel = document.getElementById('charLevel');
const proficiencyBonus = document.getElementById('proficiencyBonus');
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

function getProficiencyBonus(level) {
    if (level >= 17) return 6;
    if (level >= 13) return 5;
    if (level >= 9) return 4;
    if (level >= 5) return 3;
    return 2;
}

function getModifier(score) {
    return Math.floor((score - 10) / 2);
}

function updateLevelFromXP(xp) {
    let level = 1;
    for (let i = 0; i < xpToLevel.length; i++) {
        if (xp >= xpToLevel[i]) level = i + 1;
        else break;
    }
    charLevel.value = level;
    const bonus = getProficiencyBonus(level);
    proficiencyBonus.value = `+${bonus}`;
    updateSubclass2Visibility();
}

function updateHitDice() {
    const className = charClass.value;
    const level = parseInt(charLevel.value, 10) || 1;
    const diceType = classHitDiceMap[className] || 'd8';
    document.getElementById('hitDiceType').textContent = diceType;
    document.getElementById('hitDice').value = level;
}

function updatePassivePerception() {
    const wis = parseInt(document.getElementById('wis')?.value, 10) || 10;
    const wisMod = getModifier(wis);
    document.getElementById('passivePerception').value = 10 + wisMod;
}

function updateSavingThrows() {
    const prof = parseInt(proficiencyBonus.value.replace('+', '') || '2', 10);
    abilities.forEach(ability => {
        const mod = getModifier(parseInt(document.getElementById(ability).value || 10));
        const isProf = document.getElementById(`${ability}SaveProf`)?.checked;
        const total = mod + (isProf ? prof : 0);
        document.getElementById(`${ability}-2`).value = (total >= 0 ? '+' : '') + total;
    });
}

function updateModifier(statId) {
    const value = parseInt(document.getElementById(statId)?.value || 0);
    const mod = getModifier(value);
    document.getElementById(`${statId}-mod`).textContent = (mod >= 0 ? '+' : '') + mod;
    if (statId === 'wis') updatePassivePerception();
    if (statId === 'dex') document.getElementById('initiative').value = mod;
}

function updateSkills() {
    const prof = parseInt(proficiencyBonus.value.replace('+', '') || '2', 10);
    Object.entries(skillMap).forEach(([skill, { ability, checkbox, expertise }]) => {
        const mod = getModifier(parseInt(document.getElementById(ability)?.value || 10));
        const isProf = document.getElementById(checkbox)?.checked;
        const isExpert = document.getElementById(expertise)?.checked;
        let bonus = mod;
        if (isProf) bonus += isExpert ? prof * 2 : prof;
        document.getElementById(skill).value = (bonus >= 0 ? '+' : '') + bonus;
    });
}

function updateSubclass2Visibility() {
    const selected = charClass.value;
    const level = parseInt(charLevel.value, 10);
    charClass2.innerHTML = '';
    const group = charClass2.allOptGroups.find(g => g.label === selected);
    if (level >= 3 && group) {
        charClass2.appendChild(group);
        charClass2Row.style.display = '';
        charClass2.value = group.children[0]?.value || '';
    } else {
        charClass2Row.style.display = 'none';
    }
    updateSubclass3Visibility();
}

function updateSubclass3Visibility() {
    const selected = charClass2.value;
    const group = charClass3.allOptGroups.find(g => g.label === selected);
    charClass3.innerHTML = '';
    if (group) {
        charClass3.appendChild(group);
        charClass3Row.style.display = '';
        charClass3.value = group.children[0]?.value || '';
    } else {
        charClass3Row.style.display = 'none';
    }
}

function adjust(id, change) {
    const input = document.getElementById(id);
    const step = id === 'xpInput' ? 100 : 1;
    let value = parseInt(input.value || '0') + step * change;
    value = Math.max(parseInt(input.min || '0'), Math.min(value, parseInt(input.max || '999999')));
    input.value = value;
    if (id === 'xpInput') updateLevelFromXP(value);
    if (abilities.includes(id)) {
        updateModifier(id);
        updateSavingThrows();
        updateSkills();
    }
}

// Initialization
window.addEventListener('DOMContentLoaded', () => {
    updateLevelFromXP(parseInt(xpInput.value, 10) || 0);
    updateHitDice();
    abilities.forEach(stat => {
        updateModifier(stat);
        document.getElementById(stat)?.addEventListener('input', () => {
            updateModifier(stat);
            updateSavingThrows();
            updateSkills();
        });
        document.getElementById(`${stat}SaveProf`)?.addEventListener('change', updateSavingThrows);
    });
    updateSavingThrows();
    updatePassivePerception();
    updateSkills();
});

xpInput.addEventListener('input', () => {
    updateLevelFromXP(parseInt(xpInput.value, 10) || 0);
    updateHitDice();
});

proficiencyBonus.addEventListener('input', () => {
    updateSavingThrows();
    updateSkills();
});

charLevel.addEventListener('input', () => {
    updateSubclass2Visibility();
    updateHitDice();
});

charClass.addEventListener('change', () => {
    updateSubclass2Visibility();
    updateHitDice();
});

charClass2.addEventListener('change', updateSubclass3Visibility);

Object.entries(skillMap).forEach(([skill, { ability, checkbox, expertise }]) => {
    document.getElementById(checkbox)?.addEventListener('change', updateSkills);
    document.getElementById(expertise)?.addEventListener('change', updateSkills);
    document.getElementById(ability)?.addEventListener('input', updateSkills);
});
