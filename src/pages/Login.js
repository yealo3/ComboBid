import NavBar1 from "../components/NavBar1";
import LogInFormContainer from "../components/LogInFormContainer";
import styles from "./Login.module.css";
const Login = () => {
  return (
    <div className={styles.login}>
      <NavBar1
        homeTarget="_blank"
        marketTarget="_blank"
        myAuctionsTarget="_blank"
        myBidsTarget="_blank"
        profileTarget="_blank"
        button={false}
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
