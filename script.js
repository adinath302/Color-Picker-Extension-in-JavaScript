const colorpickerbtn = document.querySelector("#color-picker");
const colorlist = document.querySelector(".all-colors");
const clearAll = document.querySelector(".clear-all");
const pickedcolors = JSON.parse(localStorage.getItem("picked-colors") || "[]");

const copyColor = elem =>{
    navigator.clipboard.writeText(elem.dataset.color);
    elem.innerText = "Copied";
    setTimeout(() => elem.innerText = elem.dataset.color,1000)
}

const showcolors = () => {
    if(!pickedcolors.length) return;
    colorlist.innerHTML = pickedcolors.map(color => `
   <li class="color">
      <span class="rect" style="background:${color}; border: 1px solid ${color == "#ffffff" ? "ccc" : color}"></span>
      <span class="value" data-color="${color}">${color}</span>
   </li>
   `).join("");
   document.querySelector(".picked-colors").classList.remove("hide");

    document.querySelectorAll(".color").forEach(li => {
        li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));
    });
}
showcolors();

const activateeyedropper = async () => {
    try {
        const eyeDropper = new EyeDropper();
        const { sRGBHex } = await eyeDropper.open();
        navigator.clipboard.writeText(sRGBHex);

        if (!pickedcolors.includes(sRGBHex)) {
            pickedcolors.push(sRGBHex);
            localStorage.setItem("picked-colors", JSON.stringify(pickedcolors));
            showcolors();
        }
    } catch (error) {
        console.log(error);
    }
}
const clearAllcolors = () =>{
    pickedcolors.length = 0;
    localStorage.setItem("picked-colors", JSON.stringify(pickedcolors));
    document.querySelector(".picked-colors").classList.add("hide");

}
clearAll.addEventListener("click", clearAllcolors);
colorpickerbtn.addEventListener("click", activateeyedropper);