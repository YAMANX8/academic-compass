const SectionWrapper = ({ children }) => {
  return (
    <div className="flex justify-center py-12 overflow-x-hidden bg-light dark:bg-dark text-dark dark:text-light transition-colors ease-in-out-back duration-1000">
      {children}
    </div>
  );
};

export default SectionWrapper;
