class NotesManager extends CardManager {

  emptyElem = {
    title: "Title",
    content: "Just another note..."
  }

  constructor() {
    super("notes")
  }

  newCard(note) {
    // title
    const h4 = document.createElement("h4")
    h4.innerText = note.title
    // description
    const p = document.createElement("p")
    p.innerText = note.content
    // card
    const card = super.newCard(note)
    card.appendChild(h4)
    card.appendChild(p)
    return card
  }

  saveCard(card) {
    // prepare the updated note
    const note = {
      id:      card.id,
      title:   card.getElementsByTagName("h4")[0].innerText,
      content: card.getElementsByTagName("p")[0].innerText
    }
    // pass the info to the superclass that will do the PUT request
    super.saveCard(note)
  }

}