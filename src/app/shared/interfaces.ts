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
    PanNumber: string;
    TinNumber: string;
    GstNumber: string;
    Address: string;
    Mobile: number;
    Balance:number;
}

export interface IPurchaseOrder {
    Id: number;
    CompanyId: number;
    UnitId: number;
    ProductId: number;
    PerUnitPrice: number;
    SalesPrice: number;
    ReSalesPrice: number;
    OpeningStock: number;
    ClosingStock: number;
    CurrentStock: number;
    OldStock: number;
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
    Balance: number;
    PanNumber: string;
    TinNumber: string;
    GstNumber: string;
    Phone: string;
    CreatedDate: string;
    totalViewModel: any;
    
    TwoHalfCgst: number;
    TwoHalfSgst: number;
    SixCgst: number;
    SixSgst: number;
    NineCgst: number;
    NineSgst: number;
    FourteenCgst: number;
    FourteenSgst: number;

    SalesOrders: ISalesOrder[];

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

export interface Predicate<T> {
    (item: T): boolean
}