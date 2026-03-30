import Navbar  from '../../../components/Navbar'

// 1. Hàm fetch dữ liệu cho 1 sản phẩm cụ thể dựa vào ID
async function getProduct(id) {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
}

// 2. Component chính. Next.js tự động truyền prop 'params' chứa cái [id] trên URL vào đây
export default async function ProductDetailPage({ params }) {
    // Lấy id từ URL và gọi API
    const resolvedParams = await params;
    const product = await getProduct(resolvedParams.id);

    return (
        <>
        <Navbar/>
        <div className="max-w-6xl mx-auto p-6">
            {/* Sử dụng flex-col cho mobile và md:flex-row cho màn hình lớn để Responsive */}
            <div className="flex flex-col md:flex-row gap-10 bg-white p-8 rounded-lg shadow-md">
                
                {/* Cột trái: Ảnh lớn */}
                <div className="md:w-1/2 flex justify-center items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src={product.image} 
                        alt={product.title} 
                        className="max-h-[400px] object-contain"
                    />
                </div>

                {/* Cột phải: Thông tin chi tiết */}
                <div className="md:w-1/2 flex flex-col justify-center">
                    <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
                        {product.category}
                    </p>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        {product.title}
                    </h1>
                    <p className="text-2xl font-semibold text-red-500 mb-6">
                        ${product.price}
                    </p>
                    <p className="text-gray-700 text-base leading-relaxed mb-8">
                        {product.description}
                    </p>
                    
                    {/* Nút Add to Cart */}
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-md transition duration-300 w-full md:w-auto">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}