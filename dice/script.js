const diceCounts = {
    d4: 0, d6: 0, d8: 0, d10: 0, d12: 0, d20: 0, d100: 0
};
function changeDiceCount(type, change) {
    diceCounts[type] = Math.max(0, diceCounts[type] + change);
    document.getElementById(`${type}-count`).textContent = diceCounts[type];
}
function rollDie(sides) {
    return Math.floor(Math.random() * sides) + 1;
}
function rollAllDice() {
    const resultsTable = document.getElementById("diceResults");
    resultsTable.innerHTML = "";
    let hasResults = false;
    for (const type in diceCounts) {
        const count = diceCounts[type];
        const sides = parseInt(type.slice(1));
        for (let i = 0; i < count; i++) {
            const row = resultsTable.insertRow();
            const cellType = row.insertCell();
            const cellColon = row.insertCell();
            const cellResult = row.insertCell();
            cellType.textContent = type;
            cellColon.textContent = ":";
            cellResult.textContent = rollDie(sides);
            cellType.style.textAlign = "right";
            cellColon.style.textAlign = "center";
            cellResult.style.textAlign = "left";
            hasResults = true;
        }
    }
    if (!hasResults) {
        const row = resultsTable.insertRow();
        const cell = row.insertCell();
        cell.textContent = "No dice selected!";
        cell.colSpan = 3;
        cell.style.textAlign = "center";
    }
}
