import { NavLink } from "react-router-dom";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import type { ErrorResponse } from "react-router-dom";

import styles from "./Error.module.scss";

export default function Error(){
    const error=useRouteError() as ErrorResponse;

    return(
        <div className={styles.error_page}>
            <h1>Error!</h1>
            {error.status?<span className={styles.error_code}>{error.status}</span>:null}

            <p>
                {isRouteErrorResponse(error) ? "Sorry, the page you're looking for doesn't exist" : "Something went wrong"}
            </p>

            <NavLink to="/" className={styles.homeBtn}>Back to home</NavLink>
        </div>
    )
}