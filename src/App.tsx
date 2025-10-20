import { Routes, Route } from "react-router-dom"
import { RouterProvider } from "./app/RouterProvider"
import { Header } from "./layout/Header/Header"
import { Footer } from "./layout/Footer/Footer"

function App() {
  const routes = RouterProvider()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow pt-16 pb-20 max-w-7xl mx-auto w-full">
        <div className="px-4 py-6">
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
