import { createContext, useState, useContext } from "react";

const productContext = createContext()

export const useProduct = () => useContext(productContext)

export const ProductProvider = ({ children }) => {
    const [selectedProduct, setSelectedProduct] = useState(null)

    return (
        <productContext.Provider value={{ selectedProduct, setSelectedProduct }}>
            {children}
        </productContext.Provider>
    )
}