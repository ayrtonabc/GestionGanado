import { Tables } from "../lib/database.types";
import { supabase } from "../lib/supabase";
import { createOPtimisticManagedCrud } from "../utils/createObjects";
import { useApiBase } from "./useApiBase";
type Filters={
    animal_id?:number
}
const fetchFarmers=async(filters?:Filters)=>{
    let query=supabase.from("barns").select()

    const {data,error}=await query
    if (error) throw error
    return data

}
export function useBarns(initialData:Tables<"barns">[]=[]){
    const{data,error, fetchData,loading, setData}=useApiBase(fetchFarmers,initialData)

    const {addRecord,deleteRecord,updateRecord}=createOPtimisticManagedCrud<"barns",typeof data>("barns",setData)

    return {
        farmers:data,
        error,
        loading,
        fetchData,
        addBarn:addRecord,
        updateBarn:updateRecord,
        deleteBarn:deleteRecord,
    }
}