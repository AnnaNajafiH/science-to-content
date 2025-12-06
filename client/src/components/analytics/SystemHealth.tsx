const SystemHealth: React.FC = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">System Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-3xl mb-2">✅</div>
            <div className="font-semibold text-green-700">Trend Detection</div>
            <div className="text-sm text-gray-600 mt-1">Operational</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-3xl mb-2">✅</div>
            <div className="font-semibold text-green-700">LLM Generator</div>
            <div className="text-sm text-gray-600 mt-1">Operational</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-3xl mb-2">✅</div>
            <div className="font-semibold text-green-700">Trust Checker</div>
            <div className="text-sm text-gray-600 mt-1">Operational</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-3xl mb-2">⚠️</div>
            <div className="font-semibold text-yellow-700">Social APIs</div>
            <div className="text-sm text-gray-600 mt-1">Rate Limited</div>
          </div>
        </div>
      </div>
    );
};
export default SystemHealth;