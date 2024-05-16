import style from "./page.module.css";
export default function loader() {
    return (

        <div id={style.loading}>
            <video className={style.layer1BgVideo} autoPlay muted loop>
                <source src="https://karwaan.b-cdn.net/Front/loading1.webm" type="video/webm" />
                <source src="https://karwaan.b-cdn.net/Main/Loader.mp4" type="video/mp4" />
                Your browser does not support HTML5 video.
            </video>
            <div className={style.loaderContent}>KARWAAN FILMS</div>
        </div>


    )
}