export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "sans-serif",
      flexDirection: "column"
    }}>
      <h1>🏠 RoomAI</h1>
      <p>Interior design powered by AI</p>
      <p style={{ opacity: 0.6 }}>Deployment successful 🚀</p>
    </main>
  );
}

