import { useEffect, useState } from 'react';
import { loadFromStorage, saveToStorage } from '../utils';

export const useNotes = () => {
  const [notes, setNotes] = useState(() => {
    // Initialize notes from localStorage immediately
    return loadFromStorage();
  });

  useEffect(() => {
    // Save notes to localStorage whenever notes change
    if (!notes) return;
    saveToStorage(notes);
  }, [notes]);

  const addNote = (newNote, isPinned = false) => {
    if (!newNote.title.trim() || !newNote.content.trim()) return false;

    if (isPinned) {
      setNotes((prev) => prev.map((note) => ({ ...note, isPinned: false })));
    }

    const note = {
      id: Date.now(),
      title: newNote.title,
      author: newNote.author || 'Unknown',
      content: newNote.content,
      isPinned,
      createdAt: new Date().toLocaleDateString('en-US'),
    };

    setNotes((prev) => [note, ...prev]);
    return note;
  };

  const deleteNote = (noteId) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
  };

  const getFilteredNotes = (searchQuery) => {
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getSortedNotes = (filteredNotes) => {
    return [...filteredNotes].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });
  };

  return {
    notes,
    addNote,
    deleteNote,
    getFilteredNotes,
    getSortedNotes,
  };
};
