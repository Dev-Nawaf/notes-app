import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import SearchBar from './components/SearchBar';
import { useNotes } from './hooks/useNotes.js';
import { useScreenSize } from './hooks/useScreenSize.js';
import DesktopSidebar from './components/DesktopSidebar';
import MobileHeader from './components/MobileHeader';
import MobileSidebar from './components/MobileSidebar';
import FloatingAddButton from './components/FloatingAddButton';
import NotesSection from './components/NotesSection';
import NoteViewer from './components/NoteViewer';
import NoteForm from './components/NoteForm';

function App() {
  const [currentView, setCurrentView] = useState('notes');
  const [selectedNote, setSelectedNote] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    author: '',
    content: '',
    isPinned: false,
  });

  const isMobile = useScreenSize();
  const { notes, addNote, deleteNote, getFilteredNotes, getSortedNotes } =
    useNotes();

  const filteredNotes = getFilteredNotes(searchQuery);
  const sortedNotes = getSortedNotes(filteredNotes);
  const pinnedNotes = sortedNotes.filter((note) => note.isPinned);
  const regularNotes = sortedNotes.filter((note) => !note.isPinned);

  // Set initial selected note
  useEffect(() => {
    if (notes.length > 0 && !selectedNote) {
      const initialNote = pinnedNotes.length > 0 ? pinnedNotes[0] : notes[0];
      setSelectedNote(initialNote);
    }
  }, [notes, selectedNote, pinnedNotes]);

  const handleAddNote = (isPinned = false) => {
    const addedNote = addNote(newNote, isPinned);
    if (addedNote) {
      setNewNote({ title: '', author: '', content: '', isPinned: false });
      setSelectedNote(addedNote);

      if (isMobile) {
        setCurrentView('viewNote');
      } else {
        setCurrentView('notes');
      }
    }
  };

  const handleDeleteNote = (noteId) => {
    deleteNote(noteId);
    if (selectedNote && selectedNote.id === noteId) {
      const remainingNotes = notes.filter((note) => note.id !== noteId);
      setSelectedNote(remainingNotes.length > 0 ? remainingNotes[0] : null);
      if (isMobile && remainingNotes.length === 0) {
        setCurrentView('notes');
      }
    }
  };

  const handleNoteSelect = (note) => {
    setSelectedNote(note);
    if (isMobile) {
      setCurrentView('viewNote');
    }
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
    setMobileSearchVisible(false);
  };

  const handleBackToNotes = () => {
    if (isMobile) {
      setCurrentView('notes');
      setMobileSearchVisible(false);
    }
  };

  const handleMobileSearchToggle = () => {
    setMobileSearchVisible(!mobileSearchVisible);
    if (mobileSearchVisible) {
      setSearchQuery('');
    }
  };

  // Mobile Views
  if (isMobile) {
    if (currentView === 'addNote') {
      return (
        <div className="min-h-screen bg-gray-50 relative overflow-hidden transition-all duration-300">
          <MobileSidebar
            isOpen={mobileMenuOpen}
            setIsOpen={setMobileMenuOpen}
            onNavigate={handleNavigation}
            currentView={currentView}
          />
          <div
            className={`p-4 ${mobileMenuOpen ? 'translate-x-64 transition-all duration-300' : ''}`}
          >
            <MobileHeader
              title="Notes App"
              currentView={currentView}
              showMenu={true}
              onMenuToggle={() => setMobileMenuOpen(true)}
            />
            <NoteForm
              note={newNote}
              onChange={setNewNote}
              onSubmit={handleAddNote}
              onCancel={handleBackToNotes}
              isMobile={true}
            />
          </div>
        </div>
      );
    }

    if (currentView === 'viewNote' && selectedNote) {
      return (
        <div className="min-h-screen bg-gray-50">
          <MobileHeader
            title="Notes App"
            showBack={true}
            onBack={handleBackToNotes}
          />
          <NoteViewer note={selectedNote} isMobile={true} />
        </div>
      );
    }

    // Mobile Notes List
    return (
      <div className="min-h-screen bg-gray-50 relative overflow-hidden transform transition-transform duration-300">
        <MobileSidebar
          isOpen={mobileMenuOpen}
          onNavigate={handleNavigation}
          setIsOpen={setMobileMenuOpen}
          currentView={currentView}
        />
        <div className={`p-4 ${mobileMenuOpen ? 'translate-x-64' : ''}`}>
          <MobileHeader
            title="Notes App"
            showMenu={true}
            onMenuToggle={() => setMobileMenuOpen(true)}
            onSearchToggle={handleMobileSearchToggle}
            currentView={currentView}
            searchVisible={mobileSearchVisible}
          />

          <div className="p-4">
            {mobileSearchVisible && (
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                className="mb-4"
              />
            )}

            {pinnedNotes.length > 0 && (
              <NotesSection
                title="PINNED"
                notes={pinnedNotes}
                selectedNote={selectedNote}
                onNoteClick={handleNoteSelect}
                onNoteDelete={handleDeleteNote}
                isMobile={true}
                titleColor="text-red-500"
              />
            )}

            {regularNotes.length > 0 && (
              <NotesSection
                title="Notes"
                notes={regularNotes}
                selectedNote={selectedNote}
                onNoteClick={handleNoteSelect}
                onNoteDelete={handleDeleteNote}
                isMobile={true}
              />
            )}

            {sortedNotes.length === 0 && (
              <div className="text-center py-8 text-gray-500">No Notes Yet</div>
            )}
          </div>

          <FloatingAddButton onClick={() => setCurrentView('addNote')} />
        </div>
      </div>
    );
  }

  // if not mobile then Desktop View well show
  return (
    <div className="min-h-screen w-full bg-gray-50 flex">
      <DesktopSidebar
        currentView={currentView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigate={handleNavigation}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {currentView === 'notes' && (
        <div
          className={`bg-white shadow-lg transition-all border-r-[#e7e7e9] duration-300 ${
            sidebarCollapsed
              ? 'w-0 overflow-hidden border-r-0 px-0'
              : 'w-80 px-4'
          } flex flex-col`}
        >
          <div
            className={`p-4 border-b border-gray-200 ${sidebarCollapsed ? 'hidden' : ''}`}
          >
            <div className="flex items-center justify-between mb-4">
              {pinnedNotes.length > 0 && (
                <div className="mb-6 w-full">
                  <NotesSection
                    title="PINNED"
                    notes={pinnedNotes}
                    selectedNote={selectedNote}
                    onNoteClick={setSelectedNote}
                    onNoteDelete={handleDeleteNote}
                    titleColor="text-[#EC7160]"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4 overflow-y-auto h-4/5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Notes</h2>
                <button
                  onClick={() => setCurrentView('addNote')}
                  className="p-2 text-orange-500 hover:bg-orange-50 rounded-full"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {regularNotes.length > 0 && (
                <NotesSection
                  title="Notes"
                  notes={regularNotes}
                  selectedNote={selectedNote}
                  onNoteClick={setSelectedNote}
                  onNoteDelete={handleDeleteNote}
                />
              )}

              {sortedNotes.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No Notes Yet
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col container mx-auto">
        {currentView === 'notes' ? (
          <>
            <div className="flex-1 bg-white rounded-lg shadow-sm">
              {selectedNote ? (
                <NoteViewer note={selectedNote} />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Select a note to view
                </div>
              )}
            </div>
            <FloatingAddButton onClick={() => setCurrentView('addNote')} />
          </>
        ) : (
          <div className="flex-1 bg-white rounded-lg shadow-sm">
            <NoteForm
              note={newNote}
              onChange={setNewNote}
              onSubmit={handleAddNote}
              onCancel={() => setCurrentView('notes')}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
