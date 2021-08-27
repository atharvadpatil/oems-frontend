import { useSetRecoilState } from 'recoil';
import { assignmentStudentDrawerId } from '../../../../atoms';

const Completed = () => {
    const setIndex = useSetRecoilState(assignmentStudentDrawerId);
    return ( 
        <div>
            <h1>Completed Assignment List</h1>
            <button onClick={()=>setIndex(3)}>Go to grade</button>
        </div>
     );
}
 
export default Completed;