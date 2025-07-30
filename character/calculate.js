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

function toggleRemoveButtons() {
    const rows = document.querySelectorAll("#spellContainer .form-row");
    rows.forEach((row, index) => {
        const btn = row.querySelector("button");
        btn.style.marginLeft = "20px";
        btn.className = "button";
        if (btn) btn.style.display = rows.length > 1 ? "inline-block" : "none";
    });
}

function removeLastSpellSlot() {
    const container = document.getElementById("spellContainer");
    if (container.children.length > 1) {
        container.lastChild.remove();
    }
    toggleRemoveButtons();
}

function getOptgroupLevel(label) {
    const match = label.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
}

function rebuildSpellSelects(selectedClass, maxLevel) {
    const selects = document.querySelectorAll("#spellContainer select");
    selects.forEach(select => {
        if (!select.allGroups) return;
        const currentValue = select.value;
        const placeholderOption = Array.from(select.options).find(opt =>
            opt.value === "" && opt.parentElement.tagName !== "OPTGROUP"
        );
        select.innerHTML = "";
        if (placeholderOption) {
            select.appendChild(placeholderOption.cloneNode(true));
        }
        select.allGroups.forEach(group => {
            const spellLevel = getOptgroupLevel(group.label);
            if (spellLevel > maxLevel) return;
            const newGroup = document.createElement("optgroup");
            newGroup.label = group.label;
            Array.from(group.children).forEach(option => {
                const classList = (option.dataset.classes || "")
                    .toLowerCase()
                    .split(",")
                    .map(c => c.trim());
                if (option.value === "" || classList.includes(selectedClass.toLowerCase())) {
                    newGroup.appendChild(option.cloneNode(true));
                }
            });
            if (newGroup.children.length > 0) {
                select.appendChild(newGroup);
            }
        });
        select.value = currentValue;
    });
}

function updateSpells() {
    const selectedClass = document.getElementById("charClass")?.value;
    const level = parseInt(document.getElementById("charLevel").value, 10) || 1;
    rebuildSpellSelects(selectedClass, level);
    toggleRemoveButtons();
}

function renumberSpellSlots() {
    const container = document.getElementById("spellContainer");
    const slots = container.querySelectorAll(".form-row");
    slots.forEach((row, i) => {
        const index = i + 1;
        row.id = `spellSlot${index}-row`;
        const label = row.querySelector("label");
        const select = row.querySelector("select");
        if (label) {
            label.textContent = `Spell ${index}`;
            label.setAttribute("for", `spellselect${index}`);
        }
        if (select) {
            select.id = `spellselect${index}`;
            select.name = `spellselect${index}`;
        }
    });
}

function addSpellSlot() {
    const container = document.getElementById("spellContainer");
    const template = document.getElementById("spellselect");
    const index = container.children.length + 1;
    const outer = document.createElement("div");
    outer.className = "basic-info";
    const wrapper = document.createElement("div");
    wrapper.className = "form-row";
    wrapper.id = `spellSlot${index}-row`;
    wrapper.style.margin = "10px auto";
    const label = document.createElement("label");
    label.setAttribute("for", `spellselect${index}`);
    label.textContent = `Spell ${index}`;
    const select = document.createElement("select");
    select.id = `spellselect${index}`;
    select.name = `spellselect${index}`;
    select.innerHTML = template.innerHTML;
    if (!select.allGroups) {
        select.allGroups = Array.from(select.querySelectorAll("optgroup")).map(group => group.cloneNode(true));
    }
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
        outer.remove();
        renumberSpellSlots();
        toggleRemoveButtons();
    });
    wrapper.appendChild(label);
    wrapper.appendChild(select);
    wrapper.appendChild(removeBtn);
    outer.appendChild(wrapper);
    container.appendChild(outer);
    toggleRemoveButtons();
    rebuildSpellSelects(
        document.getElementById("charClass").value,
        parseInt(document.getElementById("charLevel").value, 10) || 1
    );
}

function initializeSpells() {
    document.getElementById("addSpellButton")?.addEventListener("click", addSpellSlot);
    addSpellSlot();
}

function updateArmorStats() {
    const armorSelect = document.getElementById("armorType");
    const shield = document.getElementById("shield").checked;
    const dex = parseInt(document.getElementById("dex").value, 10) || 10;
    const dexMod = Math.floor((dex - 10) / 2);
    const selected = armorSelect.options[armorSelect.selectedIndex];
    const base = parseInt(selected.dataset.base || "10", 10);
    const dexType = selected.dataset.dex;
    const disadvantage = selected.dataset.disadvantage === "true";
    const strReq = selected.dataset.str || "—";
    let dexBonus = 0;
    if (dexType === "yes") {
        dexBonus = dexMod;
    } else if (dexType === "limit2") {
        dexBonus = Math.min(2, dexMod);
    }
    const shieldBonus = shield ? 2 : 0;
    const totalAC = base + dexBonus + shieldBonus;
    document.getElementById("totalAC").textContent = totalAC;
    document.getElementById("stealth2").textContent = disadvantage ? "Disadvantage" : "Normal";
    document.getElementById("strReq").textContent = strReq;
}

let weaponCount = 0;

function addWeapon() {
    const container = document.getElementById("weaponContainer");
    const template = document.getElementById("weapon");
    weaponCount++;
    const index = weaponCount;
    const outer = document.createElement("div");
    outer.className = "basic-info";
    outer.id = `weaponBlock${index}`;
    const formRow = document.createElement("div");
    formRow.className = "form-row";
    const label = document.createElement("label");
    label.setAttribute("for", `weapon${index}`);
    label.textContent = `Weapon ${index}`;
    const select = document.createElement("select");
    select.id = `weapon${index}`;
    select.name = `weapon${index}`;
    select.innerHTML = template.innerHTML;
    formRow.appendChild(label);
    formRow.appendChild(select);
    const grid = document.createElement("div");
    grid.className = "weapon-grid";
    grid.innerHTML = `
        <div class="box"><label>Attack Bonus</label><output id="weapon${index}Bonus">+0</output></div>
        <div class="box"><label>Damage</label><output id="weapon${index}Damage">-</output></div>
        <div class="box"><label>Damage Type</label><output id="weapon${index}Type">-</output></div>
        <div class="box"><label>Properties</label><output id="weapon${index}Properties">-</output></div>
    `;
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Remove Weapon";
    removeBtn.className = "button remove-weapon";
    removeBtn.style.marginBottom = "20px";
    removeBtn.onclick = () => {
        container.removeChild(outer);
        weaponCount--;
        if (weaponCount < 10) {
            document.getElementById("addBtn").style.display = "";
        }
        updateRemoveButtons();
    };
    outer.appendChild(formRow);
    outer.appendChild(grid);
    outer.appendChild(removeBtn);
    container.appendChild(outer);
    select.addEventListener("change", () => updateWeaponInfo(select.id));
    if (weaponCount >= 10) {
        document.getElementById("addBtn").style.display = "none";
    }
    updateRemoveButtons();
}

function updateRemoveButtons() {
    const container = document.getElementById("weaponContainer");
    const blocks = container.querySelectorAll(".basic-info");
    const showRemove = blocks.length > 1;
    blocks.forEach(block => {
        const removeBtn = block.querySelector(".remove-weapon");
        if (removeBtn) {
            removeBtn.style.display = showRemove ? "" : "none";
        }
    });
}

function updateWeaponInfo(selectId) {
    const select = document.getElementById(selectId);
    const selected = select.options[select.selectedIndex];
    const damage = selected.dataset.damage || "-";
    const type = selected.dataset.type || "-";
    const stat = selected.dataset.stat || "";
    const statMod = stat ? parseInt(document.getElementById(`${stat}-mod`).textContent) || 0 : 0;
    const properties = selected.dataset.properties || "-";
    document.getElementById(`${selectId}Damage`).textContent = damage;
    document.getElementById(`${selectId}Type`).textContent = type;
    document.getElementById(`${selectId}Bonus`).textContent = stat ? (statMod >= 0 ? `+${statMod}` : `${statMod}`) : "+0";
    document.getElementById(`${selectId}Properties`).textContent = properties;
}

function clearBtn() {
    document.getElementById('clearBtn').addEventListener('click', function() {
        const confirmed = confirm("Are you sure you want to clear all fields and reset to default? This action cannot be undone, so be sure you saved your character before clearing.");
        if (confirmed) {
            document.getElementById('characterForm').reset();
            const spellSlotsContainer = document.getElementById('spellContainer');
            while (spellSlotsContainer.children.length > 1) {
                spellSlotsContainer.removeChild(spellSlotsContainer.lastChild);
                toggleRemoveButtons();
            }
            const weaponSlotsContainer = document.getElementById('weaponContainer');
            while (weaponSlotsContainer.children.length > 1) {
                weaponSlotsContainer.removeChild(weaponSlotsContainer.lastChild);
                updateRemoveButtons();
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', clearBtn);

// Initialization
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("charClass")?.addEventListener("change", updateSpells);
    document.getElementById("charLevel")?.addEventListener("input", updateSpells);
    document.getElementById("charClass")?.addEventListener("change", updateArmorStats);
    document.getElementById("charLevel")?.addEventListener("input", updateArmorStats);
    document.getElementById("armorType").addEventListener("change", updateArmorStats);
    document.getElementById("shield").addEventListener("change", updateArmorStats);
    document.getElementById("dex").addEventListener("input", updateArmorStats);
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
    updateArmorStats();
    const urlParams = new URLSearchParams(window.location.search);
    const hasCParam = urlParams.has('c');
    if (!hasCParam) {
        initializeSpells();
        addWeapon();
    }
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
