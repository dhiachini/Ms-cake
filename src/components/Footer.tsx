import MsIcon from "../assets/icons/MsIconBlack";

function Footer() {
  return (
    <footer className="bg-[#fbf2eb] text-black">
      <div className="mx-auto w-full max-w-7xl p-4 py-6 lg:py-6">
        <div className="w-full max-w-screen-xl mx-auto ">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
              <MsIcon className="h-20 w-full cursor-pointer" />
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Patisseries
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Cake-personnalisé
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Traiteur
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline  me-4 md:me-6">
                  Ateliers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  E-book
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto" />
        <div className="sm:flex sm:items-center justify-between sm:justify-between">
          <span className="text-sm text-black sm:text-center">
            © 2025{" "}
            <a href="#" className="hover:text-[#b06c74]">
              MS Cake
            </a>
            . All Rights Reserved.
          </span>
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=100063649895167"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-facebook-icon lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook page</span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/ms.cake.nm/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram-icon lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram page</span>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@mscaksss584?_t=ZN-90WHMfapFLy&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.73 0h3.12a5.56 5.56 0 0 0 1.68 4A5.5 5.5 0 0 0 21.92 5v3.1a8.55 8.55 0 0 1-5.52-1.92v8.9a6.15 6.15 0 1 1-6.15-6.15 6.26 6.26 0 0 1 1.48.18v3.25a2.9 2.9 0 1 0 2.12 2.79V0Z" />
                </svg>
                <span className="sr-only">TikTok page</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
