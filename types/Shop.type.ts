/// <reference path="Negotiation.type.ts" />
export namespace Shop { 

    export interface Brand { 
        title: string,
        image: string
    }    

    export interface SellProduct {
        id : String,
        category : object,
    }
    
    export interface ProductImage { 
        title : 'photo1' | 'photo2' | 'photo3' | 'photo4' | 'photo5',
        src : String,
    }
    
    export interface Product {
        id : string,
        created_time: number,
        brand_name: string,
        type_name: string,
        subtype_name: string,
        description: string,
        material : string,
        country : string,
        color: string,
        images: { src : string}[],
        price: number,
        currency: string,
        tags: {
            id: string,
            title: string,
        },
        shipping_country: string,
        sold: boolean,
        express_delivery: boolean,
        we_love: boolean,
        vintage: boolean,
        trusted_seller: boolean,
        expert_seller: boolean,
        isApproved: boolean,
        approveNotificationSent: boolean,
    }
    
    export interface Address {
        id: string,
        title : 'Mr' | 'Mrs' | 'Company',
        first_name : string,
        last_name : string,
        company : string,
        phone_number : number,
        // street : string,
        // house : string,
        address : string,
        address_line_2 : string,
        postal_code : number,
        phone_country_code : string,
        city : string,
        countryCode: string,
        country: {
            name: string
        },
    }
    
    export interface Order { 
        id: string,
        items : Product[], 
        charge_id : string, 
        shippingAddress: Address,
        orderStatus : 'confirmed' | 'shipped' | 'recieved' | 'authentication' | 'sent', 
        email : string, 
        payment_details: any, 
        payment_status : string, 
        payment_method : string, 
        user_id : string, 
        amount : number, 
        createdAt : any, 
        updatedAt : any, 
        created_time : number, 
    }
}
