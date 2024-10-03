import axios from "axios";
import { CreateUserType, LogUserType } from "../typescript/UserType";

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
    console.error("Error creating user:", error);
    throw error;
  }
}
