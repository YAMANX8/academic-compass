const Progress = ({ percentage }) => {
  return (
    <div className="h-2 w-full rounded-full bg-primary-lighter">
      <div
        className="h-full rounded-full bg-primary"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default Progress;
