import Header2 from "../Header/Header2";
import Footer from "../Footer/Footer";
import Filters from "../filters/Filters";
import { useState,useEffect } from "react";
import Cart from "../cart/Cart";
import { Outlet } from "react-router-dom";
import useProductData from "../../hooks/useProductData";
function Layout({selectedCategory,setSelectedCategory,sortOption,setSortOption}){
    const [searchTerm,setSearchTerm] = useState('')
    const {products,loading,error} = useProductData()
    return (
        <>
        <Header2 
        storeName="MyStore" 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        />

        <Outlet context={{products,loading,error,searchTerm,setSearchTerm}}/>
        <Footer />
        </>
    )
}
export default Layout;