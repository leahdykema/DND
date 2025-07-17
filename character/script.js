function saveToFile() {
    const character = {
        name: document.getElementById("charName").value,
        race: document.getElementById("charRace").value,
        class: document.getElementById("charClass").value,
        class2: document.getElementById("charClass2").value,
        class3: document.getElementById("charClass3").value,
        xpInput: document.getElementById("xpInput").value,
        level: document.getElementById("charLevel").value,
        currentHP: document.getElementById("currentHP").value,
        totalHP: document.getElementById9("totalHP").value,
        alignment: document.getElementById("charAlignment").value,
        background: document.getElementById("charBackground").value,
        str: document.getElementById("str").value,
        dex: document.getElementById("dex").value,
        con: document.getElementById("con").value,
        int: document.getElementById("int").value,
        wis: document.getElementById("wis").value,
        cha: document.getElementById("cha").value,
        notes: document.getElementById("charNotes").value,
    };

    const blob = new Blob([JSON.stringify(character, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${character.name || "character"}.json`;
    a.click();

    URL.revokeObjectURL(url);
}
function loadFromFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const data = JSON.parse(e.target.result);
        document.getElementById("charName").value = data.name || "";
        document.getElementById("charRace").value = data.race || "";
        document.getElementById("charClass").value = data.class || "";
        document.getElementById("charClass2").value = data.class2 || "";
        document.getElementById("charClass3").value = data.class3 || "";
        document.getElementById("xpInput").value = data.xpInput || "";
        document.getElementById("charLevel").value = data.level || "";
        document.getElementById("charAlignment").value = data.alignment || "";
        document.getElementById("charBackground").value = data.background || "";
        document.getElementById("str").value = data.str || 10;
        document.getElementById("dex").value = data.dex || 10;
        document.getElementById("con").value = data.con || 10;
        document.getElementById("int").value = data.int || 10;
        document.getElementById("wis").value = data.wis || 10;
        document.getElementById("cha").value = data.cha || 10;
        document.getElementById("charNotes").value = data.notes || "";
    };
    reader.readAsText(file);
}
function updateShareURL() {
    const character = {
        name: document.getElementById("charName").value,
        race: document.getElementById("charRace").value,
        class: document.getElementById("charClass").value,
        class2: document.getElementById("charClass2").value,
        class3: document.getElementById("charClass3").value,
        xpInput: document.getElementById("xpInput").value,
        level: document.getElementById("charLevel").value,
        alignment: document.getElementById("charAlignment").value,
        background: document.getElementById("charBackground").value,
        str: document.getElementById("str").value,
        dex: document.getElementById("dex").value,
        con: document.getElementById("con").value,
        int: document.getElementById("int").value,
        wis: document.getElementById("wis").value,
        cha: document.getElementById("cha").value,
        notes: document.getElementById("charNotes").value,
    };

    const encoded = encodeURIComponent(btoa(JSON.stringify(character)));
    const url = `${location.origin}${location.pathname}?c=${encoded}`;
    navigator.clipboard.writeText(url).then(() => alert("Shareable URL copied!"));
}
