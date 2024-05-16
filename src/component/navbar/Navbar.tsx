// "use client"
// import { useState } from 'react';
// import styles from './Navbar.module.css'
// import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
// import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
// import { usePathname } from 'next/navigation'
// import { useRouter } from 'next/navigation';
// import { MenuItems } from "@/constants/MenuItems";
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
// import { useAppSelector } from '@/redux/hooks';
// import { useUser } from '@/hooks/useUser';
// export default function navbar() {
//     const router = useRouter();
//     const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
//     const pathname = usePathname();
//     const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
//     let userInLocalStorage;
//     if (typeof window !== 'undefined') {
//         userInLocalStorage = JSON.parse(localStorage.getItem("user") as string);
//            // log out 
//          var {handleLogOutUser}=useUser({})
   
//     }
//         const isUserLogin = useAppSelector((state) => state?.user?.user?.token) || userInLocalStorage?.token;

//         // this will stop scroll on menu open
//         if (isUserMenuOpen && typeof window !== 'undefined') window.onscroll = function () { window.scrollTo(0, 0); }
//         // this will resume scroll on menu open
//         if (!isUserMenuOpen && typeof window !== 'undefined') window.onscroll = null;

//         return (
//             !pathname.includes("/gallery")&&
//             <>
//                 <div className={styles.navbar} style={(pathname === "/" || pathname === "/contact" || pathname === "/user") ? { backgroundColor: "transparent" } : { backgroundColor: "white" }}>

//                     {/* karwaan logo shown in all route except home page */}
//                     {(pathname === "/") ?
//                         <div className={`${styles.contact} ${styles.uppercase} ${styles.hover}`} onClick={()=>router.push('/contact')} style={pathname === "/" ? { color: "white" } : (pathname === "/contact" || pathname === "/user"|| pathname==="/gallery/*") ? { visibility: "hidden", pointerEvents: "none" } : { color: "black" }}>Contact us</div>
//                         :
//                         <div className={`${styles.logoDiv} ${styles.hover}`}>
//                             <a onClick={() => router.push("/")} style={pathname === "/" ? { color: "white" } : { filter: " invert(100%) sepia(100%) saturate(0%) hue-rotate(71deg) brightness(104%) contrast(104%)" }} >
//                                 <img src="https://karwaan.b-cdn.net/Front/KARWAANLOGOWHITE%20(Custom).png" className={styles.logoImage} alt="not found" />
//                             </a>
//                         </div>}
//                     {/* if menu is close than this  */}   
//                     {!isMenuOpen && <div className={styles.rightNav}>
//                         <div className={`${styles.logoDiv}${styles.hover}`}
//                             onClick=
//                             {() => {
//                                 setIsMenuOpen(!isMenuOpen);
//                                 //  changeHomeTheme(true);
//                             }}>
//                             <a onClick={() => router.push("/")} style={pathname === "/" ? { color: "white" } : { display: "none" }} >
//                                 <img src="https://karwaan.b-cdn.net/Front/KARWAANLOGOWHITE%20(Custom).png" className={styles.logoImage} alt="not found" />
//                             </a>
//                         </div>
//                         {/* if we are on shop route then hide menu and show user or signin/signup */}
//                         {!(pathname.includes("/products")) ?
//                             //  {/* { !(pathname==="/shop/*" )? */}
//                             <div className={`${styles.closeMenu} ${styles.uppercase}`}
//                                 onClick=
//                                 {() => {
//                                     setIsMenuOpen(!isMenuOpen);
//                                     // changeHomeTheme(true);
//                                 }}>
//                                 <div className={`${styles.menu} ${styles.uppercase} ${styles.hover}`} style={pathname === "/" ? { color: "white" } : { color: "black" }}>menu </div>
//                                 <MenuRoundedIcon className={`${styles.menuIcon} ${styles.hover}`} style={pathname === "/" ? { color: "white" } : { color: "black" }} />
//                             </div>
//                             :
//                             //   if user is not loged in then it show signin/signup else show user  
//                             (!isUserLogin) ?
//                                 <ul className={styles.shopNav}>
//                                     <li onClick={() => router.push("/signup")}>Sign Up</li>
//                                     <li onClick={() => router.push("/signin")}>Sign In</li>
//                                 </ul> :
//                                 <div className={styles.user} onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} style={{ color: "black" }} >user
//                                     <AccountCircleOutlinedIcon className={styles.userLogo} style={{ color: "black !important" }} />
//                                 </div>
//                         }
//                     </div>}
//                     {/* if menu is open */}
//                     {isMenuOpen && <div className={styles.rightNav}>

//                         <div className={`${styles.openMenu} ${styles.uppercase}`}
//                             onClick=
//                             {() => {
//                                 setIsMenuOpen(!isMenuOpen);
//                                 //  changeHomeTheme(false);
//                             }}>

//                             <ul className={`${styles.menuOptions} ${styles.capitalize}`}>
//                                 {MenuItems.map((menuItem,index) => {
//                                      if(index%2===0){
//                                     return  <li  key={index} style={pathname === menuItem.route ? { color: "white", pointerEvents: "none" } : { color: "gray" }}  className={styles.menuItem} onClick={() => {(menuItem.route)&&router.push(menuItem.route) }}>{menuItem.text}</li>
//                                     }else{
//                                         return <li key={index} className={`${styles.forwardSlash}`}  >/</li>
//                                     }
//                                 })}

//                             </ul>
//                             <CloseOutlinedIcon className={`${styles.crossIcon} ${styles.hover}`} style={pathname === "/" ? { color: "white" } : { color: "black" }} />
//                         </div>

//                     </div>}
//                 </div >
//                 <div style={isUserMenuOpen ? {
//                     transform: "translate(0,0)",
//                     transition: "all ease-in 0.3s",

//                     // display:"flex"
//                 } : {
//                     width: "0px",
//                     // transform: "translate(100%,0)",
//                     transition: "all ease-in 0.3s",
//                     height: "100svh"
//                     // display:"none"

//                 }} className={styles.userSetting}>
//                     <div style={isUserMenuOpen ? {
//                         transition: "all ease-in 0.3s",
//                         display: "flex"
//                     } : {
//                         transition: "all ease-in 0.3s",
//                         display: "none"

//                     }} className={styles.userSettingCross} ><CloseOutlinedIcon className={styles.userSettingClose} onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} /> <span> User Setting</span></div>
//                     <ul style={isUserMenuOpen ? {
//                         transition: "all ease-in 0.3s",
//                         display: "flex"
//                     } : {
//                         transition: "all ease-in 0.3s",
//                         display: "none"

//                     }} className={styles.userSettingOptions}>
//                         <li className={styles.userSettingUpdateInfo} onClick={() => { router.push("/products/my-account"); setIsUserMenuOpen(!isUserMenuOpen) }}>Account</li>
//                         <li className={styles.userSettingUpdateInfo} onClick={() => { router.push("/products/cart"); setIsUserMenuOpen(!isUserMenuOpen) }}>Cart</li>
//                         <li className={styles.userSettingUpdateInfo} onClick={() => { router.push("/products"); setIsUserMenuOpen(!isUserMenuOpen) }}>Shop</li>
//                         {/* <li className={styles.userSettingUpdateInfo} onClick={() => { router.push("/products/my-orders"); setIsUserMenuOpen(!isUserMenuOpen) }}>My orders</li> */}
//                         <li className={styles.userSettingLogOut} onClick={(e)=>{handleLogOutUser(e);setIsUserMenuOpen(!isUserMenuOpen)} }>Log Out</li>
//                     </ul>
//                 </div>
        
//             </>
//         )
//     }

"use client";

import { useState } from 'react';
import styles from './Navbar.module.css';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { usePathname, useRouter } from 'next/navigation';
import { MenuItems } from "@/constants/MenuItems";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useAppSelector } from '@/redux/hooks';
import { useUser } from '@/hooks/useUser';
import Link from 'next/link';

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  let userInLocalStorage;

  if (typeof window !== 'undefined') {
    userInLocalStorage = JSON.parse(localStorage.getItem("user") as string);
    var { handleLogOutUser } = useUser({});
  }

  const isUserLogin = useAppSelector((state) => state?.user?.user?.token) || userInLocalStorage?.token;

  // this will stop scroll on menu open
  if (isUserMenuOpen && typeof window !== 'undefined') window.onscroll = function () { window.scrollTo(0, 0); }
  // this will resume scroll on menu open
  if (!isUserMenuOpen && typeof window !== 'undefined') window.onscroll = null;

  return (
    <>
      {!pathname.includes("/gallery") && (
        <div className={styles.navbar} style={(pathname === "/" || pathname === "/contact" || pathname === "/user") ? { backgroundColor: "transparent" } : { backgroundColor: "white" }}>
          {/* Karwaan logo shown in all routes except home page */}
          {pathname === "/" ? (
            <div className={`${styles.contact} ${styles.uppercase} ${styles.hover}`} onClick={() => router.push('/contact')} style={pathname === "/" ? { color: "white" } : (pathname === "/contact" || pathname === "/user" || pathname === "/gallery/*") ? { visibility: "hidden", pointerEvents: "none" } : { color: "black" }}>
              Contact us
            </div>
          ) : (
            <div className={`${styles.logoDiv} ${styles.hover}`}>
              <a onClick={() => router.push("/")} style={pathname === "/" ? { color: "white" } : { filter: " invert(100%) sepia(100%) saturate(0%) hue-rotate(71deg) brightness(104%) contrast(104%)" }}>
                <img src="https://karwaan.b-cdn.net/Front/KARWAANLOGOWHITE%20(Custom).png" className={styles.logoImage} alt="not found" />
              </a>
            </div>
          )}

          {/* Menu toggle button */}
          {!isMenuOpen && (
            <div className={styles.rightNav}>
              <div className={`${styles.logoDiv}${styles.hover}`} onClick={() => { setIsMenuOpen(!isMenuOpen); }}>
                <a onClick={() => router.push("/")} style={pathname === "/" ? { color: "white" } : { display: "none" }}>
                  <img src="https://karwaan.b-cdn.net/Front/KARWAANLOGOWHITE%20(Custom).png" className={styles.logoImage} alt="not found" />
                </a>
              </div>
              {!pathname.includes("/products") ? (
                <div className={`${styles.closeMenu} ${styles.uppercase}`} onClick={() => { setIsMenuOpen(!isMenuOpen); }}>
                  <div className={`${styles.menu} ${styles.uppercase} ${styles.hover}`} style={pathname === "/" ? { color: "white" } : { color: "black" }}>menu</div>
                  <MenuRoundedIcon className={`${styles.menuIcon} ${styles.hover}`} style={pathname === "/" ? { color: "white" } : { color: "black" }} />
                </div>
              ) : (
                !isUserLogin ?
                  <ul className={styles.shopNav}>
                    <li onClick={() => router.push("/signup")}>Sign Up</li>
                    <li onClick={() => router.push("/signin")}>Sign In</li>
                  </ul> :
                  <div className={styles.user} onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} style={{ color: "black" }}>
                    user
                    <AccountCircleOutlinedIcon className={styles.userLogo} style={{ color: "black !important" }} />
                  </div>
              )}
            </div>
          )}

          {/* Menu when open */}
          {isMenuOpen && (
            <div className={styles.rightNav}>
              <div className={`${styles.openMenu} ${styles.uppercase}`} onClick={() => { setIsMenuOpen(!isMenuOpen); }}>
                <ul className={`${styles.menuOptions} ${styles.capitalize}`}>
                  {MenuItems.map((menuItem, index) => {
                    if (index % 2 === 0) {
                      if(menuItem.text=="Shop"){
                        return(
                          <li key={index}>
                            <Link  style={pathname === menuItem.route ? { color: "white", pointerEvents: "none" } : { color: "gray" }} className={styles.menuItem} href={"/shop"} rel="noopener noreferrer" target="_blank">
                              Shop
                            </Link>
                          </li>
                        )
                      }
                      return (
                        <li key={index} style={pathname === menuItem.route ? { color: "white", pointerEvents: "none" } : { color: "gray" }} className={styles.menuItem} onClick={() => { (menuItem.route) && router.push(menuItem.route); }}>
                          {menuItem.text}
                        </li>
                      );
                    } else {
                      return <li key={index} className={`${styles.forwardSlash}`} >/</li>;
                    }
                  })}
                </ul>
                <CloseOutlinedIcon className={`${styles.crossIcon} ${styles.hover}`} style={pathname === "/" ? { color: "white" } : { color: "black" }} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* User Settings Menu */}
      <div style={isUserMenuOpen ? {
        transform: "translate(0,0)",
        transition: "all ease-in 0.3s",
        display: "flex"
      } : {
        width: "0px",
        transition: "all ease-in 0.3s",
        height: "100svh",
        display: "none"
      }} className={styles.userSetting}>
        <div style={isUserMenuOpen ? {
          transition: "all ease-in 0.3s",
          display: "flex"
        } : {
          transition: "all ease-in 0.3s",
          display: "none"
        }} className={styles.userSettingCross}>
          <CloseOutlinedIcon className={styles.userSettingClose} onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} />
          <span>User Setting</span>
        </div>
        <ul style={isUserMenuOpen ? {
          transition: "all ease-in 0.3s",
          display: "flex"
        } : {
          transition: "all ease-in 0.3s",
          display: "none"
        }} className={styles.userSettingOptions}>
          <li className={styles.userSettingUpdateInfo} onClick={() => { router.push("/products/my-account"); setIsUserMenuOpen(!isUserMenuOpen); }}>Account</li>
          <li className={styles.userSettingUpdateInfo} onClick={() => { router.push("/products/cart"); setIsUserMenuOpen(!isUserMenuOpen); }}>Cart</li>
          <li className={styles.userSettingUpdateInfo} onClick={() => { router.push("/products"); setIsUserMenuOpen(!isUserMenuOpen); }}>Shop</li>
          <li className={styles.userSettingLogOut} onClick={(e) => {
             handleLogOutUser(e); 
            setIsUserMenuOpen(!isUserMenuOpen); }}>Log Out</li>
        </ul>
      </div>
    </>
  );
}
