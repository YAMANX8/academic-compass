const LoadingScreen = ({ className, ...other }) => {
  return (
    <div
      className={`px-5 w-full flex-grow min-h-full flex items-center justify-center ${className}`}
      {...other}
    >
      <div className="w-full max-w-360">
        <div className="h-4 bg-gray-200 rounded-full">
          <div className="h-full bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
