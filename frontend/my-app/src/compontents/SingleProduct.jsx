import { useParams } from 'react-router-dom'
import Navbar from './parts/Navbar'
import { useContext, useEffect, useState } from 'react'
import { assets} from '../frontend_assets/assets'
import Footer from './parts/Footer'
import Summary from './parts/Summary'
import { context } from './Provider'
import RelatedProducts from './part3/RelatedProducts'

const SingleProduct = () => {
    const {addToCart,products}= useContext(context)
    const {id} = useParams()
    const [product,setProduct] = useState(false)
    const [index,setIndex] = useState(0);
    const [size,setSize] = useState("");
    useEffect(()=> {
        setSize("")
        const product1 = products.find((ele)=> {
            if(ele._id===id){
                return true
            }
            else {
                return false
            }
        })
        setProduct(product1)
    },[id])
    return product? (
    <>
    <Navbar />
    <div className='container mx-auto flex gap-[20px] mb-[20px] flex-wrap lg:flex-nowrap'>
        <div className='flex w-[50%] h-auto  gap-[10px] items-stretch'>
            <div className='flex flex-col    gap-[10px]  '>
                {
                    product.image.map((ele,index)=> {
                        return(
                            <>
                            <img src={ele} className='cursor-pointer h-[25%] w-[100px] ' alt='' onClick={()=> {
                                setIndex(index)
                            }} />
                            </>
                        )
                    })
                }
            </div>
                <img src={product.image[index]} alt="" className=' flex-1 h-[500px]' />
        </div>
        <div className='w-[50%] flex flex-col gap-[10px]'>
            <p className='capitalize font-bold text-xl'>
                {product.name}
            </p>
            <div className='flex gap-[5px]'>
                <img src={assets.star_icon} alt="" />
                <img src={assets.star_icon} alt="" />
                <img src={assets.star_icon} alt="" />
                <img src={assets.star_icon} alt="" />
                <img src={assets.star_dull_icon} alt="" />
            </div>
            <p className='font-bold text-2xl'>
                {product.price}$
            </p>
            <p className='text-sm text-gray-600 font-serif '>
                {product.description}
            </p>
            <p>
                <h1 className='capitalize font-semibold mb-[10px]'>
                    select size
                </h1>
                <div className='flex gap-[10px]'>
                {

                    product.sizes.map((ele)=> {
                        return(<>
                        <span  className={size===ele?'bg-gray-200 py-[5px] px-[10px] cursor-pointer border-[1px] capitalize font-serif border-black':"capitalize font-serif bg-gray-200 py-[5px] px-[10px] cursor-pointer " } onClick={async()=> {
                            await setSize(ele)
                        }}>
                            {ele}
                        </span>
                        </>)
                    })
                }
                </div>
            </p>
            <buttpn className="bg-black text-white py-[10px] px-[20px] capitalize w-fit mt-[10px] cursor-pointer" onClick={()=> {
                addToCart(product._id,size)
            }}>
                add to cart
            </buttpn>
        </div>

    </div>
    <RelatedProducts category={product.category} subCategory={product.subCategory} product={product} />
    <Summary />
    <Footer />
    </>
    
  ):(<></>)

}

export default SingleProduct
