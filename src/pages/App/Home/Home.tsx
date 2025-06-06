import React from 'react';

import BottomNavLayout from "../../../components/BottomNavLayout";

const Home = () => {
  return (
    <BottomNavLayout>
      <div style={{ padding: 32, textAlign: "center" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#444" }}>Home Page</h1>
        <p style={{ marginTop: 16, color: "#666" }}>This is a dummy home page.</p>
      </div>
    </BottomNavLayout>
  );
};

export default Home;