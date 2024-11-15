import { useCart } from '@/hooks/_common/useCart';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Drawer, Empty } from 'antd';
import { motion } from 'framer-motion';

type PropsType = {
    children: React.ReactNode;
};
const products = false
const CartDrawer = ({ children }: PropsType) => {
    const {cart, handleOpenCart,onClose} = useCart()
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <span className={'cursor-pointer'} onClick={handleOpenCart}>
                {children}
            </span>
            <Drawer
                title={
                    <>
                        {/* <div className='h-[4px] w-full'>{isPending && <LoadingBar />}</div> */}
                        <div className='flex items-center justify-between'>
                            <div className='font-bold uppercase text-black'>Giỏ Hàng</div>
                            <Button type='text' onClick={onClose}>
                                <CloseOutlined className='transform text-xl transition duration-500 hover:rotate-180' />
                            </Button>
                        </div>
                    </>
                }
                width={'35vw'}
                placement='right'
                closable={false}
                onClose={onClose}
                open={cart}
                // className={`relative z-10 ${isPending ? 'cursor-not-allowed' : ''} duration-300`}
            >
                {!products && (
                    <div className='flex flex-col items-center justify-center min-h-[60vh]'>
                        <img src="https://canifa.com/assets/images/cart-empty.png" alt="" />
                        <p className='text-center text-global text-xl font-medium leading-6'>Giỏ hàng hiện không có sản phẩm.</p>
                        <button onClick={onClose} className='mt-12 h-[48px] rounded-md  px-12 font-bold border-[1px] text-[#da291c] border-[#da291c]'>
                            Tiếp tục mua hàng
                        </button>
                    </div>
                )}
            </Drawer>
        </motion.div>
    );
};

export default CartDrawer;
