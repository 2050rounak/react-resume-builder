import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ResumePreview({
  resumeData,
  template,
  onUpdate,
  sectionOrder,
  setSectionOrder,
}) {
  const {
    name,
    title,
    email,
    phone,
    location,
    linkedin,
    customBackground,
    gradientFrom,
    gradientTo,
    backgroundMode,
    customFontSize,
    textColor,
    margins = {},
    positions = {},
  } = resumeData;

  const templateStyles = {
    classic: "text-[#1f2937]",
    modern: "text-[#111827] border-l-8 border-[#f97316] pl-4",
    minimal: "text-[#111827] border-l-4 border-[#3b82f6] pl-4",
    elegant: "p-6 shadow-lg font-serif text-white",
    creative: "text-[#111827] border-dashed border-l-4 border-[#60a5fa] pl-4",
    sleek: "text-[#111827] border-t-4 border-[#6366f1]",
  };

  const getMarginStyle = (field) => {
    const fieldMargins = margins[field] || {};
    return {
      marginTop: fieldMargins.top ? `${fieldMargins.top}px` : undefined,
      marginBottom: fieldMargins.bottom ? `${fieldMargins.bottom}px` : undefined,
      marginLeft: fieldMargins.left ? `${fieldMargins.left}px` : undefined,
      marginRight: fieldMargins.right ? `${fieldMargins.right}px` : undefined,
    };
  };

  const getPositionStyle = (field) => {
    const pos = positions[field] || {};
    return {
      transform: `translate(${pos.x || 0}px, ${pos.y || 0}px)`,
      position: pos.x || pos.y ? 'relative' : undefined,
    };
  };

  const editableSection = (label, field, value) =>
    value !== undefined && value !== null ? (
      <section className="mb-4 relative group">
        <h2 className="text-xl font-semibold mb-1">{label}</h2>
        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => onUpdate(field, e.target.innerText)}
          className="whitespace-pre-line outline-none"
          style={{ ...getMarginStyle(field), cursor: "text" }}
        >
          {value}
        </div>
        <button
          onClick={() => onUpdate(field, null)}
          className="absolute top-0 right-0 text-red-500 text-sm hidden group-hover:block"
          title={`Delete ${label}`}
        >
          ❌
        </button>
      </section>
    ) : null;

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newOrder = [...sectionOrder];
    const [moved] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, moved);
    setSectionOrder(newOrder);
  };

  const replaceOklchColors = (element) => {
    const walk = (node) => {
      if (node.nodeType === 1) {
        const style = window.getComputedStyle(node);
        const colorProps = [
          "backgroundColor",
          "background",
          "color",
          "borderColor",
          "borderTopColor",
          "borderRightColor",
          "borderBottomColor",
          "borderLeftColor",
        ];
        colorProps.forEach((prop) => {
          const val = style.getPropertyValue(prop);
          if (val && val.includes("oklch")) {
            node.style[prop] = "#007ACC";
          }
        });
        node.childNodes.forEach(walk);
      }
    };
    walk(element);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById("resume-preview");
    if (!element) return alert("Resume preview not found");

    replaceOklchColors(element);

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div>
      <button
        onClick={handleDownloadPDF}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download PDF
      </button>

      <div
        id="resume-preview"
        className={`max-w-[794px] mx-auto p-4 md:p-10 rounded transition-all duration-300 ${templateStyles[template]}`}
        style={{
          minHeight: "1122px",
          background:
            backgroundMode === "gradient"
              ? `linear-gradient(to right, ${gradientFrom}, ${gradientTo})`
              : customBackground || "white",
          fontSize: customFontSize || "16px",
          color: textColor || (template === "elegant" ? "white" : "black"),
        }}
      >
        <div className="text-center mb-6">
          <h1
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate("name", e.target.innerText)}
            className="text-3xl font-bold outline-none"
            style={{ ...getMarginStyle('name'), cursor: "text" }}
          >
            {name || "Your Name"}
          </h1>
          <p
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onUpdate("title", e.target.innerText)}
            className="text-lg font-medium outline-none"
            style={{ ...getMarginStyle('title'), cursor: "text" }}
          >
            {title || "Your Title"}
          </p>
          <div>
            <p className="outline-none">
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onUpdate("email", e.target.innerText)}
                style={getMarginStyle('email')}
              >
                {email}
              </span>{" "}
              |{" "}
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onUpdate("phone", e.target.innerText)}
                style={getMarginStyle('phone')}
              >
                {phone}
              </span>{" "}
              |{" "}
              <span
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onUpdate("location", e.target.innerText)}
                style={getMarginStyle('location')}
              >
                {location}
              </span>
            </p>
            <p
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => onUpdate("linkedin", e.target.innerText)}
              className="text-blue-600"
              style={{ ...getMarginStyle('linkedin'), cursor: "text" }}
            >
              {linkedin}
            </p>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="resume-sections">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {sectionOrder.map((field, index) => (
                  <Draggable key={field} draggableId={field} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          transition: "all 0.2s ease",
                          touchAction: "manipulation",
                        }}
                      >
                        {editableSection(
                          field.charAt(0).toUpperCase() + field.slice(1),
                          field,
                          resumeData[field] ?? ""
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
