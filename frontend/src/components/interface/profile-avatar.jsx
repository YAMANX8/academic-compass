const ProfileAvatar = ({
  imagePath,
  firstName = "John",
  lastName = "Doe",
  className,
}) => {
  const handleImageError = (e) => {
    e.target.onerror = null; // Prevents looping
    e.target.style.display = "none"; // Hides the broken image icon
  };
  return (
    <div
      className={`${className} flex aspect-square  w-12 items-center justify-center overflow-hidden rounded-full bg-primary text-2xl text-light`}
    >
      {imagePath ? (
        <img
          src={imagePath}
          alt={`${firstName} ${lastName}'s profile`}
          loading="lazy"
          onError={handleImageError}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-center text-white">{`${firstName.charAt(0)}${lastName.charAt(0)}`}</span>
      )}
    </div>
  );
};

export default ProfileAvatar;
