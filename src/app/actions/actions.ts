import { Product, CartItem } from "../../../types/products";

const parsePrice = (value: any): number => {
    if (typeof value === 'number') return Math.max(0, Math.round(value * 100) / 100);
    if (typeof value === 'string') {
        // Remove currency symbol and any commas
        const cleanValue = value.replace(/[$,]/g, '');
        return Math.max(0, Math.round(parseFloat(cleanValue) * 100) / 100);
    }
    return 0;
};

const parseQuantity = (value: any): number => {
    if (typeof value === 'number') return Math.max(1, Math.floor(value));
    if (typeof value === 'string') return Math.max(1, Math.floor(parseFloat(value)));
    return 1;
};

const createCartItem = (product: Product | CartItem, quantity: number = 1): CartItem => {
    // Ensure we have valid price and quantity
    const price = parsePrice(product.price);
    const safeQuantity = parseQuantity(quantity);

    return {
        _id: product._id,
        _type: product._type,
        productName: product.productName,
        price: price,
        quantity: safeQuantity,
        image: product.image,
        selectedSize: product.selectedSize,
        slug: product.slug,
        imageUrl: product.imageUrl,
        inventory: product.inventory
    };
};

export const addToCart = (product: Product) => {
    try {
        const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingProductIndex = cart.findIndex(item => 
            item._id === product._id && 
            item.selectedSize === product.selectedSize
        );

        if (existingProductIndex > -1) {
            // Update existing item
            const currentQuantity = parseQuantity(cart[existingProductIndex].quantity);
            cart[existingProductIndex] = createCartItem(product, currentQuantity + 1);
        } else {
            // Add new item
            cart.push(createCartItem(product, 1));
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
};

export const removeFromCart = (productId: string) => {
    try {
        let cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
        cart = cart.filter(item => item._id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error removing from cart:', error);
    }
};

export const updateCartQuantity = (productId: string, quantity: number) => {
    try {
        const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
        const productIndex = cart.findIndex(item => item._id === productId);
        
        if (productIndex > -1) {
            const product = cart[productIndex];
            cart[productIndex] = createCartItem(product, Math.max(1, quantity));
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    } catch (error) {
        console.error('Error updating cart quantity:', error);
    }
};

export const getCartItems = (): CartItem[] => {
    try {
        const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
        return cart.map(item => createCartItem(item, item.quantity));
    } catch (error) {
        console.error('Error getting cart items:', error);
        return [];
    }
};
