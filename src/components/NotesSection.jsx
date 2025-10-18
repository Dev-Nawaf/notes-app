import NoteCard from './NoteCard';
const NotesSection = ({
  title,
  notes,
  selectedNote,
  onNoteClick,
  onNoteDelete,
  isMobile = false,
  titleColor = 'text-gray-500',
}) => (
  <div className={isMobile ? 'mb-6' : ''}>
    <h3 className={`text-sm font-medium mb-2 ${titleColor}`}>{title}</h3>
    {notes.map((note) => (
      <NoteCard
        key={note.id}
        note={note}
        isSelected={selectedNote?.id === note.id}
        onClick={onNoteClick}
        onDelete={onNoteDelete}
        isMobile={isMobile}
      />
    ))}
  </div>
);

export default NotesSection;
