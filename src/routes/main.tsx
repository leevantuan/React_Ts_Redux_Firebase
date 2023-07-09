import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createData, deleteData, fetchData, getData, updateData } from '../redux/reducers';
import { StudentContextProvider } from '../components/hooks/context';

import Table from '../components/layout/table';

export interface studentInterface {
   id: string;
   name: string;
   age: number | string;
}
export interface createStudentInterface {
   name: string;
   age: number | string;
}
export interface listStudentInterface {
   students: studentInterface[];
}

export default function Main() {
   const [loading, setLoading] = useState<boolean>(false);

   const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
   const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
   const [students, setStudents] = useState<listStudentInterface[]>([]);

   const [studentName, setStudentName] = useState<string>('');
   const [studentAge, setStudentAge] = useState<number | string>('');
   const [studentId, setStudentId] = useState<string>('');

   const dispatch = useDispatch();

   const listStudents = useSelector((state: any) => state.students.students);

   useEffect((): void => {
      const list = fetchData();
      list.then(function (result) {
         setStudents(result);
      });
   }, [loading]);

   const HandleGetData = (): void => {
      setLoading(!loading);
      dispatch(getData(students));
   };
   const HandleUpdate = (id: string): void => {
      setShowModalUpdate(true);
      const findStudent: studentInterface = listStudents.find(
         (student: studentInterface) => student.id === id,
      );
      setStudentName(findStudent.name);
      setStudentAge(findStudent.age);
      setStudentId(findStudent.id);
   };

   const HandleClickUpdate = (): void => {
      setLoading(!loading);
      const newUpdate: studentInterface = {
         id: studentId,
         name: studentName,
         age: studentAge,
      };
      dispatch(updateData(newUpdate));
      setShowModalUpdate(false);
      setStudentName('');
      setStudentAge('');
      setStudentId('');
   };
   const HandleDelete = (id: string): void => {
      setLoading(!loading);
      dispatch(deleteData(id));
      alert('Delete success!');
   };

   const HandleAddData = (): void => {
      setShowModalCreate(true);
   };
   const HandleClickCreate = (): void => {
      setLoading(!loading);
      const AddStudent: createStudentInterface = {
         name: studentName,
         age: studentAge,
      };
      dispatch(createData(AddStudent));
      setShowModalCreate(false);
      setStudentName('');
      setStudentAge('');
   };

   const HandleClickCloseUpdate = () => {
      setShowModalUpdate(false);
   };
   return (
      <StudentContextProvider value={{ listStudents, HandleUpdate, HandleDelete }}>
         <div className="container col-4 mt-4">
            {/* <!-- Modal update --> */}
            <div
               className="modal"
               tabIndex={-1}
               style={showModalUpdate ? { display: 'block' } : {}}
            >
               <div className="modal-dialog">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                           Update
                        </h5>
                        <button
                           className="btn-close"
                           aria-label="Close"
                           onClick={HandleClickCloseUpdate}
                        ></button>
                     </div>
                     <div className="modal-body">
                        <div className="mb-3">
                           <label className="form-label">Name</label>
                           <input
                              type="text"
                              className="form-control"
                              onChange={(e) => setStudentName(e.target.value)}
                              value={studentName}
                           />
                        </div>
                        <div className="mb-3">
                           <label className="form-label">Age</label>
                           <input
                              type="number"
                              className="form-control"
                              onChange={(e) => setStudentAge(e.target.valueAsNumber)}
                              value={studentAge}
                           />
                        </div>
                     </div>
                     <div className="modal-footer">
                        <button
                           type="button"
                           className="btn btn-secondary"
                           onClick={HandleClickCloseUpdate}
                        >
                           Close
                        </button>
                        <button
                           type="button"
                           className="btn btn-primary"
                           onClick={HandleClickUpdate}
                        >
                           Save changes
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            {/* <!-- Modal create --> */}
            <div
               className="modal"
               tabIndex={-1}
               style={showModalCreate ? { display: 'block' } : {}}
            >
               <div className="modal-dialog">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                           Create
                        </h5>
                        <button
                           className="btn-close"
                           aria-label="Close"
                           onClick={() => setShowModalCreate(false)}
                        ></button>
                     </div>
                     <div className="modal-body">
                        <div className="mb-3">
                           <label className="form-label">Name</label>
                           <input
                              type="text"
                              className="form-control"
                              onChange={(e) => setStudentName(e.target.value)}
                              placeholder="Enter student name ..."
                              value={studentName}
                           />
                        </div>
                        <div className="mb-3">
                           <label className="form-label">Age</label>
                           <input
                              type="number"
                              className="form-control"
                              onChange={(e) => setStudentAge(e.target.valueAsNumber)}
                              placeholder="Enter student age ..."
                              value={studentAge}
                           />
                        </div>
                     </div>
                     <div className="modal-footer">
                        <button
                           type="button"
                           className="btn btn-secondary"
                           onClick={() => setShowModalCreate(false)}
                        >
                           Close
                        </button>
                        <button
                           type="button"
                           className="btn btn-primary"
                           onClick={HandleClickCreate}
                        >
                           Create a student
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            <button onClick={HandleGetData} className="me-3">
               Refresh Data
            </button>
            <button onClick={HandleAddData}>Add new student</button>
            <Table />
         </div>
      </StudentContextProvider>
   );
}
