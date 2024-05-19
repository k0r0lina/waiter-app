import styles from "./Footer.module.scss"

const Footer = () => {
    return (
        <div>
            <p className={styles.footer}><small>Copyright © PizzeriaApp 2024</small></p>
        </div>
    );
};

export default Footer;