export default function Order() {
  return (
    <div className="bg-gray-500 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white p-12 rounded-xl shadow-xl max-w-lg w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          📦 Your Orders
        </h1>
        <h2 className="text-red-700 mb-6 leading-relaxed text-xl font-bold">
          Only authenticated users can view this page !
        </h2>
        <div className="space-y-4 text-left">
          <div className="p-4 border border-gray-300 rounded-md hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800">
              Order #12345
            </h2>
            <p className="text-gray-600">
              Status:{" "}
              <span className="font-medium text-green-600">Delivered</span>
            </p>
            <p className="text-gray-600">Placed on: April 20, 2025</p>
          </div>
        </div>
        <p className="mt-8 text-sm text-gray-500 italic">
          * This is a demo page. Real order data will appear here once
          integrated.
        </p>
      </div>
    </div>
  );
}
