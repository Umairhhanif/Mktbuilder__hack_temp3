export default {
    name: 'order',
    type: 'document',
    title: 'Order',
    fields: [
        {
            name: 'firstName',
            title: 'First Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'lastName',
            title: 'Last Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule: any) => Rule.required().email(),
        },
        {
            name: 'phone',
            title: 'Phone',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'address',
            title: 'Address',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
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
            validation: (Rule: any) => Rule.required(),
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
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'country',
            title: 'Country',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
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
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'subtotal',
            title: 'Subtotal',
            type: 'number',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'total',
            title: 'Total Amount',
            type: 'number',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'discount',
            title: 'Discount Amount',
            type: 'number',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'orderDate',
            title: 'Order Date',
            type: 'datetime',
            validation: (Rule: any) => Rule.required(),
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
            validation: (Rule: any) => Rule.required(),
        },
    ],
}
