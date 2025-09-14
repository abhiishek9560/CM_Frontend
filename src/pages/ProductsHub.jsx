import { Search, SearchCheckIcon, SearchIcon, SearchXIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductListCard from '../components/ProductListCard';
import { useNavigate } from 'react-router-dom';


const ProductsHub = () => {
    const navigate = useNavigate();
    // directly sending the e.target.value so don't need these states
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = ["All", "Electronics", "Books", "Vehicles", "Sports", "Clothing", "Others"];
    const [productResult, setProductResult] = useState({products:[]});
    const API_URL = import.meta.env.VITE_API_URL;

    const [filters, setFilters] = useState({
        query: null,
        category: null,
        price: null,
    });

    const filterHandler = (newFilter) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilter
        }));
    }

    const getfilteredProducts = async() => {
        try{
            const response = await axios.get(`${API_URL}/market/filtered-prod-list`, {params: filters});
            setProductResult(response.data)
            console.log(response.data);
        }catch(error){
            console.log(error.message);
        }
    }

    useEffect(() => {
        getfilteredProducts();
    }, [filters])
    

    
    // fetching filtered product list
    // useEffect(() => {
    //   const fetchFilteredProducts = async() => {
    //     // if(searchQuery.trim() === ''){
    //     //     setProductResult({products:[]});
    //     //     return;
    //     // }

    //     try{
    //         // const params = {};
    //         // if(searchQuery){
    //         //     params.query = searchQuery
    //         // }
    //         // if(selectedCategory && selectedCategory !== "all"){
    //         //     params.category = selectedCategory;
    //         // }
    //         const response = await axios.get(`http://localhost:3000/market/filtered-prod-list`);
    //         console.log(response.data);
    //         setProductResult(response.data);
    //     }catch(error){
    //         console.log(error.message);
    //     }
    //   };

    // //   const searchDelay = setTimeout(() => {
    //     fetchFilteredProducts();
    // //   }, 300);

    // //   return () => clearTimeout(searchDelay);

      
    // }, [])
    

  return (
    <div className='w-[83%] ml-32 flex flex-col items-center gap-6 mt-10 '>
         {/* marketplace banner */}
        <div className='w-full flex flex-col justify-center bg-gradient-to-r from-blue-500 to-purple-500 py-9 px-8 rounded-2xl gap-2 shadow-lg'>
            <span className='text-4xl font-bold text-white'>Marketplace</span>
            <span className='text-[17px] font-semibold text-gray-100'>Discover amazing deals from fellow students</span>

        </div>

        {/* search and filters */}
        <div className='w-full flex flex-col justify-center items-center mt-4 p-6 rounded-md shadow-xl border-0 bg-white/80 backdrop-blur-lg'>
            {/* search bar */}
            <div className='flex items-center gap-2 border-1 border-gray-300 p-2 w-[50%] rounded-md'>
                <Search size={18} className='text-gray-500'/>
                <input 
                type="text"
                onChange={(e)=>filterHandler({query: e.target.value})}
                placeholder='Search for textbooks, electronics, Vehicles...' 
                className='w-full outline-none'/>
            </div>

            {/* category and price filters */}
            <div className='w-full flex justify-between items-center'>
                {/* categories */}
                <div className='flex justify-start gap-4 mt-4'>
                    {categories.map(category =>(
                        <button
                        key={category}
                        onClick={()=>{filterHandler({category: category}), setSelectedCategory(category)}}
                        className={`flex justify-center items-center rounded-full transition-all duration-200 border-1 border-gray-300 py-1 px-3 cursor-pointer text-md font-semibold ${
                            selectedCategory === category
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                            : 'hover:bg-gray-200'
                        }`}>
                            {category}
                        </button>
                    ))}
                </div>
                {/* price and date */}
                <div className='flex justify-center items-center gap-2 mt-4'>
                    {/* price */}
                    <select onChange={(e)=>filterHandler({price: e.target.value})} className='border-1 py-1 px-2 border-gray-300 rounded-lg focus:border-2 focus:border-blue-500 text-md font-light'>
                        <option selected value="allPrices">All Prices</option>
                        <option value="500-1000">500-1000</option>
                        <option value="500" >Under 500</option>
                        <option value="1000">over 1000</option>
                    </select>

                    {/* date */}
                    <select className='border-1 py-1 px-2 border-gray-300 rounded-lg focus:border-2 focus:border-blue-500 text-md font-light'>
                        <option value="newestFirst">Newest First</option>
                        <option value="oldestFirst">Oldest First</option>
                        <option value="PriceLowToHigh">Price Low to High</option>
                        <option value="PriceHighToLow">Price High to Low</option>
                    </select>
                </div>
            </div>
        </div>

        {/* showing number of items found */}
        <div className='w-full flex justify-start pl-2 '>
            <div className='text-lg font-semibold text-gray-700 bg-gray-100 py-2 px-4 rounded-2xl'>
                {productResult.products.length} item{productResult.products.length === 0 ? '': 's'} found
            </div>
        </div>

        {/* productList grid box */}

        {productResult.products.length === 0 ?
        (<div className='flex flex-col justify-center items-center w-full py-18 rounded-lg gap-2 bg-white shadow-xl mb-8'>
            <span className='text-7xl'>🔍</span>
            <span className='text-2xl font-semibold text-gray-700'>No items found</span>
            <span className='text-lg text-gray-500'>Try adjusting your search terms or filters</span>
         </div >)
         :
        (
            <div className='grid grid-cols-1 md:grid-cols-4 gap-8 w-full py-4  space-y-6'>
            {productResult.products.slice(0,30).map(product => (
                <ProductListCard  key={product._id} product_id={product._id} title={product.title} description={product.description} category={product.category} price={product.price} image={product.image} status={product.status} seller={product.seller} createdAt={product.createdAt}  />
                
            ))}
        </div>
        )
        }

        
    </div>
  )
}

export default ProductsHub