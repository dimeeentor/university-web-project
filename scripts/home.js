import { doChooseFontSize, doChooseTheme } from "../scripts/utils.js"

const changeFontBtn = document.getElementById("change-font-size")
const themeBtns = document.querySelectorAll(".theme-switcher > button")
const lightThemeBtn = document.querySelector(".light")
const darkThemeBtn = document.querySelector(".dark")
const autoThemeBtn = document.querySelector(".auto")

changeFontBtn.addEventListener("click", () => doChooseFontSize())

lightThemeBtn.addEventListener("click", () =>
  doChooseTheme(themeBtns, lightThemeBtn)
)

darkThemeBtn.addEventListener("click", () => doChooseTheme(themeBtns, darkThemeBtn))

autoThemeBtn.addEventListener("click", () => doChooseTheme(themeBtns, autoThemeBtn))
