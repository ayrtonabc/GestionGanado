import { Dispatch, SetStateAction } from "react";
import { TablesInsert, TablesUpdate } from "../lib/database.types";
import { createCrud, Tablenames } from "./utilsCrud";



export function createOPtimisticManagedCrud<T extends Tablenames,K>(tablename:T,setData:Dispatch<SetStateAction<K>>){
    const crudRecord=createCrud(tablename)
    
    return{
        addRecord : async (newMove: TablesInsert<T>) => {
            try {
              const createdMove = await crudRecord.create(newMove) ;
              setData(prev=>([...prev,createdMove]));
              return createdMove;
            } catch (err) {
              console.error(`Error creating at table ${tablename}:`, err);
              setData(prev=>[...prev])
              throw err;
            }
          },
        
        updateRecord:async(move_id:number, updMove:TablesUpdate<T>)=>{
            try {
              //Manejar lógica para actualizar en el estado
              setData(prev=>(
                prev.map(record=>(record.id===move_id? {...record,...updMove}:record))
              ))
            const upd=await crudRecord.update(move_id,updMove)
            const updatedRecords=(records:DbRecord[])=>{return records.map((p)=>{
              if(p.id!==move_id)return p
              return upd
            })}
            setData(updatedRecords)
            }catch(err){
                console.error(`Error updating at table ${tablename}:`, err);
                setData(prevs=>[...prevs])
              throw err
            }
          },
        
        deleteRecord:async(animal_id:number)=>{
            try {
            setData(records=>records.filter(p=>p.id!==animal_id))
            await crudRecord.delete(animal_id)
            }catch(err){
              setData(prevs=>[...prevs])
              throw err
            }
          }
    }
}