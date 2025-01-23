/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

/* eslint-disable react/prop-types */
const Button = ({
  label,
  id,
  type,
  isDisabled,
  onClickHandler,
  btnPrimary = false,
  btnDanger = false,
  btnSecondary = false,
  btnSpecial = false,
}) => {
  const [currentStyle, setCurrentStyle] = useState("");

  const getButtonStyle = () => {
    if (btnPrimary) return "text-white bg-blue-500 hover:bg-blue-600";
    if (btnSecondary) return "text-gray-600 border border-gray-400 bg-gray-100 hover:border-gray-900 hover:text-gray-900";
    if (btnSpecial) return "text-gray-900 border border-gray-900 bg-gray-100 hover:text-gray-100 hover:bg-gray-900";
    if (btnDanger) return "text-gray-900 border border-gray-900 bg-gray-100 hover:text-gray-100 hover:bg-red-900";
    return "text-white bg-blue-500 hover:bg-blue-600"; // Default style
  };

  useEffect(() => {
    setCurrentStyle(getButtonStyle());
  }, [btnPrimary, btnDanger, btnSecondary, btnSpecial]);

  return (
    <button
      id={id}
      onClick={onClickHandler ? onClickHandler : null}
      disabled={isDisabled}
      type={type}
      className={`text-sm px-4 py-2 text-sm rounded-md ${currentStyle}`}
    >
      {label}
    </button>
  );
};

export default Button;
