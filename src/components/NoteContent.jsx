const NoteContent = ({ note }) => (
  <>
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h2
          className={`font-bold text-gray-900 break-all ${window.innerWidth < 768 ? 'text-xl' : 'text-2xl'}`}
        >
          {note.title}
        </h2>
        {note.isPinned && (
          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
            Pinned
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500">
        {note.createdAt} | By {note.author}
      </p>
    </div>
    <div className="prose max-w-none">
      <span className="text-gray-700 text-wrap break-all">{note.content}</span>
    </div>
  </>
);

export default NoteContent;
