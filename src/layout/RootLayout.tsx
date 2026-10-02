import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

import styles from "./layout.module.scss";

export default function RootLayout(){
    return(
        <div className={styles.layout}>
            <Header/>
            <main className={styles.main}>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
}