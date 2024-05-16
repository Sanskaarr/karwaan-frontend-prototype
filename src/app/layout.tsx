import { Providers } from '@/redux/provider';
import './globals.css'
import {Poppins} from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const poppins=Poppins({ 
  subsets:["devanagari","latin","latin-ext"],
  // weight:["200"]
  weight:["100","200","300","400","500","600","700","800","900"]
});
export const metadata = {
  title: 'KARWAAN',
  description: 'Karwaan is the brainchild of our Cofounders; Oshank Soni and Harshit Patel who morphed their dream into a reality in 2018. They travelled across the length and breadth of our country curating experiences and stories in form of picturesque Photos and dreamy Videos.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body className={poppins.className} suppressContentEditableWarning={true} suppressHydrationWarning={true} >
        <Providers>
          {children}
        </Providers>
        <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />
      </body>
    </html>
  )
}
