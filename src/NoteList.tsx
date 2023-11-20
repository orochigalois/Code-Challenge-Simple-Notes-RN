// NoteList.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Button } from '@rneui/base';

import { useSelector, useDispatch } from 'react-redux';
import { Note, deleteNote } from './store/features/noteSlice';


interface NoteListProps {
    navigation: any; // You might want to replace 'any' with the proper type
}

const NoteList: React.FC<NoteListProps> = ({ navigation }) => {
    const [notes, setNotes] = useState<Note[]>([]);
    const {noteArray}  = useSelector((store: any) => store.note);
    const dispatch = useDispatch();


    useEffect(() => {
        setNotes(noteArray);
    }, [noteArray]);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.addNoteContainer}>
                <Button title="Add Note" onPress={() => {
                    navigation.navigate('AddNote')
                }} buttonStyle={styles.addButton} />
            </View>
            {notes?.length === 0 ? (
                <Text>No notes available. Add some notes!</Text>
            ) : (
                <FlatList
                    data={notes}
                    keyExtractor={(item) => item.id}
                    style={styles.outerContainer}
                    renderItem={({ item }) => (
                        <View style={styles.noteContainer}>
                            <View style={styles.badgeContainer}>
                                <Text style={styles.badgeText}>{item.client}</Text>
                            </View>
                            <View style={styles.badgeContainer}>
                                <Text style={styles.badgeText}>{item.category}</Text>
                            </View>
                            <Text style={styles.noteText}>{item.text}</Text>
                            <View style={styles.buttonContainer}>
                                <Button
                                    title="Edit"
                                    onPress={() => navigation.navigate('AddNote', { note: item, editMode: true })}
                                    buttonStyle={styles.editButton}
                                />
                                <Button
                                    title="Delete"
                                    color={'red'}
                                    onPress={() => {
                                        dispatch(deleteNote(item.id));
                                    }}
                                    containerStyle={styles.deleteButton}
                                />
                            </View>
                        </View>
                    )}
                />
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        marginBottom: 100,
    },
    noteText: {
        marginVertical: 10,
    },
    badgeContainer: {
        backgroundColor: 'green', // Adjust the background color as needed
        borderRadius: 10, // Adjust the border-radius for rounded corners
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 5,
        alignSelf: 'flex-start'
    },
    badgeText: {
        color: 'white', // Adjust the text color as needed
        fontWeight: 'bold', // Adjust the font weight as needed
    },
    outerContainer: {
        marginTop: 5,
    },
    noteContainer: {
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    editButton: {
        width: 100,
    },
    deleteButton: {
        width: 100,
    },
    addButton: {
        width: '100%',
        alignSelf: 'center',
    },
    addNoteContainer: {
        marginTop: 10,
        marginHorizontal: 10,
    }
});

export default NoteList;
