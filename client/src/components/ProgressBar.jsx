export default function ProgressBar({ total, completed }) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div style={{ margin: "1rem 0" }}>
      <div style={{ marginBottom: "0.4rem" }}>
        Postęp dzisiaj: {completed} / {total} ({percent}%)
      </div>
      <div
        style={{
          backgroundColor: "#eee",
          borderRadius: "10px",
          height: "20px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffa500",
            width: `${percent}%`,
            height: "100%",
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}
