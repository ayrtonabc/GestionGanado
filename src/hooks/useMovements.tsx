import { useApiBase } from './useApiBase';
import { supabase } from '../lib/supabase';
import { Tables, TablesInsert, TablesUpdate } from '../lib/database.types';
import { movesCrud } from '../utils/utilsCrud';

type Filters={animal_id:number}

const fetchMoves = async (filters?:Filters) => {
  let query = supabase.from('animal_moves').select(`*`);
  
  if (filters?.animal_id) {
    query = query.eq('animal_id', filters.animal_id);
  }

  const { data, error } = await query;
  
  if (error) throw error;
  return data ;
};

export function useMoves(initialData: Tables<"animal_moves">[] = []) {
  const { data: animal_moves, loading, error, fetchData, setData } = useApiBase(fetchMoves, initialData);
  
  const addMove = async (newMove: TablesInsert<"animal_moves">) => {
    const prevMoves=[...animal_moves]
    try {
      const createdMove = await movesCrud.create(newMove);
      setData([...animal_moves, createdMove]);
      return createdMove;
    } catch (err) {
      console.error("Error creating production:", err);
      setData([...prevMoves])
      throw err;
    }
  };

  const updateMove=async(move_id:number, updMove:TablesUpdate<"animal_moves">)=>{
    const prevMoves=[...animal_moves]
    try {
      //Manejar lógica para actualizar en el estado
      setData(prev=>(
        prev.map(record=>(record.id===move_id? {...record,...updMove}:record))
      ))
    const upd=await movesCrud.update(move_id,updMove)
    const updatedMove=animal_moves.map((p)=>{
      if(p.id!==move_id)return p
      return upd
    })
    setData(updatedMove)
    }catch(err){
      setData(prevMoves)
      throw err
    }
  }

  const deleteMove=async(animal_id:number)=>{
    const prevMoves=[...animal_moves]
    try {
    setData(animal_moves.filter(p=>p.id!==animal_id))
    await movesCrud.delete(animal_id)
    }catch(err){
      setData(prevMoves)
      throw err
    }
  }
  
  

  return {
    animal_moves,
    loading,
    error,
    fetchData,
    addMove,
    updateMove,
    deleteMove
  };
}