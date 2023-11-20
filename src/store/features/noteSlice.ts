import { createSlice } from '@reduxjs/toolkit';

// export enum CategoryType {
//     Goal_Evidence = 'Goal Evidence',
//     Support_Coordination = 'Support Coordination',
//     Active_Duty = 'Active Duty',
// }

export interface Note {
    id: string;
    client: string;
    category: string;
    text: string;
}

export interface NoteArray {
    noteArray: Note[];
}

const initialState: NoteArray = {
    noteArray: [
        {
            id: '1', client: 'Client A', category: 'Goal Evidence', text: 'Note 1 Lorem ipsum dolor sit amet, consectetuer adipiscing elit'
        },
        {
            id: '2', client: 'Client B', category: 'Support Coordination', text: 'Note 2 Lorem ipsum dolor sit amet, consectetuer adipiscing elit'
        },
        {
            id: '3', client: 'Client C', category: 'Active Duty', text: 'Note 3 Lorem ipsum dolor sit amet, consectetuer adipiscing elit'
        }
    ],
};

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        addNote: (state, { payload }) => {
            state.noteArray.push(payload);
        },
        deleteNote: (state, { payload }) => {
            state.noteArray = state.noteArray.filter((note) => note.id !== payload);
        },
        editNote: (state, { payload }) => {
            state.noteArray = state.noteArray.map((note) => {
                if (note.id === payload.id) {
                    return { ...note, ...payload };
                }
                return note;
            });
        },
    },
});
export const { addNote, deleteNote, editNote } = noteSlice.actions;

export default noteSlice.reducer;