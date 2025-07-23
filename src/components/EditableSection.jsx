export default function EditableSection({ section, onChange, onDelete }) {
  return (
    <div className="border p-4 mb-4 bg-white shadow rounded relative">
      <button
        onClick={() => onDelete(section.id)}
        className="absolute top-2 right-2 text-red-500"
      >
        ❌
      </button>

      <h2 className="text-xl font-semibold capitalize mb-2">{section.type}</h2>
      <textarea
        value={section.content}
        onChange={(e) => onChange(section.id, e.target.value)}
        className="w-full border p-2 rounded resize-none"
        rows={5}
      />
    </div>
  );
}
