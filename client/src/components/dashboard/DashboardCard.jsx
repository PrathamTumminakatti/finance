import "./styles/DashboardCard.css";

function DashboardCard({
    title,
    value,
    subtitle,
    color
}) {

    return (

        <div
            className="dashboard-card"
            style={{
                borderTop: `5px solid ${color}`
            }}
        >

            <h3>{title}</h3>

            <h2>{value}</h2>
            {

    subtitle && (

        <p className="card-subtitle">

            {subtitle}

        </p>

    )

}


        </div>

    );

}

export default DashboardCard;