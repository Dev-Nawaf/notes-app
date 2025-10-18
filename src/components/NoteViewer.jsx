import NoteContent from './NoteContent';

const NoteViewer = ({ note, isMobile = false }) => (
  <div className={isMobile ? 'p-4' : 'p-6'}>
    {isMobile && (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <NoteContent note={note} />
      </div>
    )}
    {!isMobile && <NoteContent note={note} />}
  </div>
);

export default NoteViewer;
