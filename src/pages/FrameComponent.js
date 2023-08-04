import FrameComponent1 from "../components/FrameComponent1";
import styles from "./FrameComponent.module.css";
const FrameComponent = () => {
  return (
    <div className={styles.frameParent}>
      <FrameComponent1 />
      <FrameComponent1
        frame6AlignItems="center"
        frame6JustifyContent="flex-start"
      />
    </div>
  );
};

export default FrameComponent;
