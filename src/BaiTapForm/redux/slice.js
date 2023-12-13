import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    studentList: [],
    editStd: undefined,
};
const BTFormSlice = createSlice({
    name: "BTForm",
    initialState,
    reducers: {
        addStudent: (state, action) => {
            state.studentList.push(action.payload);
        },
        deleteStudent: (state, action) => {
            state.studentList = state.studentList.filter(
                (student) => student.id !== action.payload
            );
        },
        editStudent: (state, action) => {
            state.editStd = action.payload;
        },
        saveStudent: (state, action) => {
            const index = state.studentList.findIndex(
                (student) => student.id === action.payload.id
            );
            state.studentList.splice(index, 1, action.payload);
        },
        resetForm: (state, action) => {
            state.editStd = undefined;
        },
    },
});
export const { reducer: BTFormReducer, actions: BTFormActions } = BTFormSlice;
