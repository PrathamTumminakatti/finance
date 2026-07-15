function TransactionFilters({

    searchTerm,
    setSearchTerm,

    selectedCategory,
    setSelectedCategory,

    selectedDate,
    setSelectedDate,

    sortBy,
    setSortBy

}) {

    return (

        <div className="transaction-filters">

            <input

                type="text"

                placeholder="Search by description or category..."

                value={searchTerm}

                onChange={(e) =>
                    setSearchTerm(e.target.value)
                }

            />

            <select

                value={selectedCategory}

                onChange={(e) =>
                    setSelectedCategory(e.target.value)
                }

            >

                <option value="All">
                    All Categories
                </option>

                <option value="food">
                    Food
                </option>

                <option value="shopping">
                    Shopping
                </option>

                <option value="travel">
                    Travel
                </option>

                <option value="healthcare">
                    Healthcare
                </option>

                <option value="others">
                    Others
                </option>

            </select>

            <input

                type="date"

                value={selectedDate}

                onChange={(e) =>
                    setSelectedDate(e.target.value)
                }

            />

            <select

                value={sortBy}

                onChange={(e) =>
                    setSortBy(e.target.value)
                }

            >

                <option value="date-desc">
                    Newest First
                </option>

                <option value="date-asc">
                    Oldest First
                </option>

                <option value="amount-desc">
                    Amount (High → Low)
                </option>

                <option value="amount-asc">
                    Amount (Low → High)
                </option>

                <option value="category">
                    Category (A → Z)
                </option>

            </select>

        </div>

    );

}

export default TransactionFilters;