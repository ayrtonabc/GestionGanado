import { useApiBase } from './useApiBase';
import { supabase } from '../lib/supabase';
import { Tables, TablesInsert, TablesUpdate } from '../lib/database.types';
import { productionsCrud } from '../utils/utilsCrud';

type Filters=Partial<Tables<"milk_productions">>
const fetchProduction = async (filters?:Filters ) => {
  let query = supabase.from('milk_productions').select('*');
  
  if (filters?.animal_id) {
    query = query.eq('animal_id', filters.animal_id);
  }

  const { data, error } = await query;
  
  if (error) throw error;
  return data ;
};

export function useProductions(initialData: Tables<"milk_productions">[] = []) {
  const { data: productions, loading, error, fetchData, setData } = useApiBase(fetchProduction, initialData);
  
  const addProduction = async (newPost: TablesInsert<"milk_productions">) => {
    const prevProductions=[...productions]
    try {
      const createdProduction = await productionsCrud.create(newPost);
      setData([...productions, createdProduction]);
      return createdProduction;
    } catch (err) {
      console.error("Error creating production:", err);
      setData([...prevProductions])
      throw err;
    }
  };

  const updateProduction=async(production_id:number, updProductions:TablesUpdate<"milk_productions">)=>{
    const prevProductions=[...productions]
    try {
      //Manejar lógica para actualizar en el estado
    const upd=await productionsCrud.update(production_id,updProductions)
    const updateProducts=productions.map((p)=>{
      if(p.id!==production_id)return p
      return upd
    })
    setData(updateProducts)
    }catch(err){
      setData(prevProductions)
      throw err
    }
  }

  const deleteProduction=async(production_id:number)=>{
    const prevProductions=[...productions]
    try {
    setData(productions.filter(p=>p.id!==production_id))
    await productionsCrud.delete(production_id)
    }catch(err){
      setData(prevProductions)
      throw err
    }
  }
  
  

  return {
    productions,
    loading,
    error,
    fetchData,
    addProduction,
    updateProduction,
    deleteProduction
  };
}