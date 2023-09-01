function dashboardWrapper({ children, heading, optionalText = "" }) {
  return (
    <div
      className={`p-4 shadow-[0_0_15px_0] shadow-black/50  bg-secondary dark:bg-secondary-dark text-dark dark:text-light transition-colors duration-1000 ease-in-out-back rounded-[10px] flex flex-col h-full flex-1 justify-between gap-8`}
    >
      <div className="flex gap-[66px] font-semibold text-[32px] leading-l tracking-tight">
        <h2> {heading}</h2>
        <p className="font-medium">{optionalText}</p>
      </div>
      {children}
    </div>
  );
}

export default dashboardWrapper;
