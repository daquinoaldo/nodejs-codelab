const bookmarksManager = new BookmarksManager()
const notesManager = new NotesManager()

function refreshData() {
  bookmarksManager.refresh()
  notesManager.refresh()
}