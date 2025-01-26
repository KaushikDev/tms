/* eslint-disable react/prop-types */
const Loading = ({label}) => (
  <div className="flex items-center gap-2">
    <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
    <span>{label}</span>
  </div>
);

export default Loading;
