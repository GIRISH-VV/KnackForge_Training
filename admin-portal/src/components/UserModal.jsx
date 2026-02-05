const UserModal = ({ user, close }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>User Details</h3>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default UserModal;
