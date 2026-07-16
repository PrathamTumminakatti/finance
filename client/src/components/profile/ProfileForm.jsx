function ProfileForm({ profile }) {

    return (

        <div className="profile-card">

            <h2>Profile</h2>

            <p>Name: {profile.name}</p>

            <p>Email: {profile.email}</p>

            <p>Monthly Income: {profile.monthly_income}</p>

            <p>Currency: {profile.currency}</p>

        </div>

    );

}

export default ProfileForm;