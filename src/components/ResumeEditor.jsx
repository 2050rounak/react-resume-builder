export default function ResumeEditor({ resumeData, setResumeData }) {
  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const handleMarginChange = (section, margin, value) => {
    setResumeData({
      ...resumeData,
      margins: {
        ...resumeData.margins,
        [section]: {
          ...(resumeData.margins?.[section] || {}),
          [margin]: value
        }
      }
    });
  };

  const handlePositionChange = (field, axis, value) => {
    setResumeData({
      ...resumeData,
      positions: {
        ...resumeData.positions,
        [field]: {
          ...(resumeData.positions?.[field] || {}),
          [axis]: value
        }
      }
    });
  };

  const PositionControls = ({ field }) => (
    <div className="grid grid-cols-2 gap-2 mt-2 p-2 bg-gray-50 rounded">
      <div>
        <label className="text-sm text-gray-600">X Position (px)</label>
        <input
          type="number"
          value={resumeData.positions?.[field]?.x || 0}
          onChange={(e) => handlePositionChange(field, 'x', e.target.value)}
          className="w-full p-1 border rounded"
        />
      </div>
      <div>
        <label className="text-sm text-gray-600">Y Position (px)</label>
        <input
          type="number"
          value={resumeData.positions?.[field]?.y || 0}
          onChange={(e) => handlePositionChange(field, 'y', e.target.value)}
          className="w-full p-1 border rounded"
        />
      </div>
    </div>
  );

  const MarginControls = ({ section }) => (
    <div className="grid grid-cols-2 gap-2 mt-2">
      <div>
        <label className="text-sm text-gray-600">Top Margin (px)</label>
        <input
          type="number"
          value={resumeData.margins?.[section]?.top || 0}
          onChange={(e) => handleMarginChange(section, 'top', e.target.value)}
          className="w-full p-1 border rounded"
        />
      </div>
      <div>
        <label className="text-sm text-gray-600">Bottom Margin (px)</label>
        <input
          type="number"
          value={resumeData.margins?.[section]?.bottom || 0}
          onChange={(e) => handleMarginChange(section, 'bottom', e.target.value)}
          className="w-full p-1 border rounded"
        />
      </div>
      <div>
        <label className="text-sm text-gray-600">Left Margin (px)</label>
        <input
          type="number"
          value={resumeData.margins?.[section]?.left || 0}
          onChange={(e) => handleMarginChange(section, 'left', e.target.value)}
          className="w-full p-1 border rounded"
        />
      </div>
      <div>
        <label className="text-sm text-gray-600">Right Margin (px)</label>
        <input
          type="number"
          value={resumeData.margins?.[section]?.right || 0}
          onChange={(e) => handleMarginChange(section, 'right', e.target.value)}
          className="w-full p-1 border rounded"
        />
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Resume</h2>
      <form className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Header Section</h3>
          <div className="space-y-2 p-3 border rounded">
            <label className="block text-sm font-medium">Name Position</label>
            <input
              name="name"
              value={resumeData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-2 border rounded"
            />
            <PositionControls field="name" />
            
            <label className="block text-sm font-medium mt-4">Title Position</label>
            <input
              name="title"
              value={resumeData.title}
              onChange={handleChange}
              placeholder="Professional Title"
              className="w-full p-2 border rounded"
            />
            <PositionControls field="title" />
          </div>
          <MarginControls section="header" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <div className="space-y-2 p-3 border rounded">
            <label className="block text-sm font-medium">Email Position</label>
            <input
              name="email"
              value={resumeData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border rounded"
            />
            <PositionControls field="email" />

            <label className="block text-sm font-medium mt-4">Phone Position</label>
            <input
              name="phone"
              value={resumeData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-2 border rounded"
            />
            <PositionControls field="phone" />

            <label className="block text-sm font-medium mt-4">Location Position</label>
            <input
              name="location"
              value={resumeData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full p-2 border rounded"
            />
            <PositionControls field="location" />

            <label className="block text-sm font-medium mt-4">LinkedIn Position</label>
            <input
              name="linkedin"
              value={resumeData.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn URL"
              className="w-full p-2 border rounded"
            />
            <PositionControls field="linkedin" />
          </div>
          <MarginControls section="contact" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Professional Summary</h3>
          <div className="space-y-2 p-3 border rounded">
            <textarea
              name="summary"
              value={resumeData.summary}
              onChange={handleChange}
              placeholder="Professional Summary"
              className="w-full p-2 border rounded"
            />
            <PositionControls field="summary" />
          </div>
          <MarginControls section="summary" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Experience</h3>
          <div className="space-y-2 p-3 border rounded">
            <textarea
              name="experience"
              value={resumeData.experience}
              onChange={handleChange}
              placeholder="Experience"
              className="w-full p-2 border rounded"
            />
            <PositionControls field="experience" />
          </div>
          <MarginControls section="experience" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Education</h3>
          <div className="space-y-2 p-3 border rounded">
            <textarea
              name="education"
              value={resumeData.education}
              onChange={handleChange}
              placeholder="Education"
              className="w-full p-2 border rounded"
            />
            <PositionControls field="education" />
          </div>
          <MarginControls section="education" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Skills</h3>
          <div className="space-y-2 p-3 border rounded">
            <textarea
              name="skills"
              value={resumeData.skills}
              onChange={handleChange}
              placeholder="Skills (comma separated)"
              className="w-full p-2 border rounded"
            />
            <PositionControls field="skills" />
          </div>
          <MarginControls section="skills" />
        </div>
      </form>
    </div>
  );
}
