import { useApiBase } from './useApiBase';
import { supabase } from '../lib/supabase';
import { Tables, TablesInsert, TablesUpdate } from '../lib/database.types';
import { animalsCrud } from '../utils/utilsCrud';

type Filters={barn?:string,age:number,animal_type:string}

const fetchAnimals = async (filters?:Filters) => {
  let query = supabase.from('animals').select(`*, 
    barns!inner(name),
    farmers!inner(name),
    animal_types!inner(name)
    `);
  
  if (filters?.barn) {
    query = query.eq('barns.name', filters.barn);
  }

  const { data, error } = await query;
  
  if (error) throw error;
  return data ;
};

export function useAnimals(initialData: Tables<"animals">[] = []) {
  const { data: animals, loading, error, fetchData, setData } = useApiBase(fetchAnimals, initialData);
  
  const addAnimal = async (newAnimal: TablesInsert<"animals">) => {
    const prevAnimals=[...animals]
    try {
      const createdAnimal = await animalsCrud.create(newAnimal);
      setData([...animals, createdAnimal]);
      return createdAnimal;
    } catch (err) {
      console.error("Error creating animal:", err);
      setData([...prevAnimals])
      throw err;
    }
  };

  const updateAnimal=async(animal_id:number, updAnimals:TablesUpdate<"animals">)=>{
    const prevAnimals=[...animals]
    try {
      //Manejar lógica para actualizar en el estado
    const upd=await animalsCrud.update(animal_id,updAnimals)
    const updatedAnimals=animals.map((p)=>{
      if(p.id!==animal_id)return p
      return upd
    })
    setData(updatedAnimals)
    }catch(err){
      console.error("Error updating animal:", err);
      setData(prevAnimals)
      throw err
    }
  }

  const deleteAnimal=async(animal_id:number)=>{
    const prevAnimals=[...animals]
    try {
    setData(animals.filter(p=>p.id!==animal_id))
    await animalsCrud.delete(animal_id)
    }catch(err){
      console.error("Error deleting animal:", err);
      setData(prevAnimals)
      throw err
    }
  }
  
  

  return {
    animals,
    loading,
    error,
    fetchData,
    addAnimal,
    updateAnimal,
    deleteAnimal
  };
}