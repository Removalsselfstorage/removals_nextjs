import AdminLayout from "@/layouts/AdminLayout";
import React from "react";

const Dashboard = () => {
  return (
    <AdminLayout>
      {/* <Head>
      <title>Mover Profile - Dashboard</title>
      <meta name="description" content="Rss removal and storage website" />
      <link rel="icon" href="/rrs_favicon.svg" />
    </Head> */}

      <div className="py-[50px] bg-white/90 px-[30px]">
        <div className="mb-[30px]">
          <p className="font-bold text-[25px] mb-[20px]">Dashboard</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
