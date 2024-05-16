// 'use client'
import Navbar from '../../component/navbar/Navbar';
import NoRightClick from '@/component/NoRightClick';
// import { usePathname } from 'next/navigation';
export default  async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
 await new Promise ((resolve)=>setTimeout(resolve,4000));
  
  // const pathname = usePathname();
  return (
    <>
    <Navbar />
    {/* {!pathname.includes("/gallery")&&<Navbar />} */}
      <NoRightClick/>
      {children}
      </>
  )
}
