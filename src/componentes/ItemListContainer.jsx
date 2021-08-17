import React, { useEffect, useState } from 'react'
import { ItemList } from './ItemList';
import { useParams } from 'react-router-dom';
import { db } from "../firebase/Firebase"



export const ItemListContainer = () => {
    const [ category, setCategory ] = useState([])

    const { id } = useParams();


    useEffect(() => {
        const productsByCategory = async () => {
            if (id !== undefined) {
                const response = await db.collection('Productos').where('categoryId', '==', id).get();
                setCategory(response.docs.map(response => ({id: response.id, ...response.data()})))
            }else{
                const response = await db.collection('Productos').get();
                setCategory(response.docs.map(response => ({id: response.id, ...response.data()})))
            }
        }
        productsByCategory();
    }, [id])


    return(
        <>
        {category.length > 0 ?
        <ItemList key={ItemList.id} categorias={category}/> : 
        <div className="d-flex justify-content-center">
            <div className="spinner-border text-info"></div>
            <span className="sr-only">Loading...</span>
        </div>
        }        
        </>
    )
}
