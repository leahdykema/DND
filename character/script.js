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
        blinded: document.getElementById("blinded").value,
        charmed: document.getElementById("charmed").value,
        deafened: document.getElementById("deafened").value,
        frightened: document.getElementById("frightened").value,
        grappled: document.getElementById("grappled").value,
        incapacitated: document.getElementById("incapacitated").value,
        invisible: document.getElementById("invisible").value,
        paralyzed: document.getElementById("paralyzed").value,
        petrified: document.getElementById("petrified").value,
        poisened: document.getElementById("poisoned").value,
        prone: document.getElementById("prone").value,
        restrained: document.getElementById("restrained").value,
        stunned: document.getElementById("stunned").value,
        unconscious: document.getElementById("unconscious").value,
        exhaustion: document.getElementById("exhaustion").value,
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
        acroSaveProf: document.getElementById("acroSaveProf").checked,
        acroExpertise: document.getElementById("acroExpertise").checked,
        aniHanSaveProf: document.getElementById("aniHanSaveProf").checked,
        aniHanExpertise: document.getElementById("aniHanExpertise").checked,
        arcaSaveProf: document.getElementById("arcaSaveProf").checked,
        arcaExpertise: document.getElementById("arcaExpertise").checked,
        athlSaveProf: document.getElementById("athlSaveProf").checked,
        athlExpertise: document.getElementById("athlExpertise").checked,
        deceSaveProf: document.getElementById("deceSaveProf").checked,
        deceExpertise: document.getElementById("deceExpertise").checked,
        histSaveProf: document.getElementById("histSaveProf").checked,
        histExpertise: document.getElementById("histExpertise").checked,
        insiSaveProf: document.getElementById("insiSaveProf").checked,
        insiExpertise: document.getElementById("insiExpertise").checked,
        intiSaveProf: document.getElementById("intiSaveProf").checked,
        intiExpertise: document.getElementById("intiExpertise").checked,
        inveSaveProf: document.getElementById("inveSaveProf").checked,
        inveExpertise: document.getElementById("inveExpertise").checked,
        mediSaveProf: document.getElementById("mediSaveProf").checked,
        mediExpertise: document.getElementById("mediExpertise").checked,
        natuSaveProf: document.getElementById("natuSaveProf").checked,
        natuExpertise: document.getElementById("natuExpertise").checked,
        percSaveProf: document.getElementById("percSaveProf").checked,
        percExpertise: document.getElementById("percExpertise").checked,
        perfSaveProf: document.getElementById("perfSaveProf").checked,
        perfExpertise: document.getElementById("perfExpertise").checked,
        persSaveProf: document.getElementById("persSaveProf").checked,
        persExpertise: document.getElementById("persExpertise").checked,
        reliSaveProf: document.getElementById("reliSaveProf").checked,
        reliExpertise: document.getElementById("reliExpertise").checked,
        sleHanSaveProf: document.getElementById("sleHanSaveProf").checked,
        sleightHandExpertise: document.getElementById("sleightHandExpertise").checked,
        steaSaveProf: document.getElementById("steaSaveProf").checked,
        steaExpertise: document.getElementById("steaExpertise").checked,
        survSaveProf: document.getElementById("survSaveProf").checked,
        survExpertise: document.getElementById("survExpertise").checked,
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
        document.getElementById("blinded").checked = character.blinded;
        document.getElementById("charmed").checked = character.charmed;
        document.getElementById("deafened").checked = character.deafened;
        document.getElementById("frightened").checked = character.frightened;
        document.getElementById("grappled").checked = character.grappled;
        document.getElementById("incapacitated").checked = character.incapacitated;
        document.getElementById("invisible").checked = character.invisible;
        document.getElementById("paralyzed").checked = character.paralyzed;
        document.getElementById("petrified").checked = character.petrified;
        document.getElementById("poisoned").checked = character.poisoned;
        document.getElementById("prone").checked = character.prone;
        document.getElementById("restrained").checked = character.restrained;
        document.getElementById("stunned").checked = character.stunned;
        document.getElementById("unconscious").checked = character.unconscious;
        document.getElementById("exhaustion").checked = character.exhaustion;
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
        document.getElementById("acroSaveProf").checked = character.acroSaveProf;
        document.getElementById("acroExpertise").checked = character.acroExpertise;
        document.getElementById("aniHanSaveProf").checked = character.aniHanSaveProf;
        document.getElementById("aniHanExpertise").checked = character.aniHanExpertise;
        document.getElementById("arcaSaveProf").checked = character.arcaSaveProf;
        document.getElementById("arcaExpertise").checked = character.arcaExpertise;
        document.getElementById("athlSaveProf").checked = character.athlSaveProf;
        document.getElementById("athlExpertise").checked = character.athlExpertise;
        document.getElementById("deceSaveProf").checked = character.deceSaveProf;
        document.getElementById("deceExpertise").checked = character.deceExpertise;
        document.getElementById("histSaveProf").checked = character.histSaveProf;
        document.getElementById("histExpertise").checked = character.histExpertise;
        document.getElementById("insiSaveProf").checked = character.insiSaveProf;
        document.getElementById("insiExpertise").checked = character.insiExpertise;
        document.getElementById("intiSaveProf").checked = character.intiSaveProf;
        document.getElementById("intiExpertise").checked = character.intiExpertise;
        document.getElementById("inveSaveProf").checked = character.inveSaveProf;
        document.getElementById("inveExpertise").checked = character.inveExpertise;
        document.getElementById("mediSaveProf").checked = character.mediSaveProf;
        document.getElementById("mediExpertise").checked = character.mediExpertise;
        document.getElementById("natuSaveProf").checked = character.natuSaveProf;
        document.getElementById("natuExpertise").checked = character.natuExpertise;
        document.getElementById("percSaveProf").checked = character.percSaveProf;
        document.getElementById("percExpertise").checked = character.percExpertise;
        document.getElementById("perfSaveProf").checked = character.perfSaveProf;
        document.getElementById("perfExpertise").checked = character.perfExpertise;
        document.getElementById("persSaveProf").checked = character.persSaveProf;
        document.getElementById("persExpertise").checked = character.persExpertise;
        document.getElementById("reliSaveProf").checked = character.reliSaveProf;
        document.getElementById("reliExpertise").checked = character.reliExpertise;
        document.getElementById("sleHanSaveProf").checked = character.sleHanSaveProf;
        document.getElementById("sleightHandExpertise").checked = character.sleightHandExpertise;
        document.getElementById("steaSaveProf").checked = character.steaSaveProf;
        document.getElementById("steaExpertise").checked = character.steaExpertise;
        document.getElementById("survSaveProf").checked = character.survSaveProf;
        document.getElementById("survExpertise").checked = character.survExpertise;
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
        blinded: document.getElementById("blinded").value,
        charmed: document.getElementById("charmed").value,
        deafened: document.getElementById("deafened").value,
        frightened: document.getElementById("frightened").value,
        grappled: document.getElementById("grappled").value,
        incapacitated: document.getElementById("incapacitated").value,
        invisible: document.getElementById("invisible").value,
        paralyzed: document.getElementById("paralyzed").value,
        petrified: document.getElementById("petrified").value,
        poisened: document.getElementById("poisoned").value,
        prone: document.getElementById("prone").value,
        restrained: document.getElementById("restrained").value,
        stunned: document.getElementById("stunned").value,
        unconscious: document.getElementById("unconscious").value,
        exhaustion: document.getElementById("exhaustion").value,
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
        acroSaveProf: document.getElementById("acroSaveProf").checked,
        acroExpertise: document.getElementById("acroExpertise").checked,
        aniHanSaveProf: document.getElementById("aniHanSaveProf").checked,
        aniHanExpertise: document.getElementById("aniHanExpertise").checked,
        arcaSaveProf: document.getElementById("arcaSaveProf").checked,
        arcaExpertise: document.getElementById("arcaExpertise").checked,
        athlSaveProf: document.getElementById("athlSaveProf").checked,
        athlExpertise: document.getElementById("athlExpertise").checked,
        deceSaveProf: document.getElementById("deceSaveProf").checked,
        deceExpertise: document.getElementById("deceExpertise").checked,
        histSaveProf: document.getElementById("histSaveProf").checked,
        histExpertise: document.getElementById("histExpertise").checked,
        insiSaveProf: document.getElementById("insiSaveProf").checked,
        insiExpertise: document.getElementById("insiExpertise").checked,
        intiSaveProf: document.getElementById("intiSaveProf").checked,
        intiExpertise: document.getElementById("intiExpertise").checked,
        inveSaveProf: document.getElementById("inveSaveProf").checked,
        inveExpertise: document.getElementById("inveExpertise").checked,
        mediSaveProf: document.getElementById("mediSaveProf").checked,
        mediExpertise: document.getElementById("mediExpertise").checked,
        natuSaveProf: document.getElementById("natuSaveProf").checked,
        natuExpertise: document.getElementById("natuExpertise").checked,
        percSaveProf: document.getElementById("percSaveProf").checked,
        percExpertise: document.getElementById("percExpertise").checked,
        perfSaveProf: document.getElementById("perfSaveProf").checked,
        perfExpertise: document.getElementById("perfExpertise").checked,
        persSaveProf: document.getElementById("persSaveProf").checked,
        persExpertise: document.getElementById("persExpertise").checked,
        reliSaveProf: document.getElementById("reliSaveProf").checked,
        reliExpertise: document.getElementById("reliExpertise").checked,
        sleHanSaveProf: document.getElementById("sleHanSaveProf").checked,
        sleightHandExpertise: document.getElementById("sleightHandExpertise").checked,
        steaSaveProf: document.getElementById("steaSaveProf").checked,
        steaExpertise: document.getElementById("steaExpertise").checked,
        survSaveProf: document.getElementById("survSaveProf").checked,
        survExpertise: document.getElementById("survExpertise").checked,
    };

    const encoded = encodeURIComponent(btoa(JSON.stringify(character)));
    const url = `${location.origin}${location.pathname}?c=${encoded}`;
    navigator.clipboard.writeText(url).then(() => alert("Shareable URL copied!"));
}
