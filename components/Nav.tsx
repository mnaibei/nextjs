"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export default function Nav() {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res as any);
    })();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3 dark:text-white">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <h1 className="logo_text dark:text-white">
          Prompt Hub: Share & Discover
        </h1>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5 relative">
            {" "}
            <div
              onClick={() => setToggleDropdown((prev) => !prev)}
              className="flex-center cursor-pointer">
              {" "}
              <Image
                src={session?.user.image || "/assets/images/logo.svg"}
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </div>
            {toggleDropdown && ( // Dropdown menu
              <div className="absolute right-0 mt-2 bg-white rounded-md dropdown dark:bg-[#06304d] dark:border-2 dark:border-white">
                <Link
                  href="/profile"
                  className="dropdown_link dark:text-white"
                  onClick={() => setToggleDropdown(false)}>
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link dark:text-white"
                  onClick={() => setToggleDropdown(false)}>
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="mt-5 w-full rounded-full border border-red-600 bg-transparent py-1.5 px-5 text-black transition-all hover:bg-red-500 hover:text-white text-center text-sm font-inter flex items-center justify-center dark:text-white">
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <div key={provider.id} className=" flex items-center gap-2">
                  <p>Sign in with: </p>
                  <button
                    key={provider.name}
                    type="button"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                      signIn(provider.id)
                    }
                    aria-label={`Sign in with ${provider.name}`}
                    className="rounded-full ">
                    <div className="border-2 rounded-full p-2">
                      {provider.id === "google" ? <FaGoogle /> : provider.name}
                    </div>
                  </button>
                </div>
              ))}
          </>
        )}
      </div>
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image || "/assets/images/profile.svg"}
              alt="profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className=" bg-white rounded-md dropdown dark:bg-[#06304d] dark:border-2 dark:border-white">
                <Link
                  href="/profile"
                  className="dropdown_link dark:text-white"
                  onClick={() => setToggleDropdown(false)}>
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link dark:text-white"
                  onClick={() => setToggleDropdown(false)}>
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="mt-5 w-full rounded-full border border-red-600 bg-transparent py-1.5 px-5 text-black transition-all hover:bg-red-500 hover:text-white text-center text-sm font-inter flex items-center justify-center dark:text-white">
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <div key={provider.id} className=" flex items-center gap-2">
                  <p>Sign in with: </p>
                  <button
                    key={provider.name}
                    type="button"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                      signIn(provider.id)
                    }
                    aria-label={`Sign in with ${provider.name}`}
                    className="rounded-full ">
                    <div className="border-2 rounded-full p-2">
                      {provider.id === "google" ? <FaGoogle /> : provider.name}
                    </div>
                  </button>
                </div>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}
