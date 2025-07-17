const class1 = document.getElementById("charClass");
const class2 = document.getElementById("charClass2");
const level = document.getElementById("charLevel");
const subclass = document.querySelector(".form-row.subclass");
const originalOptgroups = Array.from(class2.querySelectorAll("optgroup"));
function updateClass2Dropdown() {
    const selectedClass = class1.value;
    const currentLevel = parseInt(level.value, 10);
    if (currentLevel >= 3) {
        subclass.style.display = "flex";
    } else {
        subclass.style.display = "none";
        return;
    }
    class2.innerHTML = "";

    const matchingOptgroup = originalOptgroups.find(group => group.label === selectedClass);
    if (matchingOptgroup) {
        class2.appendChild(matchingOptgroup.cloneNode(true));
    }
}
class1.addEventListener("change", updateClass2Dropdown);
level.addEventListener("input", updateClass2Dropdown);
updateClass2Dropdown();
