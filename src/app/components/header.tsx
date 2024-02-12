"use client";
import { connect } from "@joyid/ckb";
interface HeaderProps {}
export const Header: React.FC<HeaderProps> = async () => {
  const onConnect = async () => {
    try {
      const authData = await connect();
      console.log(`JoyID user info:`, authData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <header>
        <div>
          <div>Wallet Connect</div>
          <div>
            <h1>Hello JoyID!</h1>
            <button onClick={onConnect}>Connect JoyID</button>
          </div>
        </div>
      </header>
    </div>
  );
};
