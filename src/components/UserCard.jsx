const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="h-50"> 
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center mt-10 mb-2">
          <button className="btn btn-primary mx-5">Ignore</button>
          <button className="btn btn-secondary mx-5">Interested</button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
