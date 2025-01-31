export const order = {
    name: 'order',
    type: 'document',
    title: 'Order',
    fields: [
        {
            name: 'firstName',
            title: 'First Name',
            type: 'string',
           
        },
        {
            name: 'lastName',
            title: 'Last Name',
            type: 'string',
          
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            
        },
        {
            name: 'phone',
            title: 'Phone',
            type: 'string',
          
        },
        {
            name: 'address',
            title: 'Address',
            type: 'string',
           
        },
        {
            name: 'addressLine2',
            title: 'Address Line 2',
            type: 'string',
        },
        {
            name: 'city',
            title: 'City',
            type: 'string',
           
        },
        {
            name: 'state',
            title: 'State',
            type: 'string',
        },
        {
            name: 'postalCode',
            title: 'Postal Code',
            type: 'string',
           
        },
        {
            name: 'country',
            title: 'Country',
            type: 'string',
            
        },
        {
            name: "cartItems",
            title: "Cart Items",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: 'product',
                            type: 'reference',
                            to: [{ type: 'product' }]
                        },
                        {
                            name: 'quantity',
                            type: 'number'
                        },
                        {
                            name: 'price',
                            type: 'number'
                        }
                    ]
                }
            ],
            
        },
        {
            name: 'subtotal',
            title: 'Subtotal',
            type: 'number',
          
        },
        {
            name: 'total',
            title: 'Total Amount',
            type: 'number',
            
        },
        {
            name: 'discount',
            title: 'Discount Amount',
            type: 'number',
           
        },
        {
            name: 'orderDate',
            title: 'Order Date',
            type: 'datetime',
            
        },
        {
            name: 'status',
            title: 'Order Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Pending', value: 'pending' },
                    { title: 'Processing', value: 'processing' },
                    { title: 'Shipped', value: 'shipped' },
                    { title: 'Delivered', value: 'delivered' },
                    { title: 'Cancelled', value: 'cancelled' }
                ]
            },
            
        },
    ],
}
