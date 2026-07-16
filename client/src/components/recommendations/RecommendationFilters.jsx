function RecommendationFilters({

    priority,

    setPriority

}) {

    return (

        <div className="recommendation-filters">

            <label>

                Priority

            </label>

            <select

                value={priority}

                onChange={(e) =>

                    setPriority(e.target.value)

                }

            >

                <option>All</option>

                <option>High</option>

                <option>Medium</option>

                <option>Low</option>

            </select>

        </div>

    );

}

export default RecommendationFilters;