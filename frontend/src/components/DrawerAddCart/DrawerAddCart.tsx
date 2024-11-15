import { cn } from '@/utils/TailwindMerge';
import { CloseOutlined, HeartOutlined } from '@ant-design/icons';
import { Button, Drawer, InputNumber, Rate, Space } from 'antd';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
type IPropsDrawerAddCart = {
  children: React.ReactNode;
  classNameBtn?: string;
};
export default function DrawerAddCart({
  children,
  classNameBtn,
}: IPropsDrawerAddCart) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const onClose = () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        className={cn('cursor-pointer', classNameBtn)}
        onClick={showDrawer}
      >
        {children}
      </button>
      <Drawer
        title={
          <>
            <div className="flex items-center justify-between">
              <div className="font-bold uppercase text-global">
                Tên sản phẩm
              </div>
              <Button type="text" onClick={onClose}>
                <CloseOutlined className="transform text-xl transition duration-500 hover:rotate-180" />
              </Button>
            </div>
          </>
        }
        placement="bottom"
        closable={false}
        height={'auto'}
        onClose={onClose}
        open={isOpen}
        // className={`relative z-10 ${isPending ? 'cursor-not-allowed' : ''} duration-300`}
      >
        <div className="h-full flex flex-col md:flex-row gap-5 items-center">
          <div className="w-[280px]">
            <img
              src="https://supersports.com.vn/cdn/shop/products/FS9799-1.jpg?v=1668074981"
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg text-global">
              Áo Thun Chạy Bộ Nam Adidas Own The Run
            </h3>
            <div className="flex items-center gap-2">
              <Rate allowHalf value={5} disabled className="text-base" />
              <span className="text-xs text-global">(5)</span>
            </div>
            <div className="h-[120px]"></div>
            <div className="flex items-center gap-5 text-global">
              <Space className="">
                <Button className="h-[38px] w-[38px]">-</Button>
                <InputNumber
                  min={1}
                  value={1}
                  className="flex h-[38px] w-[48px] items-center"
                  controls={false}
                />
                <Button className="h-[38px] w-[38px]">+</Button>
              </Space>
              <Button className="flex h-[38px] text-xs items-center">
                <HeartOutlined /> Thêm vào yêu thích
              </Button>
            </div>
            <div className="mt-4">
              <button className="bg-white font-medium text-global hover:border-hover hover:text-hover border-[1px] border-global border-opacity-55 duration-300  shadow-md w-[320px] h-[38px] rounded-md flex items-center justify-center">
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </Drawer>
    </motion.div>
  );
}
