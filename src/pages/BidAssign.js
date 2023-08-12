import NavBar1 from "../components/NavBar1";
import FormContainer from "../components/FormContainer";
import styles from "./BidAssign.module.css";
const BidAssign = () => {
  return (
    <div className={styles.bidAssign}>
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
          <FormContainer />
        </section>
      </main>
    </div>
  );
};

export default BidAssign;
