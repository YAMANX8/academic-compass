const SectionWrapper = ({ children }) => {
  return (
    <div className="flex justify-center py-12 bg-light dark:bg-dark">
      {children}
    </div>
  );
};

export default SectionWrapper;
