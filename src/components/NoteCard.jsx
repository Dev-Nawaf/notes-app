import { truncateText } from '../utils';

const NoteCard = ({
  note,
  isSelected = false,
  onClick,
  onDelete,
  isMobile = false,
}) => (
  <div
    onClick={() => onClick(note)}
    className={`${
      isMobile
        ? 'bg-white py-4 mb-2 rounded-lg cursor-pointer active:bg-orange-100 touch-manipulation transition-shadow '
        : `p-3 mb-2 rounded-lg cursor-pointer transition-colors ${
            isSelected
              ? 'bg-orange-50 border-l-4 border-orange-500'
              : 'hover:bg-gray-50'
          }`
    }`}
  >
    <div className="flex items-center justify-between mb-2">
      <h4
        className={`font-medium text-gray-900 ${isMobile ? 'truncate flex-1 mr-2' : ''}`}
      >
        {isMobile ? note.title : truncateText(note.title, 20)}
      </h4>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(note.id);
        }}
        className={`text-red-500 hover:text-red-700 text-sm cursor-pointer ${isMobile ? 'px-2' : ''}`}
      >
        Delete
      </button>
    </div>
    <p
      className={`text-sm text-gray-600 mb-2 ${isMobile ? 'line-clamp-2' : ''}`}
    >
      {truncateText(note.content, isMobile ? 80 : 30)}
    </p>
    <p className="text-xs text-gray-400">{note.createdAt}</p>
  </div>
);

export default NoteCard;
