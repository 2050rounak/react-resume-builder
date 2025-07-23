import { useState } from "react";
import ResumePreview from "../components/ResumePreview";

export default function Builder() {
  const initialData = {
    name: "Good name",
    title: "Full Stack Developer",
    email: "test@example.com",
    phone: "1234567890",
    location: "Mumbai, India",
    linkedin: "https://linkedin.com/in/rahul",
    summary: "Experienced developer with 5+ years in React and Node.js.",
    experience: "Software Engineer at XYZ Corp (2020 - Present)",
    education: "B.Tech in Computer Science - ABC University",
    skills: "JavaScript, React, Node.js, MongoDB, Git",
    projects: "Portfolio Website, Chat App, E-commerce Platform",
    language: "Hindi",
    certifications: "",

    customBackground: "#ffffff",
    backgroundMode: "solid",
    gradientFrom: "#ff7e5f",
    gradientTo: "#feb47b",
    customFontSize: "16px",
    textColor: "#000000",
    
    // Individual margins for each field
    margins: {}
  };

  const [resumeData, setResumeData] = useState(initialData);
  const [template, setTemplate] = useState("modern");
  const [showForm, setShowForm] = useState(true);
  const [newField, setNewField] = useState("");
  const [sectionOrder, setSectionOrder] = useState([
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
    "language",
    "certifications",
  ]);

  const [history, setHistory] = useState([initialData]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const updateHistory = (newData) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newData);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleChange = (e) => {
    const newData = {
      ...resumeData,
      [e.target.name]: e.target.value,
    };
    setResumeData(newData);
    updateHistory(newData);
  };

  const handleMarginChange = (field, margin, value) => {
    const newData = {
      ...resumeData,
      margins: {
        ...resumeData.margins,
        [field]: {
          ...(resumeData.margins[field] || {}),
          [margin]: parseInt(value) || 0
        }
      }
    };
    setResumeData(newData);
    updateHistory(newData);
  };

  const handleDataUpdateFromPreview = (field, value) => {
    const newData = {
      ...resumeData,
      [field]: value,
    };
    setResumeData(newData);
    updateHistory(newData);
  };

  const handleAddField = () => {
    const fieldKey = newField.toLowerCase().replace(/\s+/g, "_");
    if (!resumeData[fieldKey]) {
      const newData = { ...resumeData, [fieldKey]: "" };
      setResumeData(newData);
      setSectionOrder([...sectionOrder, fieldKey]);
      updateHistory(newData);
    }
    setNewField("");
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevData = history[historyIndex - 1];
      setResumeData(prevData);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextData = history[historyIndex + 1];
      setResumeData(nextData);
      setHistoryIndex(historyIndex + 1);
    }
  };

  const MarginControls = ({ field }) => {
    const margins = resumeData.margins[field] || {};
    return (
      <div className="grid grid-cols-2 gap-2 mt-2 p-2 bg-gray-50 rounded">
        <div>
          <label className="block text-sm text-gray-600">Top Margin (px)</label>
          <input
            type="number"
            value={margins.top || 0}
            onChange={(e) => handleMarginChange(field, 'top', e.target.value)}
            className="w-full p-1 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Bottom Margin (px)</label>
          <input
            type="number"
            value={margins.bottom || 0}
            onChange={(e) => handleMarginChange(field, 'bottom', e.target.value)}
            className="w-full p-1 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Left Margin (px)</label>
          <input
            type="number"
            value={margins.left || 0}
            onChange={(e) => handleMarginChange(field, 'left', e.target.value)}
            className="w-full p-1 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Right Margin (px)</label>
          <input
            type="number"
            value={margins.right || 0}
            onChange={(e) => handleMarginChange(field, 'right', e.target.value)}
            className="w-full p-1 border rounded"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {showForm && (
          <div className="bg-white p-6 rounded shadow w-full md:w-[40%] relative overflow-auto max-h-[90vh]">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-red-500 font-bold text-xl"
              title="Close Form"
            >
              ❌
            </button>

            <h2 className="text-2xl font-bold mb-4">Customize</h2>

            {/* Undo / Redo */}
            <div className="mb-4 flex gap-4">
              <button
                onClick={handleUndo}
                disabled={historyIndex === 0}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                🔙 Undo
              </button>
              <button
                onClick={handleRedo}
                disabled={historyIndex === history.length - 1}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                🔜 Redo
              </button>
            </div>

            {/* Template select */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Select Template</label>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="classic">Classic</option>
                <option value="modern">Modern</option>
                <option value="minimal">Minimal</option>
                <option value="elegant">Elegant</option>
              </select>
            </div>

            {/* Background Mode */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Background Mode</label>
              <select
                name="backgroundMode"
                value={resumeData.backgroundMode}
                onChange={handleChange}
                className="w-full border rounded p-2"
              >
                <option value="solid">Solid Color</option>
                <option value="gradient">Gradient</option>
              </select>
            </div>

            {/* Background Inputs */}
            {resumeData.backgroundMode === "solid" ? (
              <div className="mb-4">
                <label className="block font-semibold mb-1">Background Color</label>
                <input
                  type="color"
                  name="customBackground"
                  value={resumeData.customBackground}
                  onChange={handleChange}
                  className="w-full h-10 p-0 border-none cursor-pointer"
                />
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Gradient From</label>
                  <input
                    type="color"
                    name="gradientFrom"
                    value={resumeData.gradientFrom}
                    onChange={handleChange}
                    className="w-full h-10 p-0 border-none cursor-pointer"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Gradient To</label>
                  <input
                    type="color"
                    name="gradientTo"
                    value={resumeData.gradientTo}
                    onChange={handleChange}
                    className="w-full h-10 p-0 border-none cursor-pointer"
                  />
                </div>
              </>
            )}

            {/* Font Size */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Font Size</label>
              <input
                type="number"
                min={10}
                max={48}
                name="customFontSize"
                value={parseInt(resumeData.customFontSize)}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "customFontSize",
                      value: e.target.value + "px",
                    },
                  })
                }
                className="w-full border rounded p-2"
              />
            </div>

            {/* Text Color */}
            <div className="mb-4">
              <label className="block font-semibold mb-1">Text Color</label>
              <input
                type="color"
                name="textColor"
                value={resumeData.textColor}
                onChange={handleChange}
                className="w-full h-10 p-0 border-none cursor-pointer"
              />
            </div>

            <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>

            {/* Header Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Header</h3>
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Name</label>
                  <input
                    name="name"
                    value={resumeData.name}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                  />
                  <MarginControls field="name" />
                </div>

                <div>
                  <label className="block font-medium mb-1">Title</label>
                  <input
                    name="title"
                    value={resumeData.title}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                  />
                  <MarginControls field="title" />
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Email</label>
                  <input
                    name="email"
                    value={resumeData.email}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                  />
                  <MarginControls field="email" />
                </div>

                <div>
                  <label className="block font-medium mb-1">Phone</label>
                  <input
                    name="phone"
                    value={resumeData.phone}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                  />
                  <MarginControls field="phone" />
                </div>

                <div>
                  <label className="block font-medium mb-1">Location</label>
                  <input
                    name="location"
                    value={resumeData.location}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                  />
                  <MarginControls field="location" />
                </div>

                <div>
                  <label className="block font-medium mb-1">LinkedIn</label>
                  <input
                    name="linkedin"
                    value={resumeData.linkedin}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                  />
                  <MarginControls field="linkedin" />
                </div>
              </div>
            </div>

            {/* Content Sections */}
            {sectionOrder.map((field) => (
              <div key={field} className="mb-6">
                <label className="block font-semibold capitalize mb-1">
                  {field.replace(/_/g, " ")}
                </label>
                <textarea
                  name={field}
                  value={resumeData[field]}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                  rows={["summary", "experience", "projects"].includes(field) ? 4 : 2}
                />
                <MarginControls field={field} />
              </div>
            ))}

            {/* Add New Field */}
            <div className="mb-4 flex gap-2">
              <input
                value={newField}
                onChange={(e) => setNewField(e.target.value)}
                placeholder="New Field Name"
                className="flex-1 border rounded p-2"
              />
              <button
                onClick={handleAddField}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Field
              </button>
            </div>
          </div>
        )}

        <div className="w-full">
          <button
            onClick={() => setShowForm(true)}
            className={`mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
              showForm ? "hidden" : ""
            }`}
          >
            Show Editor
          </button>
          <ResumePreview
            resumeData={resumeData}
            template={template}
            onUpdate={handleDataUpdateFromPreview}
            sectionOrder={sectionOrder}
            setSectionOrder={setSectionOrder}
          />
        </div>
      </div>
    </div>
  );
}
