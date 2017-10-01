export interface IProduct {
    Id: number;
    Description: string;
    Code: string;
    TamilName: string;
    PurchaseOrders: IPurchaseOrder[];
}

export interface IUnit {
    Id: number;
    Code: string;
    Description: string;
}

export interface ICompany {
    Id: number;
    Name: string;
    Phone: string;
    AadharNumber: number;
    TinNumber: string;
    GstNumber: string;
}

export interface IPurchaseOrder {
    Id: number;
    ProductId: number;
    PerUnitPrice: number;
    SalesPrice: number;
    ReSalesPrice: number;
    OpeningStock: number;
    ClosingStock: number;
    CurrentStock: number;
    Cgst: number;
    Sgst: number;
    Company: ICompany;
    Product: IProduct;
    Unit: IUnit;
}

export interface IBillInfo {
    Id: number;
    BillCode: number;
    CompanyId: number;
    CompanyName: string;
    Address: string;
    Mobile: number;
    Aadhar: number;
    Pan: string;
    TinNumber: string;
    GstNumber: string;
    Phone: string;

    TwoHalfCgst: number;
    TwoHalfSgst: number;
    SixCgst: number;
    SixSgst: number;
    NineCgst: number;
    NineSgst: number;
    FourteenCgst: number;
    FourteenSgst: number;
    
    SalesOrders : ISalesOrder[];

    Date: Date;
    Total: number;
}

export interface ISalesOrder {
    Id: number;
    UnitId: number;
    UnitCode: string;
    ProductId: number;
    ProductDescription: string;
    CompanyId: number;
    CompanyName: string;
    CurrentStock: number;
    PerUnitPrice: number;
    ActualPrice: number;
    Quantity: number;
    TaxableAmout: number;
    Amount: number;
    Cgst: number;
    CgstAmount: number;
    Sgst: number;
    SgstAmount: number;
    Company: ICompany;
    Product: IProduct;
    Unit: IUnit;
}

export interface IUnitSubUnit {
    Unit: IUnit
}

export interface Predicate<T> {
    (item: T): boolean
}