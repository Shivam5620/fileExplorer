import FileExploere from "../components/FileExploere";
import data from '../data/data.json'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  
  return (
    <div className="">

    <FileExploere FolderData={data}/>
     <ToastContainer />
    </div>
  )
};
export default App;
