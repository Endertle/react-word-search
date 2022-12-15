function Synonym({ synonyms, click }) {
  const style = {
    p: {
      display: "inline-block",
      fontWeight: "500",
      color: "rgba(0, 0, 0, 0.4)",
    },

    item: {
      display: "inline-block",
      padding: "0 0.3em",
      border: "1px solid rgba(0, 0, 0, 0.2)",
      borderRadius: "5px",
      margin: "0.1em 0.2em",
      cursor: "pointer",
    },
  };

  return (
    <div className="synonym">
      <p style={style.p}>synonyms: </p>
      {synonyms.map((synonym, index) => (
        <p style={style.item} key={index} onClick={(e) => click(synonym)}>
          {" "}
          {synonym}
        </p>
      ))}
    </div>
  );
}

export default Synonym;
