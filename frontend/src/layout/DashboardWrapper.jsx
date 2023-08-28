function DashboardWrapper({ children, heading, optionalText = "" }) {
  return (
    <div className="p-4 shadow-[0_0_15px_0] shadow-dark/50  bg-secondary w-[793px] rounded-[10px] flex flex-col gap-8">
      <div className="flex gap-[50px]">
        <h2 className="font-semibold text-[32px] tracking-tight">{heading}</h2>
        <p className="font-medium text-[32px] leading-[125%] tracking-tight">
          {optionalText}
        </p>
      </div>
      {children}
    </div>
  );
}

export default DashboardWrapper;
