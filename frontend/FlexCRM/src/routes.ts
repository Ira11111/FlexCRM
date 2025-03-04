import {index, layout, route} from "@react-router/dev/routes";



export default [
    index('./pages/Home.tsx'),


    route('/register', './components/auth/register.tsx'),
    route('/login', './components/auth/login.tsx'),

    layout('./components/ProtectedRoute',
        [
            layout('./pages/Crm.tsx', [
                index('./components/crm/statistics.tsx'),

                route('customers', './components/crm/customers.tsx'),
                route('customers/:customerId', './components/crm/customer.tsx'),

                route('leads', './components/crm/leads.tsx'),
                route('leads/:leadId', './components/crm/lead.tsx'),

                route('ads', './components/crm/ads.tsx'),
                route('ads/:adId', './components/crm/ad.tsx'),

                route('products', './components/crm/products.tsx'),
                route('products/:productId', './components/crm/product.tsx'),

                route('contracts', './components/crm/contracts.tsx'),
                route('contracts/:contractId', './components/crm/contract.tsx'),
            ])
        ])
]