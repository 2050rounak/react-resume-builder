export default function TemplateSelector({ selected, setSelected }) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-semibold">Choose Template:</label>
      <select
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
  className="p-2 border rounded w-full"
>
  <option value="classic">Classic</option>
  <option value="modern">Modern</option>
  <option value="minimal">Minimal</option>
  <option value="elegant">Elegant (Pro)</option> {/* NEW */}
</select>

    </div>
  );
}
