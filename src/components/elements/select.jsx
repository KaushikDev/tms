/* eslint-disable react/prop-types */
const Select = ({
  htmlFor,
  label,
  id,
  error,
  name,
  optionsArr,
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
    <select
      name={name}
      id={id}
      className={`w-full p-3 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
      value={value}
      onChange={onChangeHandler}
    >
      {optionsArr.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
