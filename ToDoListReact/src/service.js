import axios from 'axios';

// 1. כתובת ברירת מחדל לכל הקריאות
axios.defaults.baseURL = 'http://localhost:5156'; // ← להחליף בפורט של ה־API

// 2. Interceptor לתפיסת שגיאות ב־Response
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default {
  // שליפת כל המשימות
  getTasks: async () => {
    const result = await axios.get('/items');
    return result.data;
  },

  // הוספת משימה
  addTask: async (name) => {
    const result = await axios.post('/items', { name, isComplete: false });
    return result.data;
  },

  // עדכון סטטוס משימה
  setCompleted: async (id, isComplete) => {
    const result = await axios.put(`/items/${id}`, { isComplete });
    return result.data;
  },

  // מחיקת משימה
  deleteTask: async (id) => {
    await axios.delete(`/items/${id}`);
  }
};