import React, { useContext } from 'react';
import { studentInterface } from '../../routes/main';
import { studentContextType, StudentContext } from '../hooks/context';

export default function Table() {
   const { listStudents, HandleUpdate, HandleDelete } = useContext(
      StudentContext,
   ) as studentContextType;
   return (
      <table className="table table-hover border border-secondary mt-4">
         <thead>
            <tr>
               <th className="col-2">Student Name</th>
               <th className="col-2">Age</th>
               <th className="col-2">Actions</th>
            </tr>
         </thead>
         <tbody>
            {listStudents.map((student: studentInterface) => {
               return (
                  <tr key={student.id}>
                     <td>{student.name}</td>
                     <td>{student.age}</td>
                     <td>
                        <button
                           className="btn btn-success me-3"
                           onClick={() => HandleUpdate(student.id)}
                        >
                           Edit
                        </button>
                        <button
                           className="btn btn-warning"
                           onClick={() => HandleDelete(student.id)}
                        >
                           Delete
                        </button>
                     </td>
                  </tr>
               );
            })}
         </tbody>
      </table>
   );
}
