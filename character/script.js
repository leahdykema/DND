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
        totalHP: document.getElementById("totalHP").value,
        background: document.getElementById("charBackground").value,
        alignment: document.getElementById("charAlignment").value,
        traits: document.getElementById("charTraits").value,
        ideals: document.getElementById("charIdeals").value,
        bonds: document.getElementById("charBonds").value,
        flaws: document.getElementById("charFlaws").value,
        about: document.getElementById("charAbout").value,
        armor: document.getElementById("armorClass").value,
        initiative: document.getElementById("initiative").value,
        speed: document.getElementById("speed").value,
        fly: document.getElementById("fly").value,
        climb: document.getElementById("climb").value,
        swim: document.getElementById("swim").value,
        burrow: document.getElementById("burrow").value,
        pp: document.getElementById("passivePerception").value,
        pb: document.getElementById("proficiencyBonus").value,
        hd: document.getElementById("hitDice").value,
        str: document.getElementById("str").value,
        dex: document.getElementById("dex").value,
        con: document.getElementById("con").value,
        int: document.getElementById("int").value,
        wis: document.getElementById("wis").value,
        cha: document.getElementById("cha").value,
        strSaveProf: document.getElementById("strSaveProf").checked,
        dexSaveProf: document.getElementById("dexSaveProf").checked,
        conSaveProf: document.getElementById("conSaveProf").checked,
        intSaveProf: document.getElementById("intSaveProf").checked,
        wisSaveProf: document.getElementById("wisSaveProf").checked,
        chaSaveProf: document.getElementById("chaSaveProf").checked,
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
        document.getElementById("currentHP").value = data.currentHP || "";
        document.getElementById("totalHP").value = data.totalHP || "";
        document.getElementById("charBackground").value = data.background || "";
        document.getElementById("charAlignment").value = data.alignment || "";
        document.getElementById("charTraits").value = data.traits || "";
        document.getElementById("charIdeals").value = data.ideals || "";
        document.getElementById("charBonds").value = data.bonds || "";
        document.getElementById("charFlaws").value = data.flaws || "";
        document.getElementById("charAbout").value = data.about || "";
        document.getElementById("armorClass").value = data.armor || 10;
        document.getElementById("initiative").value = data.initiative || 0;
        document.getElementById("speed").value = data.speed || 30;
        document.getElementById("fly").value = data.fly || 0;
        document.getElementById("climb").value = data.climb || 0;
        document.getElementById("swim").value = data.swim || 0;
        document.getElementById("burrow").value = data.burrow || 0;
        document.getElementById("passivePerception").value = data.pp || 10;
        document.getElementById("proficiencyBonus").value = data.pb || "+2";
        document.getElementById("hitDice").value = data.hd || 1;
        document.getElementById("str").value = data.str || 10;
        document.getElementById("dex").value = data.dex || 10;
        document.getElementById("con").value = data.con || 10;
        document.getElementById("int").value = data.int || 10;
        document.getElementById("wis").value = data.wis || 10;
        document.getElementById("cha").value = data.cha || 10;
        document.getElementById("strSaveProf").checked = character.strSaveProf;
        document.getElementById("dexSaveProf").checked = character.dexSaveProf;
        document.getElementById("conSaveProf").checked = character.conSaveProf;
        document.getElementById("intSaveProf").checked = character.intSaveProf;
        document.getElementById("wisSaveProf").checked = character.wisSaveProf;
        document.getElementById("chaSaveProf").checked = character.chaSaveProf;
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
        currentHP: document.getElementById("currentHP").value,
        totalHP: document.getElementById("totalHP").value,
        background: document.getElementById("charBackground").value,
        alignment: document.getElementById("charAlignment").value,
        traits: document.getElementById("charTraits").value,
        ideals: document.getElementById("charIdeals").value,
        bonds: document.getElementById("charBonds").value,
        flaws: document.getElementById("charFlaws").value,
        about: document.getElementById("charAbout").value,
        armor: document.getElementById("armorClass").value,
        initiative: document.getElementById("initiative").value,
        speed: document.getElementById("speed").value,
        fly: document.getElementById("fly").value,
        climb: document.getElementById("climb").value,
        swim: document.getElementById("swim").value,
        burrow: document.getElementById("burrow").value,
        pp: document.getElementById("passivePerception").value,
        pb: document.getElementById("proficiencyBonus").value,
        hd: document.getElementById("hitDice").value,
        str: document.getElementById("str").value,
        dex: document.getElementById("dex").value,
        con: document.getElementById("con").value,
        int: document.getElementById("int").value,
        wis: document.getElementById("wis").value,
        cha: document.getElementById("cha").value,
        strSaveProf: document.getElementById("strSaveProf").checked,
        dexSaveProf: document.getElementById("dexSaveProf").checked,
        conSaveProf: document.getElementById("conSaveProf").checked,
        intSaveProf: document.getElementById("intSaveProf").checked,
        wisSaveProf: document.getElementById("wisSaveProf").checked,
        chaSaveProf: document.getElementById("chaSaveProf").checked,
        notes: document.getElementById("charNotes").value,
    };

    const encoded = encodeURIComponent(btoa(JSON.stringify(character)));
    const url = `${location.origin}${location.pathname}?c=${encoded}`;
    navigator.clipboard.writeText(url).then(() => alert("Shareable URL copied!"));
}
