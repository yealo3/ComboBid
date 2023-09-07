import NavBar1 from "../components/NavBar1";
import RegistrationFormContainer from "../components/RegistrationFormContainer";
import styles from "./Registration.module.css";
const Registration = () => {
  return (
    <div className={styles.registration}>
      <NavBar1 />
      <main className={styles.mainContainer}>
        <section className={styles.formContainer}>
          <RegistrationFormContainer />
        </section>
      </main>
    </div>
  );
};

export default Registration;
