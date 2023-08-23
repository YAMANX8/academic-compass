function dashboardWrapper({ children, heading }) {
  return (
    <div className="p-4">
      <h2>{heading}</h2>
      {children}
    </div>
  );
}

export default dashboardWrapper;
