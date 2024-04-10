const films = document.querySelectorAll(".film")
const dialoges = document.querySelectorAll("dialog")

films.forEach((film) => {
  film.addEventListener("click", () => {
    film.lastElementChild.showModal()
  })
})

dialoges.forEach((dialog) => {
  dialog.addEventListener("click", () => {})
})
