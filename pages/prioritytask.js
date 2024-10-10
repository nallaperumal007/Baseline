import React from "react";
import styles from "../pages/priority.module.css";
import LoginModal from "../components/login/login";

const HEADER = [
    {
        id: 1,
        title: "Home",
        link: "/home",
    },
    {
        id: 2,
        title: "The Group",
        link: "/Thegroup",
    },
    {
        id: 3,
        title: "Events",
        link: "/event",
    },
    {
        id: 4,
        title: "Media",
        link: "/media",
    },
    {
        id: 5,
        title: "Exhibitor Registration",
        link: "/applicationform",
    },
    {
        id: 6,
        title: "Careers",
        link: "careers",
    },
    {
        id: 7,
        title: "Contact US",
        link: "contactus",
    },
];

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginVisibility: false,
        };
    }

    render() {
        const { loginVisibility } = this.state;
        return (
            <header className={styles.header}>
                <img
                    className={styles.logoImg}
                    src={"/assets/synergy.png"}
                    alt="Finari"
                    onClick={() => (window.location = "/PriorityTask/home")}
                />
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        {HEADER.map(item => (
                            <li key={item.id}>
                                <a href={item.link} className={styles.navItem}>
                                    {item.title}
                                </a>
                            </li>
                        ))}
                        <li>
                            <button
                                className={`${styles.navItem} ${styles.signInButton}`}
                                onClick={() => this.setState({ loginVisibility: true })}
                            >
                                Sign In
                            </button>
                        </li>
                    </ul>
                </nav>
                {loginVisibility && <LoginModal visibility={loginVisibility} setVisibility={(v) => this.setState({ loginVisibility: v })} />}
            </header>
        );
    }
}
