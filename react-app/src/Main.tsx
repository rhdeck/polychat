import {
  FC,
  useMemo,
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  Link,
  useNavigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Editor from "./Editor";
import Home from "./Home";
import Messages from "./Messages";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Settings from "./Settings";
import Logo from "./logo.png";
import { useAccount, useChainId } from "@raydeck/usemetamask";
import { addresses } from "./usePolyChat";
const chainNames: Record<number, string> = {
  1: "mainnet",
  3: "ropsten",
  4: "rinkeby",
  5: "goerli",
  42: "kovan",
  31337: "hardhat",
  137: "Polygon Mainnet",
  80001: "Polygon Mumbai",
};
const blockExplorers: Record<number, string> = {
  1: "mainnet",
  3: "ropsten",
  4: "rinkeby",
  5: "goerli",
  42: "kovan",
  31337: "hardhat",
  137: "https://polygonscan.com/address/",
  80001: "https://mumbai.polygonscan.com/address/",
};
const userNavigation = [
  { name: "Your Profile", to: "#" },
  { name: "Settings", to: "#" },
  { name: "Sign out", to: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const mainContext = createContext({
  title: "Dashboard",
  setTitle: (title: string) => {},
});
const { Provider: MainProvider } = mainContext;
export const useMain = () => useContext(mainContext);

function Main() {
  const { pathname } = useLocation();
  const navigation = useMemo(() => {
    return [
      { name: "Messages", to: "/", current: pathname === "/" },
      {
        name: "Compose",
        to: "/compose",
        current: pathname.startsWith("/compose"),
      },
      { name: "Settings", to: "/settings", current: pathname === "/settings" },
    ];
  }, [pathname]);
  const navigate = useNavigate();
  const [title, setTitle] = useState("Dashboard");
  const value = useMemo(() => ({ title, setTitle }), [title]);
  const chainId = useChainId();
  const address = useAccount();
  if (!addresses[parseInt(chainId, 16).toString(10)]) {
    return null;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-pink-300 border-b border-gray-200">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                      <img
                        className="block lg:hidden h-8 w-auto"
                        src={Logo}
                        alt="PolyChat"
                      />
                      <img
                        className="hidden lg:block h-8 w-auto"
                        src={Logo}
                        alt="PolyChat"
                      />
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.to}
                          className={classNames(
                            item.current
                              ? "border-purple-800 text-gray-900"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                            "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:items-center">
                    <button
                      type="button"
                      className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      onClick={() => navigate(item.to)}
                      className={classNames(
                        item.current
                          ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                          : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
                        "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="mt-3 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        onClick={() => navigate(item.to)}
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="py-10">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                {title}
              </h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              {/* Replace with your content */}
              <div className="px-4 py-8 sm:px-0">
                <MainProvider value={value}>
                  <SubMain />
                </MainProvider>
              </div>
              {/* /End replace */}
            </div>
          </main>
        </div>
      </div>
      <div className="p-2 flex flex-row justify-end fixed bottom-0 w-full align-right bg-pink-800 border-t-2 border-purple-500">
        <div className="text-white text-xs">
          Operating on{" "}
          <a
            className="text-purple-300 hover:text-purple-500 transition"
            href={
              blockExplorers[parseInt(chainId, 16)] +
              addresses[parseInt(chainId, 16)]
            }
          >
            {chainNames[parseInt(chainId, 16)] ||
              "chain " + parseInt(chainId, 16).toString(10)}
          </a>{" "}
          with account {address.substring(0, 6)}...
          {address.substring(address.length - 4)}
        </div>
      </div>
    </>
  );
}
const SubMain: FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/tests" element={<Home />} />
        <Route path="/" element={<Messages />} />
        {/* <Route path="/message/:cid" element={<Message />} /> */}
        <Route path="/compose/:to" element={<Editor />} />
        <Route path="/compose" element={<Editor />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
};
export default Main;
// export default function WrappedMain() {
//   return (
//     <WrapMain>
//       <Main />
//     </WrapMain>
//   );
// }
