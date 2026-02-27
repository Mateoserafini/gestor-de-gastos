function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-xl shadow-2xl text-center">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-4 tracking-tight">
          ¡Tailwind CSS v4 funciona!
        </h1>
        <p className="text-gray-600 text-lg mb-6 max-w-sm mx-auto">
          Si puedes ver estos colores y este diseño centrado, la configuración fue un éxito rotundo.
        </p>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200">
          Comenzar proyecto
        </button>
      </div>
    </div>
  )
}

export default App
