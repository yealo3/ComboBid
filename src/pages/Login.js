import NavBar1 from "../components/NavBar1";
import LogInFormContainer from "../components/LogInFormContainer";
import styles from "./Login.module.css";
const Login = () => {
  return (
    <div className={styles.login}>
      <NavBar1
        navbarMargin="unset"
        homeTextDecoration="unset"
        marketTextDecoration="unset"
        myAuctionsTextDecoration="unset"
        myBidsTextDecoration="unset"
        profileTextDecoration="unset"
        button={false}
        buttonBackgroundImage={`url("/50727481@3x.png")`}
      />
      <main className={styles.mainContainer}>
        <section className={styles.formContainer}>
          <LogInFormContainer />
        </section>
      </main>
    </div>
  );
};

export default Login;
