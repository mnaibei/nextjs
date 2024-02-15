"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
export default function Nav() {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  //   useEffect(() => {
  //     const setProviders = async () => {
  //       const providers = await getProviders();
  //     //   setProviders();
  //     };
  //     // setProviders();
  //   }, []);

  // useEffect(() => {
  //   const fetchProviders = async () => {
  //     const providers = await getProviders();
  //     setProviders(providers); // Call setProviders with the fetched data
  //   };
  //   fetchProviders(); // Call the function to fetch providers
  // }, []);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res as any);
    })();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <h1 className="logo_text">Prompt finder</h1>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="flex-center black_btn">
              <button className="btn btn-primary">Create</button>
            </Link>

            <button
              type="button"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                signOut()
              }
              className="outline_btn">
              Sign out
            </button>
            <Link href="/profile" className="flex-center">
              <Image
                src="/assets/images/logo.svg"
                alt="profile"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  key={provider.name}
                  type="button"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                    signIn(provider.id)
                  }
                  className="outline_btn">
                  Sign in with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              alt="profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className=" bg-white rounded-md dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}>
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}>
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn">
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  key={provider.name}
                  type="button"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                    signIn(provider.id)
                  }
                  className="outline_btn">
                  Sign in with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}
