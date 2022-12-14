export const AccountCard = ({ firstName, lastName, username }) => {
  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img
              className="rounded-circle mt-5"
              width="150px"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            ></img>
          </div>
        </div>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile Settings</h4>
            </div>

            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">First name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  defaultValue={firstName}
                ></input>
              </div>
              <div className="col-md-12">
                <label className="labels">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  defaultValue={lastName}
                ></input>
              </div>
              <div className="col-md-12">
                <label className="labels">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  defaultValue={username}
                ></input>
              </div>
              <div className="col-md-12">
                <label className="labels">Password</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Old password"
                ></input>
                <input
                  type="text"
                  className="form-control"
                  placeholder="New password"
                ></input>
              </div>
            </div>
            <div className="mt-5 text-center">
              <button className="btn btn-primary profile-button" type="button">
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
