export const ProfileImage = ({ name }: { name: string }) => {
  return (
    <div className="profile-img">
      <div className="profile-wrapper">
        <span className="profile-container">
          {name
            ?.split(" ")
            .map((fullName: string) => fullName.charAt(0).toUpperCase())
            .join("")}
        </span>
      </div>
    </div>
  );
};
