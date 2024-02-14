"use client";
import { useAppContext } from "@/context";
import { connect } from "@joyid/ckb";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LOGO_URL } from "./constant";
interface HeaderProps {}
export const Header: React.FC<HeaderProps> = () => {
  const [joyidInfo, setJoyidInfo] = useState<any>(null);
  const [canConnect, setCanConnect] = useState(false);
  const { address, setAddress } = useAppContext();
  useEffect(() => {
    const onConnect = async () => {
      try {
        const authData = await connect();
        setJoyidInfo(authData);
        setCanConnect(false);
        setAddress(authData.address);
        // console.log(`JoyID user info:`, authData);
      } catch (error) {
        console.error(error);
      }
    };
    if (canConnect) {
      onConnect();
    }
  }, [canConnect, setAddress]);
  return (
    <div>
      <header className="bg-black h-12">
        <div className="flex justify-between">
          <div className="flex justify-center items-center mt-2">
            <Image src={LOGO_URL} alt="" height={64} width={128} />
          </div>
          <div>
            {!joyidInfo && (
              <div className="mt-2 border-[2px] border-sky-700 px-2 py-[1px] font-extrabold text-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg">
                <button
                  onClick={() => setCanConnect(true)}
                  className="font-extrabold text-lg"
                >
                  Connect Wallet
                </button>
              </div>
            )}
            {joyidInfo && (
              <div className="border-[2px] border-gray-500 mt-2  rounded-lg">
                <div className=" text-gray-200 text-lg px-2 py-[1px] font-extrabold ">
                  {`${address.slice(0, 10)}...${address.slice(-10)}`}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};
