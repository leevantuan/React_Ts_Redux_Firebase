import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createStudentInterface, listStudentInterface, studentInterface } from '../routes/main';
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const initialState: listStudentInterface = {
   students: [],
};

export const studentsRef = query(collection(db, 'students'));

export const fetchData = async (): Promise<listStudentInterface[]> => {
   const data = await getDocs(studentsRef);
   return data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }));
};
const updateStudent = async (student: studentInterface) => {
   await updateDoc(doc(db, 'students', `${student.id}`), {
      ...{ name: student.name, age: student.age },
   });
};
const deleteStudent = async (e: string) => {
   await deleteDoc(doc(db, 'students', `${e}`));
};
const createStudent = async (student: createStudentInterface) => {
   await addDoc(collection(db, 'students'), { name: student.name, age: student.age });
};

const studentsSlice = createSlice({
   name: 'student',
   initialState,
   reducers: {
      getData: (state, { payload: students }) => {
         state.students = students;
      },
      updateData: (state, action: PayloadAction<studentInterface>) => {
         updateStudent(action.payload);
      },
      deleteData: (state, action: PayloadAction<string>) => {
         deleteStudent(action.payload);
      },
      createData: (state, action: PayloadAction<createStudentInterface>) => {
         createStudent(action.payload);
      },
   },
});

export const { getData, updateData, deleteData, createData } = studentsSlice.actions;

export default studentsSlice.reducer;
