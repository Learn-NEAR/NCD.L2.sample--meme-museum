import React from 'react';

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-pink text-white section-shadow">
      <img
        src={require('../../assets/img/image187.png').default}
        alt=""
        className="hidden md:block absolute -top-14 right-0"
      />
      <img
        src={require('../../assets/img/image228.png').default}
        alt=""
        className="hidden md:block absolute bottom-0 left-0"
      />
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          <div>
            <a
              href="https://github.com/Learn-NEAR/NCD.L1.sample--meme-museum"
              target="_blank"
              className="flex"
              rel="noreferrer"
            >
              <img
                src={require('../../assets/img/near_logo_stack_1.png').default}
                alt=""
                className="border-r-2 border-white"
              />
              <div className="ml-2">
                <p className=" text-2xl font-bold tracking-tight">Memes</p>
                <p className="-mt-2 font-josefin text-white text-2xl">museum</p>
              </div>
            </a>
            <a href="mailto:alxndr.sai@gmail.com" className="mt-6 inline-block text-lg hover:text-blue-400">
              alxndr.sai@gmail.com
            </a>
          </div>
          <div>
            <h5 className="text-2xl font-bold mt-2">About</h5>
            <ul className="mt-4 space-y-2 text-gray-200">
              <li>
                <a
                  href="https://github.com/Learn-NEAR/NCD.L1.sample--meme-museum"
                  target="_blank"
                  className="hover:text-white"
                  rel="noreferrer"
                >
                  About contract
                </a>
              </li>
              <li>
                <a href="https://near.org/" target="_blank" className="hover:text-white" rel="noreferrer">
                  About NEAR
                </a>
              </li>
              <li>
                <a
                  href="https://docs.near.org/docs/api/javascript-library"
                  target="_blank"
                  className="hover:text-white"
                  rel="noreferrer"
                >
                  NEAR-API-JS docs
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-2xl font-bold mt-2">Community</h5>
            <ul className="mt-4 space-y-2 text-gray-200">
              <li>
                <a href="https://discord.gg/k4pxafjMWA" target="_blank" className="hover:text-white" rel="noreferrer">
                  Discord
                </a>
              </li>
              <li>
                <a href="https://twitter.com/nearedu" target="_blank" className="hover:text-white" rel="noreferrer">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-2xl font-bold mt-2">Education</h5>
            <ul className="mt-4 space-y-2 text-gray-200">
              <li>
                <a href="https://www.near.university/" target="_blank" className="hover:text-white" rel="noreferrer">
                  NEAR university
                </a>
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center">
            <a
              href="#header"
              className="bg-white hover:bg-gray-200 text-blue-500 hover:text-blue-400 mt-12 py-3 rounded-md lg:mt-0 text-2xl font-bold border-md w-full text-center transform active:scale-95 duration-200"
            >
              Jump to up
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
