const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div
      role="alert"
      className="min-h-screen flex flex-col justify-center items-center from-gray-50 to-gray-100 p-4"
    >
      <div className="bg-white border-2 rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl  font-bold mb-4 font-mono italic">
          Oops! Something went wrong.
        </h1>
        <p className="text-gray-700 mb-6 break-words">{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="w-full py-1.5 bg-theme hover:bg-violet-600 text-white rounded-md transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
