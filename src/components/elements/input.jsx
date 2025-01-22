/* eslint-disable react/prop-types */
const Input = ({
  htmlFor,
  label,
  id,
  error,
  type,
  name,
  placeholder,
  value,
  onChangeHandler,
}) => (
  <div>
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      id={id}
      className={`w-full p-3 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChangeHandler}
    />
  </div>
);

export default Input;
