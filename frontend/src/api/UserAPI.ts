import axios from "axios";
import { CreateUserType, LogUserType, UserType } from "../typescript/UserType";

export async function createUser(form: CreateUserType) {
  try {
    const response = await axios.post("http://localhost:5000/user/", form, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function logUser(form: LogUserType) {
  try {
    const response = await axios.post(
      "http://localhost:5000/user/login",
      form,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Login failed:", error.response.data.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw error;
  }
}

export async function getUser(id: String): Promise<UserType> {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(`http://localhost:5000/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    return {
      _id: "undefined",
      firstname: "undefined",
      lastname: "undefined",
      email: "undefined",
    };
  }
}
