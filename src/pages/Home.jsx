import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/slices/userSlices";

const Home = () => {
  const dispatch = useDispatch();

  const createUser = async (userData) => {
    try {
      const newUser = await createUserInServer(userData);
      dispatch(addUser(newUser));
      alert("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const createUserInServer = async (userData) => {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const newUser = await response.json();
    return newUser;
  };

  const removeUserHandler = (userId) => {
    dispatch(removeUser(userId));
  };

  return (
    <div>
      <button onClick={() => createUser({ name: "", email: "" })}>
        Create User
      </button>
      <button onClick={() => removeUserHandler(userIdToRemove)}>
        Remove User
      </button>
    </div>
  );
};

export default Home;
