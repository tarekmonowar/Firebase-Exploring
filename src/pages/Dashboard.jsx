export default function Order() {
  return (
    <div className="bg-gray-500 min-h-[80vh] flex items-center justify-center px-4">
      <div className="bg-white p-12 rounded-xl shadow-xl max-w-lg w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
          📊 Your Dashboard
        </h1>
        <h2 className="text-red-700 mb-6 leading-relaxed text-xl font-bold">
          Only authenticated users can view this page !
        </h2>
        <div className="space-y-4 text-left">
          <div className="border border-gray-300 rounded-md p-4 hover:shadow-sm transition-shadow">
            <h2 className="font-semibold text-lg text-gray-800">Profile</h2>
            <p className="text-gray-600">John Doe</p>
            <p className="text-gray-600">john.doe@example.com</p>
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
