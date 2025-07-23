import { useContext, createContext,useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000';
const AppContext = createContext();

export const AppProvider = ({children})=>{
    const navigate = useNavigate();

    const [token,setToken] = useState(null);
    const [blog,setBlog] = useState([]);
    const [ input, setInput]= useState("");

    const fetchBlogs = async ()=>{
        try{
            const {data} = await axios.get('/api/blog/all');
            console.log('Public blogs response:', data);
            data.success ? setBlog(data.blog): toast.error(data.message);
        } catch (error) {
            console.error('Error fetching public blogs:', error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchBlogs();
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `${token}`;
        }
    }, []);

    // Update axios headers when token changes
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    const value = {
        axios, navigate, token, setToken, blog, setBlog, input, setInput, fetchBlogs
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => {
    return useContext(AppContext);
}