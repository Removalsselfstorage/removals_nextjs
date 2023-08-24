import AdminLayout from "@/layouts/AdminLayout";
import React from "react";

const Notifications = () => {
  return (
    <AdminLayout>
      {/* <Head>
      <title>Mover Profile - Dashboard</title>
      <meta name="description" content="Rss removal and storage website" />
      <link rel="icon" href="/rrs_favicon.svg" />
    </Head> */}

      <div className="py-[50px] bg-white/90 px-[30px]">
        {/* <p>Users</p> */}
        <div className="mb-[30px]">
          <p className="font-bold text-[25px] mb-[20px]">Notifications</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Notifications;
