import Footer from "@/component/footer/Footer"
import styles from './style.module.css'
export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className={styles.bodyContainer}>
      {children}
      <Footer/>
    </div>
  )
}
