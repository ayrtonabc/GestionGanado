import { Tables } from "../lib/database.types";
import { supabase } from "../lib/supabase";
import { createOPtimisticManagedCrud } from "../utils/createObjects";
import { useApiBase } from "./useApiBase";
type Filters={
    animal_id?:number
}
const fetchFarmers=async(filters?:Filters)=>{
    let query=supabase.from("farmers").select()

    if(filters?.animal_id) query=query.eq("animal_id",filters.animal_id)

    const {data,error}=await query
    if (error) throw error
    return data

}
export function useFarmers(initialData:Tables<"farmers">[]=[]){
    const{data,error, fetchData,loading, setData}=useApiBase(fetchFarmers,initialData)

    const {addRecord,deleteRecord,updateRecord}=createOPtimisticManagedCrud<"farmers",typeof data>("farmers",setData)

    return {
        barns:data,
        error,
        loading,
        fetchData,
        addFarmer:addRecord,
        updateFarmer:updateRecord,
        deleteFarmer:deleteRecord,
    }
}