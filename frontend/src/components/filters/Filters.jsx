import './Filters.css'

function Filters({selectedCategory, setSelectedCategory,sortOption,setSortOption}){
    return(
<div className="filter-group">
    <label htmlFor="categoryFilter">Category:</label>
        <select 
        id="categoryFilter"
        value={selectedCategory}
        onChange={(e)=>setSelectedCategory(e.target.value)}
        >
            <option value="All">All</option>
            <option value="Shoes">Shoes</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
    </select>
    <label htmlFor="sortFilter">Price:</label>
    <select
    id='sortFilter'
    value={sortOption}
    onChange={(e)=>setSortOption(e.target.value)}
    >
        <option value="default">Default</option>
        <option value="low-high">Price: Low to High</option>
        <option value='high-low'>Price: High to Low</option>
    </select>
</div>
    )
}

export default Filters