import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button } from '@rneui/base';
import { useDispatch } from 'react-redux';
import { addNote, editNote } from './store/features/noteSlice';


const categories = ['Goal Evidence', 'Support Coordination', 'Active Duty'];

const AddNote = ({ navigation, route }): JSX.Element => {
    const [id, setId] = useState('');
    const [client, setClient] = useState('');
    const [category, setCategory] = useState('Goal Evidence');
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (route.params && route.params.editMode) {
            const { note } = route.params;
            setId(note.id);
            setClient(note.client);
            setCategory(note.category);
            setText(note.text);
        }
    }, [route.params]);

    const saveNote = () => {


        if (route.params && route.params.editMode) {
            const updatedNote = {
                id,
                client,
                category,
                text,
            };
            dispatch(editNote(updatedNote));
        } else {
            const newNote = {
                id: new Date().getTime().toString(),
                client,
                category,
                text,
            };
            dispatch(addNote(newNote));
        }


        navigation.navigate('NoteList');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Client:</Text>
            <TextInput style={styles.input} value={client} onChangeText={setClient} />
            <Text style={styles.label}>Category:</Text>
            <Picker
                style={styles.picker}
                selectedValue={category}
                onValueChange={(value) => setCategory(value)}>
                {categories.map((cat) => (
                    <Picker.Item key={cat} label={cat} value={cat} />
                ))}
            </Picker>
            <Text style={styles.label}>Note Text:</Text>
            <TextInput style={styles.inputMulti} value={text} onChangeText={setText} multiline />
            <Button title="Save Note" onPress={saveNote} style={styles.button} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginVertical: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
    },
    inputMulti: {
        height: 200,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        padding: 10,
    },
    picker: {
        height: 100,
        marginBottom: 100,
    },
    button: {
        marginTop: 10,
    },
});

export default AddNote;
