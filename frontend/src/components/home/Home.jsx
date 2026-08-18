import { useEffect, useState } from "react";
import Filters from "../filters/Filters";
import ProductGrid from "../ProductGrid/ProductGrid";
import { useOutletContext } from "react-router-dom";

function Home() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOption, setSortOption] = useState("default");
    const {products,loading,error,searchTerm,setSearchTerm}  = useOutletContext()
    return (
        <>
            <Filters
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortOption={sortOption}
                setSortOption={setSortOption}
            />

            <ProductGrid
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                sortOption={sortOption}
                products={products}
                loading={loading}
                error={error}
            />
        </>
    )
}

export default Home