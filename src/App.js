import { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const App = () => {
    
    const [newName, setNewName] = useState("");
    const [newAge, setNewAge] = useState(0);
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "users");

    const createUser = async () => {
        await addDoc(usersCollectionRef, {name: newName, age: Number(newAge)});
        setNewName("");
        setNewAge(0);
    }

    const updateUser = async (id, age) => {
        const userDoc = doc(db, "users", id);
        const newFields = {age: age + 1};
        await updateDoc(userDoc, newFields);
    }

    const deleteUser = async (id) => {
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
    }

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }

        getUsers();
    }, [users]);
    
    return (
        <div>
            <input placeholder="Name..." onChange={(e) => {setNewName(e.target.value)}} value={newName} />
            <input type="number" placeholder="Age..." onChange={(e) => {setNewAge(e.target.value)}} value={newAge} />
            <button onClick={createUser}>Create User</button>

            {users.map((user) => (
                <div>
                    <h1>Name: {user.name}</h1>
                    <h1>Age: {user.age}</h1>
                    <button onClick={() => {updateUser(user.id, user.age)}}>Increase Age</button>
                    <button onClick={() => (deleteUser(user.id))}>Delete User</button>
                </div>
            ))}
        </div>
    );
};

export default App;