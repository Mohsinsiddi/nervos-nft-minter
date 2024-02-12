"use client";
import { useAppContext } from "@/context";
import Image from "next/image";
HTMLElement;
interface MainProps {}
export const Main: React.FC<MainProps> = () => {
  const { address, setAddress } = useAppContext();

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("called", e);

    const address = document.getElementById("address")?.value;
    const email = document.getElementById("email")?.value;
    console.log("Email", email);
    console.log("Addresss", address);
  };

  return (
    <div className="mt-36 h-96">
      <main>
        <div className="flex flex-col">
          <div className="flex justify-center items-center mb-3 font-extrabold text-3xl">
            Anmol NFT Minter
          </div>
          <div className="flex justify-center items-center mb-4">
            <Image
              src="/image/nft.png"
              alt=""
              height={360}
              width={360}
              className="rounded-lg shadow-lg shadow-black"
            />
          </div>

          <div>
            <form className="max-w-sm mx-auto" onSubmit={onSubmit}>
              <div className="flex m-2 font-semibold text-lg">
                JoyId Address :{" "}
                {`${address.slice(0, 10)}...${address.slice(-10)}`}
              </div>
              <div className="mb-5">
                <div className="flex justify-between">
                  {" "}
                  <div>
                    {" "}
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-semibold text-gray-900 "
                    >
                      Recipient Nervos CKB Address:
                    </label>
                  </div>
                  <div className="block mb-2 text-sm text-white cursor-pointer border-[1px] border-gray-200 px-2 rounded-md bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    Insert JoyID Address
                  </div>
                </div>
                <input
                  type="address"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Nervos Recipient Address"
                  required
                ></input>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                  required
                ></input>
              </div>

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                >
                  MINT NFT
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
