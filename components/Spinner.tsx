const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-sky-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
    </div>
  );
};

export default Spinner;
