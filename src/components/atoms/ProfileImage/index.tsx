export const ProfileImage = ({ name, src }: { name: string; src?: string }) => {
  return (
    <div className="profile-img">
      <div className="profile-wrapper">
        <span className="profile-container">
          {src
            ? ""
            : name
                ?.split(" ")
                .map((fullName: string) => fullName.charAt(0).toUpperCase())
                .join("")}
        </span>
      </div>
    </div>
  );
};
