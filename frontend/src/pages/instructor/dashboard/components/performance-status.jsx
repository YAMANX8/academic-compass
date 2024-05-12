const PerformanceStatus = ({ number, title, color }) => {
  return (
    <div
      className={`flex w-[168px] flex-col gap-1 rounded-xl p-4 shadow-md`}
      style={{ backgroundColor: color }}
    >
      <span className="text-3xl font-medium">{number}</span>
      <span className="text-xl font-medium">{title}</span>
    </div>
  );
};

export default PerformanceStatus;
