import { useMemo } from "react"

function useProducts(products, searchTerm, selectedCategory, sortOption) {
    const visibleProducts = useMemo(() => {

        const filteredProducts = products.filter((product) => {
            const matchesSearch = (product.title.toLowerCase().includes(searchTerm.toLowerCase()))
            const matchesCategory =
                selectedCategory === "All" ||
                product.category.toLowerCase() === selectedCategory.toLowerCase()
            return matchesSearch && matchesCategory
        })

        const sortedProducts = [...filteredProducts].sort((a, b) => {
            if (sortOption === 'default') {
                return 0
            } else if (sortOption === 'low-high') {
                return a.price - b.price
            }
            return b.price - a.price
        })
        return sortedProducts
    }, [
        products,
        searchTerm,
        selectedCategory,
        sortOption
    ])

    return visibleProducts
}

export default useProducts
