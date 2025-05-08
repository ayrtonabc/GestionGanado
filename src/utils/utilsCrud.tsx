import { Database, TablesInsert, TablesUpdate } from "../lib/database.types"
import { supabase } from "../lib/supabase"
export type Tablenames=keyof Database["public"]["Tables"] 

export function createCrud<T extends Tablenames>(tablename:T){
    return{
    getAll:async()=>{
        const {data,error}=await supabase.from(tablename).select()
        if(error)throw error
        return data 
    },
    getById:async(id:number)=>{
        const {data,error}=await supabase.from(tablename).select().eq("id",id).maybeSingle()
        if(error)throw error
        return data 
    },
    create:async(newData:TablesInsert<T>)=>{
        const {data,error}=await supabase.from(tablename).insert(newData).select()
        if(error)throw error
        return data[0]
    },
    update:async(id:number,updData:TablesUpdate<T>)=>{
        const {data,error}=await supabase.from(tablename).update(updData).eq("id",id).select()
        if(error)throw error
        return data[0]
    },
    delete:async(id:number)=>{
        const {data,error}=await supabase.from(tablename).delete().eq("id",id).select()
        if(error)throw error
        return data[0]
    },
}
}
export const animalTypesCrud=createCrud("animal_types")
export const animalsCrud=createCrud("animals")
export const barnsCrud=createCrud("barns")
export const farmersCrud=createCrud("farmers")
export const locationsCrud=createCrud("locations")
export const movesCrud=createCrud("animal_moves")
export const productionsCrud=createCrud("milk_productions")

