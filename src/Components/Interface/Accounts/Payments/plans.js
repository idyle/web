let planIds = ['price_1NIa73LmTOxee3JCz9Vsyrpc', 'price_1NIaV2LmTOxee3JCsMdW7O4c', 'price_1NIaX8LmTOxee3JCPG3fZUV9'];
if (process.env.REACT_APP_MODE === 'development') planIds = ['price_1NIabgLmTOxee3JCk1DkIhlY', 'price_1NIac4LmTOxee3JC8Yq801Qi', 'price_1NIacFLmTOxee3JCHsxwuqzZ'];

export default [
    {
        id: planIds[0],
        name: 'Starter',
        gb: 30,
        price: 4.99,
        inclusions: [
            "idyle Platform & API",
            "idyle Network & CDN",
            "Basic Request Quota",
            "Basic Data Features",
            "1 Custom Domain + SSL"
        ],
        active: true
    },
    {
        id: planIds[1],
        name: 'Standard',
        gb: 50,
        price: 9.99,
        inclusions: [
            "idyle Platform & API",
            "idyle Network & CDN",
            "Premium Request Quota",
            "Basic Data Features",
            "2 Custom Domains + SSL"
        ],
        active: true
    },
    {
        id: planIds[2],
        name: 'Business',
        gb: 100,
        price: 14.99,
        inclusions: [
            "idyle Platform & API",
            "idyle Network & CDN",
            "Premium Request Quota",
            "Premium Data Features",
            "5 Custom Domains + SSL"
        ],
        active: true
    }
]
