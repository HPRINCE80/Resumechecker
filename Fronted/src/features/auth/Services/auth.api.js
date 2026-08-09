import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})

function getApiError(err) {
    const message = err?.response?.data?.message || err?.message || "Request failed";
    const error = new Error(message);
    error.status = err?.response?.status;
    error.data = err?.response?.data;
    return error;
}

export async function register({ username, email, password }) {
    try {
        const response = await api.post('/api/auth/register', {
            username, email, password,
        });

        return response.data;
    } catch (err) {
        throw getApiError(err);
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post("/api/auth/login", { email, password });
        return response.data;
    } catch (err) {
        throw getApiError(err);
    }
}

export async function googleAuth(idToken) {
    try {
        const response = await api.post("/api/auth/google", { idToken });
        return response.data;
    } catch (err) {
        throw getApiError(err);
    }
}

export async function logout() {
    try {
        const response = await api.get("/api/auth/logout");
        return response.data;
    } catch (err) {
        throw getApiError(err);
    }
}

export async function getMe() {
    try {
        const response = await api.get("/api/auth/get-me");
        return response.data;
    } catch (err) {
        throw getApiError(err);
    }
}