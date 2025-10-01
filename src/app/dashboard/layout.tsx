import Link from "next/link";
import logo from '../../../public/assets/Logo.png'
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="w-full bg-blue-300">
        <div>
         <Link href='/'> <Image src={logo} alt="Home-Logo" width={150} height={50}></Image></Link>
        </div>
      </div>
      <div className="grid grid-cols-12 h-screen">
        <div className="col-span-3 bg-gray-400">menu</div>
        <div className="col-span-9">{children}</div>
      </div>
    </div>
  );
}
