import { UserProfile } from "@clerk/clerk-react";
import React from "react";
import { PageHeader } from "../components";

const UserProfilePage = () => {
  return (
    <>
      <PageHeader title="User Profile Page" path="Home > User Profile Page" />
      <div className="flex justify-center py-2">
        <UserProfile />
      </div>
    </>
  );
};

export default UserProfilePage;
