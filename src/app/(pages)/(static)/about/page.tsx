'use client'
import Slider from '@/component/slider/Slider'
// import {Slider} from '@/constants/slider/Slider"
import styles from './style.module.css'
import { useRouter } from 'next/navigation'

export default function About() {
const router=useRouter();
    return (
        <div className={styles.about}>
            <div className={styles.aboutKarwaan}>
                <h1 className={styles.aboutKarwaanText}>About Karwaan</h1>
                <img className={styles.founderImage} src="https://karwaan.b-cdn.net/about/aboutusharshit.png" alt="" />
                <p style={{ textAlign: "justify", marginTop: "30px" }}>
                    Karwaan is the brainchild of our Cofounders; Oshank Soni and Harshit Patel who morphed their dream into a reality in 2018. They travelled across the length and breadth of our country curating experiences and stories in form of picturesque Photos and dreamy Videos.
                </p>
                <p style={{ textAlign: "justify", marginTop: "30px" }}>
                    Soon, what started as merely a passion, attracted organisations and individuals who wanted to showcase their products/services/experiences in the same limelight. Over the period of past four years, they have curated the content for their videos with utmost dedication. All the videos that they have brought to the platform, are shot with great effort, better equipment and even better cinematic scope. Their stories not only exhibit our knack for presenting unexplored and unsaid tales but also tap into some of the most pressing social issues.
                </p>
                <p style={{ textAlign: "justify", marginTop: "30px" }}>
                    The team comes with expertise in human-centric documentaries, scripts, cinematography, and photography. Supported by a team of ethically driven individuals, authenticity is the keystone of all our content.
                </p>
            </div>
            <div className={styles.media}>
                <h1 className={styles.mediaText}>In Media</h1>
                <Slider />

            </div>
            <div className={styles.ourWork}>
                <h1 className={styles.ourWorkText}>our work</h1>
                <div className={styles.ourWorkImages}>
                <div className={styles.ourWorkFirstImage}>
                    <img src="https://karwaan.b-cdn.net/about/RightVideosHarshit.jpg" alt="not-found" />
                    <p onClick={()=>router.push("/videos")}>Videos</p>
                </div>
                <div className={styles.ourWorkSecondImage}>
                    <img src="https://karwaan.b-cdn.net/about/LeftPhotosOshank.jpg" alt="not-found" />
                    <p onClick={()=>router.push("/picture")}>Photographs</p>

                </div>
                </div>
            </div>
        </div>
    )
}
