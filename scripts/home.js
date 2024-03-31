import { doChooseFontSize } from "./utils.js"

const changeFontBtn = document.getElementById("change-font-size")
changeFontBtn.addEventListener("click", () => doChooseFontSize())
