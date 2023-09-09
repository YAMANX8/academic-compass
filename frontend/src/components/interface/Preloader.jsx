const Preloader = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <span className="animate-ping text-[32px] text-dark dark:text-light">
        Loading...
      </span>
    </div>
  );
};

export default Preloader;
