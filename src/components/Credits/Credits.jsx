import { config } from "../../config";
import { motion } from "framer-motion";
import MusicNav from "../Music/MusicNav";

const Credits = () => {
  return (
    <div className="credits">
      <MusicNav />
      <h1>Credits for Assets:</h1>
      {config.credits.map((credit, index) => (
        <div className="credit" key={index}>
          <motion.a
            whileHover={{
              cursor: "pointer",
              color: "#ff704c",
            }}
            href={credit.itemURL}
            target="_blank"
            rel="noreferrer noopener"
          >
            <h3>{credit.item}</h3>
          </motion.a>
          <span>by</span>
          <motion.a
            whileHover={{
              cursor: "pointer",
              color: "#ff704c",
            }}
            href={credit.authorURL}
            target="_blank"
            rel="noreferrer noopener"
          >
            <h3>{credit.authorName}</h3>
          </motion.a>
        </div>
      ))}
    </div>
  );
};
export default Credits;
