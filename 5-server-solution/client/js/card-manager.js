/* GENERIC CARD MANAGER
 * BookmarksManager and NotesManager will inherit from this class and just need to implement some method
 */
class CardManager {

  emptyElem = {}

  constructor(name) {
    this.name = name
    this.endpoint = `/api/${name}`
    this.section = document.getElementById(name)
  }

  async refresh() {
    const list = await fetch(this.endpoint).then(res => res.json())
    this.updateCards(list[this.name])
  }

  updateCards(list = []) {
    // remove previous cards from the section
    const articles = this.section.getElementsByTagName("article")
    // Curiosity: the article array is not a deep copy, but a pointer.
    // Hence, section.removeChild(articles[0]) removes also the article from articles.
    // For that reason we can/must remove always the article in the same index,
    // and we can't use a for loop.
    while (articles.length)
      this.section.removeChild(articles[0])
    
    // add the new cards
    for (let elem of list)
      this.newCard(elem)
      //this.section.appendChild(this.newCard(elem))
  }

  newCard(elem) {
    // delete button
    const deleteButton = document.createElement("button")
    deleteButton.classList = "icon delete"
    deleteButton.onclick = () => this.deleteCard(deleteButton.parentElement)
    // edit button
    const editButton = document.createElement("button")
    editButton.classList = "icon edit"
    editButton.onclick = () => this.editCard(editButton.parentElement)
    // card
    const article = document.createElement("article")
    article.id = elem.id
    article.appendChild(deleteButton)
    article.appendChild(editButton)
    this.section.appendChild(article)
    return article
  }

  async addCard() {
    // Make the POST request with the default empty element
    const id = await fetch(this.endpoint, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.emptyElem)
    }).then(res => res.json())
      .then(res => res.id)

    // create a new card
    const card = this.newCard({ id, ...this.emptyElem })
    card.classList = card.classList + " added"
    return card
  }

  async deleteCard(card) {
    // add the animation class and await the animation to end
    card.classList = card.classList + " deleted"
    await new Promise(resolve => setTimeout(resolve, 1700)) // Clickety-click... Barba-trick!
    // Make the DELETE request
    await fetch(`${this.endpoint}/${card.id || ""}`, { method: "DELETE" })
    // just update everything and restore the tidiness of the section
    this.refresh()
  }

  editCard(card) {
    // update the button icon and action
    const editButton = card.getElementsByClassName("edit")[0]
    editButton.classList.replace("edit", "save")
    editButton.onclick = () => this.saveCard(editButton.parentElement)
    // make everything editable
    // yeah bitches, that's dark magic!
    for (let child of card.children)
      if (child != editButton)
        child.contentEditable = true
  }

  async saveCard(card) {
    const {id, ...data} = card
    // Make the PUT request with the updated element
    await fetch(`${this.endpoint}/${id || ""}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    // just update everything and restore the tidiness of the section
    this.refresh()
  }

}