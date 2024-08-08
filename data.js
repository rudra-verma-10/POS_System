import { getDatabase, push, set } from "firebase/database";
import { database } from "./firebase";
import app from 'firebase/app';

const saveData = async () => {
    const db = getDatabase(app);
    const ref = push(db, 'data');
    set(ref, {
        name: 'John Doe',
        age: 25
    });
};

return(
    <button onClick={saveData}>Save Data</button>
)