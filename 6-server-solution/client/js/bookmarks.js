class BookmarksManager extends CardManager {

  emptyElem = {
    name: "Title",
    url: "https://my.url",
    comment: "Just another bookmark..."
  }

  constructor() {
    super("bookmarks")
  }

  newCard(bookmark) {
    // title
    const h4 = document.createElement("h4")
    h4.innerText = bookmark.name
    // link
    const a = document.createElement("a")
    a.innerText = bookmark.url
    a.href = bookmark.url
    // description
    const p = document.createElement("p")
    p.innerText = bookmark.comment
    // card
    const card = super.newCard(bookmark)
    card.appendChild(h4)
    card.appendChild(a)
    card.appendChild(p)
    return card
  }

  saveCard(card) {
    // prepare the updated bookmark
    const bookmark = {
      id:      card.id,
      name:    card.getElementsByTagName("h4")[0].innerText,
      url:     card.getElementsByTagName("a")[0].innerText,
      comment: card.getElementsByTagName("p")[0].innerText
    }
    // pass the info to the superclass that will do the PUT request
    super.saveCard(bookmark)
  }

}