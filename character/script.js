function saveToFile() {
    const character = {
        name: document.getElementById("charName").value,
        race: document.getElementById("charRace").value,
        class: document.getElementById("charClass").value,
        class2: document.getElementById("charClass2").value,
        class3: document.getElementById("charClass3").value,
        xpInput: document.getElementById("xpInput").value,
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
        blinded: document.getElementById("blinded").checked,
        charmed: document.getElementById("charmed").checked,
        deafened: document.getElementById("deafened").checked,
        frightened: document.getElementById("frightened").checked,
        grappled: document.getElementById("grappled").checked,
        incapacitated: document.getElementById("incapacitated").checked,
        invisible: document.getElementById("invisible").checked,
        paralyzed: document.getElementById("paralyzed").checked,
        petrified: document.getElementById("petrified").checked,
        poisened: document.getElementById("poisoned").checked,
        prone: document.getElementById("prone").checked,
        restrained: document.getElementById("restrained").checked,
        stunned: document.getElementById("stunned").checked,
        unconscious: document.getElementById("unconscious").checked,
        exhaustion: document.getElementById("exhaustion").checked,
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
        first: document.getElementById("1st").value,
        second: document.getElementById("2nd").value,
        third: document.getElementById("3rd").value,
        fourth: document.getElementById("4th").value,
        fifth: document.getElementById("5th").value,
        sixth: document.getElementById("6th").value,
        seventh: document.getElementById("7th").value,
        eighth: document.getElementById("8th").value,
        nineth: document.getElementById("9th").value,
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
        document.getElementById("blinded").checked = data.blinded;
        document.getElementById("charmed").checked = data.charmed;
        document.getElementById("deafened").checked = data.deafened;
        document.getElementById("frightened").checked = data.frightened;
        document.getElementById("grappled").checked = data.grappled;
        document.getElementById("incapacitated").checked = data.incapacitated;
        document.getElementById("invisible").checked = data.invisible;
        document.getElementById("paralyzed").checked = data.paralyzed;
        document.getElementById("petrified").checked = data.petrified;
        document.getElementById("poisoned").checked = data.poisoned;
        document.getElementById("prone").checked = data.prone;
        document.getElementById("restrained").checked = data.restrained;
        document.getElementById("stunned").checked = data.stunned;
        document.getElementById("unconscious").checked = data.unconscious;
        document.getElementById("exhaustion").checked = data.exhaustion;
        document.getElementById("str").value = data.str || 10;
        document.getElementById("dex").value = data.dex || 10;
        document.getElementById("con").value = data.con || 10;
        document.getElementById("int").value = data.int || 10;
        document.getElementById("wis").value = data.wis || 10;
        document.getElementById("cha").value = data.cha || 10;
        document.getElementById("strSaveProf").checked = data.strSaveProf;
        document.getElementById("dexSaveProf").checked = data.dexSaveProf;
        document.getElementById("conSaveProf").checked = data.conSaveProf;
        document.getElementById("intSaveProf").checked = data.intSaveProf;
        document.getElementById("wisSaveProf").checked = data.wisSaveProf;
        document.getElementById("chaSaveProf").checked = data.chaSaveProf;
        document.getElementById("charNotes").value = data.notes || "";
        document.getElementById("acroSaveProf").checked = data.acroSaveProf;
        document.getElementById("acroExpertise").checked = data.acroExpertise;
        document.getElementById("aniHanSaveProf").checked = data.aniHanSaveProf;
        document.getElementById("aniHanExpertise").checked = data.aniHanExpertise;
        document.getElementById("arcaSaveProf").checked = data.arcaSaveProf;
        document.getElementById("arcaExpertise").checked = data.arcaExpertise;
        document.getElementById("athlSaveProf").checked = data.athlSaveProf;
        document.getElementById("athlExpertise").checked = data.athlExpertise;
        document.getElementById("deceSaveProf").checked = data.deceSaveProf;
        document.getElementById("deceExpertise").checked = data.deceExpertise;
        document.getElementById("histSaveProf").checked = data.histSaveProf;
        document.getElementById("histExpertise").checked = data.histExpertise;
        document.getElementById("insiSaveProf").checked = data.insiSaveProf;
        document.getElementById("insiExpertise").checked = data.insiExpertise;
        document.getElementById("intiSaveProf").checked = data.intiSaveProf;
        document.getElementById("intiExpertise").checked = data.intiExpertise;
        document.getElementById("inveSaveProf").checked = data.inveSaveProf;
        document.getElementById("inveExpertise").checked = data.inveExpertise;
        document.getElementById("mediSaveProf").checked = data.mediSaveProf;
        document.getElementById("mediExpertise").checked = data.mediExpertise;
        document.getElementById("natuSaveProf").checked = data.natuSaveProf;
        document.getElementById("natuExpertise").checked = data.natuExpertise;
        document.getElementById("percSaveProf").checked = data.percSaveProf;
        document.getElementById("percExpertise").checked = data.percExpertise;
        document.getElementById("perfSaveProf").checked = data.perfSaveProf;
        document.getElementById("perfExpertise").checked = data.perfExpertise;
        document.getElementById("persSaveProf").checked = data.persSaveProf;
        document.getElementById("persExpertise").checked = data.persExpertise;
        document.getElementById("reliSaveProf").checked = data.reliSaveProf;
        document.getElementById("reliExpertise").checked = data.reliExpertise;
        document.getElementById("sleHanSaveProf").checked = data.sleHanSaveProf;
        document.getElementById("sleightHandExpertise").checked = data.sleightHandExpertise;
        document.getElementById("steaSaveProf").checked = data.steaSaveProf;
        document.getElementById("steaExpertise").checked = data.steaExpertise;
        document.getElementById("survSaveProf").checked = data.survSaveProf;
        document.getElementById("survExpertise").checked = data.survExpertise;
        document.getElementById("1st").value = data.first || 0;
        document.getElementById("2nd").value = data.second || 0;
        document.getElementById("3rd").value = data.third || 0;
        document.getElementById("4th").value = data.fourth || 0;
        document.getElementById("5th").value = data.fifth || 0;
        document.getElementById("6th").value = data.sixth || 0;
        document.getElementById("7th").value = data.seventh || 0;
        document.getElementById("8th").value = data.eighth || 0;
        document.getElementById("9th").value = data.nineth || 0;
        updateSavingThrows();
        updateSkills();
        updateHitDice();
        updatePassivePerception();
        updateSubclass2Visibility();
        updateSubclass3Visibility();
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
        first: document.getElementById("1st").value,
        second: document.getElementById("2nd").value,
        third: document.getElementById("3rd").value,
        fourth: document.getElementById("4th").value,
        fifth: document.getElementById("5th").value,
        sixth: document.getElementById("6th").value,
        seventh: document.getElementById("7th").value,
        eighth: document.getElementById("8th").value,
        nineth: document.getElementById("9th").value,
    };

    const encoded = encodeURIComponent(btoa(JSON.stringify(character)));
    const url = `${location.origin}${location.pathname}?c=${encoded}`;
    navigator.clipboard.writeText(url).then(() => alert("Shareable URL copied!"));
}
