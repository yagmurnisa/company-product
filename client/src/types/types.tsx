export type Company = {
    _id: string,
    legalNumber: string,
    name: string,
    country: string,
    website: string
};
export type Product = {
    _id: string,
    name: string,
    category: string,
    amount: string,
    unit: string,
    companyNumber: string
};
export type NewCompany = {
    legalNumber: string,
    name: string,
    country: string,
    website: string
};
export type NewProduct = {
    name: string,
    category: string,
    amount: string,
    unit: string,
    companyNumber: string
};