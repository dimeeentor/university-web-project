const films = document.querySelectorAll(".film")

films.forEach((film) => {
  film.addEventListener("click", () => {
    film.lastElementChild.showModal()
  })
})
