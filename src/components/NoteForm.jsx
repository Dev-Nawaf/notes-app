import { X } from 'lucide-react';

const NoteForm = ({ note, onChange, onSubmit, onCancel, isMobile = false }) => (
  <div className="p-6">
    {!isMobile && (
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Note</h1>
        <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>
    )}

    <div
      className={`lg:mx-52 lg:my-28 ${isMobile ? 'bg-white rounded-lg shadow-sm p-6' : ''}`}
    >
      <div className="w-full lg:w-[600px] flex flex-col gap-9 md:gap-10">
        {isMobile && (
          <h1 className="text-2xl font-bold text-gray-900">Add Note</h1>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={note.title}
            onChange={(e) => onChange({ ...note, title: e.target.value })}
            placeholder="Add note title"
            className="bg-[#F6F6F6] w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author
          </label>
          <input
            type="text"
            value={note.author}
            onChange={(e) => onChange({ ...note, author: e.target.value })}
            placeholder="Author name"
            className="bg-[#F6F6F6] w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Note *
          </label>
          <textarea
            value={note.content}
            onChange={(e) => onChange({ ...note, content: e.target.value })}
            placeholder="Write your note here..."
            rows={10}
            className={`${isMobile ? 'h-37' : ''} bg-[#F6F6F6] w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => onSubmit(false)}
            className="flex-1 bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Add Note
          </button>
          <button
            onClick={() => onSubmit(true)}
            className="flex-1 bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Add Pinned Note
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default NoteForm;
