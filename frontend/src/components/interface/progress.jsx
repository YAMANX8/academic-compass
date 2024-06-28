const Progress = ({ percentage, className }) => {
  return (
    <div className="h-2 w-full rounded-full bg-primary-lighter">
      <div
        className={`h-full rounded-full bg-primary ${className}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default Progress;
