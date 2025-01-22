/* eslint-disable react/prop-types */
const Button = ({ label, id, type, isDisabled, onClickHandler }) => (
  <button
    id={id}
    onClick={onClickHandler ? onClickHandler : null}
    disabled={isDisabled}
    type={type}
    className="uppercase px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
  >
    {label}
  </button>
);

export default Button;
