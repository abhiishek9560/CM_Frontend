import { Copy, QrCode, Upload } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast';

const QRModel = (qr) => {

    const handleCopyClick = ()=>{
        navigator.clipboard.writeText(qr.link);
        toast.success("Product link copied");
    };

    const handleShareItem = async()=>{
        if(navigator.share){
            try{
                await navigator.share({
                    title: "ABC",
                    text: `Check out this item`,
                    url: qr.url
                });
            }catch(error){
                console.log(error);
            }
        }
        else{
            handleCopyClick();
        }
    }
  return (
    <div className='w-[27%] flex flex-col justify-center items-center bg-white p-6 pt-4 gap-4 rounded-lg shadow-2xl'>
        <div className='w-full flex items-center gap-3'>
            <QrCode size={20}/>
            <span className='text-lg font-semibold text-gray-950'>Share Item</span>
        </div>

        <div className='w-[50%] flex flex-col justify-center items-center p-6 pb-4 bg-gray-200 rounded-lg'>
            <img className='object-cover w-fit h-fit rounded-lg border-2 border-gray-300' src={qr.url} alt="QR not available" />
            <span className='text-sm font-semibold text-gray-500'>Scan to view item</span>
        </div>
        
        <div className='w-full grid grid-cols-1 gap-4'>
            <button onClick={handleShareItem} className='flex justify-center items-center gap-3 bg-gray-900 p-2.5 rounded-md cursor-pointer hover:bg-gray-800'>
                <Upload size={18} className='text-white'/>
                <span className='text-md font-semibold text-white'>Share Item</span>
            </button>

            <button className='flex justify-center items-center gap-3 border-1 border-gray-200 p-2.5 rounded-md hover:bg-gray-100 cursor-pointer'>
                <Copy size={18}/>
                <span onClick={handleCopyClick} className='text-md font-semibold text-black'>Copy Link</span>
            </button>
        </div>


        <div className='w-full flex flex-col bg-gray-100 rounded-md p-3 '>
            <span className='text-sm font-normal text-gray-700'>Item URL: </span>
            <span className='text-[11px] font-normal text-gray-700 '>{qr.link}</span>
        </div>
    </div>
  )
}

export default QRModel