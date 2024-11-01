const LoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white border-t-transparent"></div>
      </div>
    );
  };
  
  export default LoadingSpinner;