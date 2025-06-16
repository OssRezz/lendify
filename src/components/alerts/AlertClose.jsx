import { useState, useEffect } from "react";

const isValidContent = (content) => {
  return (
    (Array.isArray(content) && content.length > 0) ||
    (typeof content === "string" && content.trim() !== "")
  );
};

const renderContent = (content) => {
  if (Array.isArray(content)) {
    return (
      <ul className="list-disc list-inside space-y-1">
        {content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }
  return <p>{content}</p>;
};

const AlertClose = ({
  icon: Icon,
  title,
  content,
  colorClass = "bg-red-100 text-red-700",
  onClose,
}) => {
  const [show, setShow] = useState(true);
  const contentExists = isValidContent(content);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300); // tiempo de animación simulada
  };

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div
      className={`transition-opacity duration-300 ease-in-out mb-4 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`w-full rounded-md shadow-md p-4 flex ${colorClass} relative`}
      >
        {Icon && <div className="mr-3 mt-1">{<Icon />}</div>}
        <div className="flex-1">
          <h4
            className={`font-semibold text-base ${contentExists ? "mb-1" : ""}`}
          >
            {title}
          </h4>
          {contentExists && (
            <div className="text-sm">{renderContent(content)}</div>
          )}
        </div>
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <span className="text-xl">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default AlertClose;
