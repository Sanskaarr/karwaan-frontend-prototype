import React from 'react'
import styles from './About.module.css'
import { useRouter } from 'next/navigation'
// import styles from "./About.module.css"
function about(){
  const router=useRouter();
  return (
    <div className={styles.about}>
        <h1>About Us</h1>
      <div className={styles.founders}>
       <img className={styles.founder1} src="https://karwaan.b-cdn.net/about/Oshaank.png" alt="notFound" /> 
       <img className={styles.founder2} src="https://karwaan.b-cdn.net/about/Harshit.png" alt="notFound" /> 
      </div>
      <p className={styles.ourStory}>
      Our story traces back to our childhood when happiness meant quests to find hidden treasures in our vicinity.
      </p>
      <button className={styles.read}onClick={()=>router.push("/about")}>Read More</button>
    </div>
  )
}

export default about
