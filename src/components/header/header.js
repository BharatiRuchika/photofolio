// import css styles 
import styles from "./header.module.css"
// header component
const Header = () => {
    // JSX rendering
    return (<>
        <div className={styles.header}>
            <div className={styles.navbar}>
                <div className={styles.navbar_logo}>
                    <img src="/assets/logo.png" alt="logo"/>
                    <span>PhotoFolio</span>
                </div>       
            </div>
        </div>
    </>)
}

export default Header