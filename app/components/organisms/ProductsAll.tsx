import styles from './organisms.module.css';
import React, { useState } from 'react'
import Button from '../atoms/button/Button';

import { useRouter } from 'next/navigation';
import ProductsList from './ProductsList';
import Products from './Products';

const ProductsAll = () => {
    const router = useRouter();
    const [subMenu, setSubMenu] = useState<string>('list');
    
    const subMenuRenderer = (subMenuType: string) => {
        console.log(subMenuType)
        setSubMenu(subMenuType);
    }
    
  return (
    <div className={styles['product-section']}>
        {subMenu === 'list' && (
        <>
            <div className={styles['list-btn']}>
                <Button value='Add Product' className='button-long' onClick={() => setSubMenu('details')}/>
            </div>
            <ProductsList />
        </>
        )}
        {subMenu === 'details' && <Products renderSubMenu={subMenuRenderer}/>}
    </div>
  )
}

export default ProductsAll;