const Main = ({ children }) => {
  return (
    <main className="max-h-[calc(100vh-5rem)] flex-grow overflow-auto px-20 py-10">
      {children}
    </main>
  );
};

export default Main;
