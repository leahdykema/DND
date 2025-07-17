const class1 = document.getElementById("charClass");
const class2 = document.getElementById("charClass2");
const level = document.getElementById("charLevel");
function updateClass2Dropdown() {
    const selectedClass = class1.value;
    const currentLevel = parseInt(level.value, 10);
    if (currentLevel >= 3) {
        class2.style.display = "inline-block";
        class2.disabled = false;
    } else {
        class2.style.display = "none";
        class2.disabled = true;
        return;
    }
    const optgroups = class2.querySelectorAll("optgroup");
    optgroups.forEach(group => {
        if (group.label === selectedClass) {
            group.style.display = "block";
        } else {
            group.style.display = "none";
        }
    });
    const currentOpt = class2.options[class2.selectedIndex];
    if (currentOpt && currentOpt.parentElement.style.display === "none") {
        class2.selectedIndex = 0;
    }
}
class1.addEventListener("change", updateClass2Dropdown);
level.addEventListener("input", updateClass2Dropdown);
updateClass2Dropdown();
