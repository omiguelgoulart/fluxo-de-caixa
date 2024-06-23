import { Link } from "react-router-dom";
import { useState } from "react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Header para telas pequenas e médias */}
      <header className="bg-gray-800 text-white p-4 flex items-center justify-between lg:hidden">
        <h1 className="text-lg font-bold">Menu</h1>
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none focus:bg-gray-700 rounded p-2"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
      </header>

      {/* Sidebar para tela grande */}
      <nav
        className={`fixed right-0 top-0 h-[100vh] bg-gray-800 text-white flex flex-col items-center p-4 transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0 lg:w-[4.7rem] lg:hover:w-40`}
      >
        <Link exact to="/fluxo-de-caixa/">
          <button
            className="my-4 flex flex-col items-center p-2 rounded lg:hover:bg-gray-700 lg:transition-width lg:w-40"
            onClick={closeSidebar}
          >
            <svg
              className="h-8 w-8 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5l-8 4.5v9L12 19l8-4.5v-9L12 5zm0 0v9M4 9.5l8 4.5 8-4.5M12 14.5v-9"
              />
            </svg>
            <span className="text-xs md:text-sm hidden md:block">Dash</span>
          </button>
        </Link>
        <Link to="/receita">
          <button
            className="my-4 flex flex-col items-center p-2 rounded lg:hover:bg-gray-700 lg:transition-width lg:w-40"
            onClick={closeSidebar}
          >
            <svg
              className="h-8 w-8 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zM19 20H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v13a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-xs md:text-sm hidden md:block">Entrada</span>
          </button>
        </Link>
        <Link to="/saida">
          <button
            className="my-4 flex flex-col items-center p-2 rounded lg:hover:bg-gray-700 lg:transition-width lg:w-40"
            onClick={closeSidebar}
          >
            <svg
              className="h-8 w-8 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 9v10H6V9m6 0V5m0 4h4m-4 0H8"
              />
            </svg>
            <span className="text-xs md:text-sm hidden md:block">Saída</span>
          </button>
        </Link>
        <Link to="/dre">
          <button
            className="my-4 flex flex-col items-center p-2 rounded lg:hover:bg-gray-700 lg:transition-width lg:w-40"
            onClick={closeSidebar}
          >
            <svg
              className="h-8 w-8 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 17v-2a4 4 0 10-4-4h3a1 1 0 011 1v4a2 2 0 001 1.732V21m4-4v2a4 4 0 004-4h-3a1 1 0 01-1-1v-4a2 2 0 01-1-1.732V3m0 2v2m0-2v2m0-2h.01M7 11h.01M13 15h.01M17 11h.01"
              />
            </svg>
            <span className="text-xs md:text-sm hidden md:block">DRE</span>
          </button>
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
