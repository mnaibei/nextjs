"use client";
import { useState, useEffect } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import Head from "next/head";
import { Session } from "next-auth";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Get the initial state from localStorage
    const savedMode = localStorage.getItem("darkMode");
    setDarkMode(savedMode ? JSON.parse(savedMode) : false);
  }, []);

  useEffect(() => {
    // Save the state to localStorage whenever it changes
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode: boolean) => !prevDarkMode);
  };

  return (
    <>
      <Head>
        <title>Prompt Finder</title>
        <meta name="description" content="Find writing prompts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <html lang="en" className={darkMode ? "dark" : ""}>
        <body className={darkMode ? "dark" : ""}>
          {/* @ts-ignore */}
          <Provider>
            <div>
              {!darkMode && (
                <div className="main">
                  <div className="gradient" />
                </div>
              )}
              <main className="app relative">
                <Nav />
                <button
                  aria-label="Toggle dark mode"
                  className="fixed bottom-0 right-0 mb-4 mr-4 z-10 text-gray-800 dark:text-gray-200 sm:mb-8 sm:mr-8"
                  onClick={toggleDarkMode}>
                  {darkMode ? (
                    <BsSun
                      size={30}
                      color="white"
                      className="border-2 rounded-full p-1"
                    /> // Change color to white when darkMode is true
                  ) : (
                    <BsMoon
                      size={30}
                      color="black"
                      className="border-2 border-[#06304d] rounded-full p-1"
                    /> // Change color to black when darkMode is false
                  )}
                </button>
                {children}
              </main>
            </div>
          </Provider>
        </body>
      </html>
    </>
  );
}
