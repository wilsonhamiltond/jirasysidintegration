export class Utils{
    constructor(){

    }

    public static getKeyFromSysAid(key: string, ticketInfo: Array<any>, items:any ): string{
        if( typeof ticketInfo == 'object' ){
            for( let item of ticketInfo){
                if( item["key"] == key ){
                    var value = item["value"];
                    return items[value] || item["value"];
                }
            }
        }
        return '';
    }
    
    public static getValueFromObject(prop:string, object:any): any{
        if( object.hasOwnProperty( prop )){
            var property:string = object[prop];
            var obj = {};
            obj[property] = object['value'];
            return obj;
        }else{
            return object['value'];
        }
    }
}