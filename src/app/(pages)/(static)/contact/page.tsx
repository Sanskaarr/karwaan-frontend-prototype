'use client'
import styles from './style.module.css'
import ContactForm from '@/component/contactForm/ContactForm'
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
function Contact() {

  return (
    <div className={styles.contact}>
    <div className={styles.contactFirstPartition}>
     <h1 className={styles.contactFirstPartitionHeading}>Connect with us</h1>
     <ul className={styles.servicesList}>
      <li>Directing, Cinematography, Photography</li>
      <li>Editing, Color Grading</li>
      <li>Prints, Stocks, Footage</li>
      <li>Creative Ads, Corporates Ads</li>
      <li>Docu Ads, CSR Films, Animations</li>
     </ul>
     <p style={{fontSize:"14px"}}>  Registered office:
    38/12, 4th floor, 
    East Patel Nagar,
    New Delhi - 110008
    India</p>
            <div style={{marginTop: "10px"}}>
                Email us : <a href="mailto:crew@karwaanfilms.com" style={{textDecoration: "unset",color: "white"}}
                    target="_blank">oshank@karwaanfilms.com</a>
            </div>
            <div  style={{marginTop: "10px"}}>
                Contact us : <a href="tel:+919899009001" style={{textDecoration: "unset",color: "white"}}
                    target="_blank">+919899009001</a>
            </div>
            <div className={styles.socialIcons} style={{paddingTop: "25px"}}>
                <a href="https://instagram.com/karwaan.films" target="_blank" > <InstagramIcon/></a>
                <a href="https://wa.me/919899009001" target="_blank" ><WhatsAppIcon/></a>
                <a href="https://www.linkedin.com/company/karwaanfilms/" target="_blank"><LinkedInIcon/></a>
            </div>
    </div>
    <div className={styles.contactSecondPartition}>
      <ContactForm/>
    </div>
    </div>
  )
}
export default  Contact;
